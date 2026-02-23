"use client"
import Image from "next/image";
import React, { useState } from "react";

const Form = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = ({ firstName, lastName, email, message }) => {
    const e = {};
    if (!firstName || firstName.trim().length < 1) e.firstName = "First name is required";
    if (!lastName || lastName.trim().length < 1) e.lastName = "Last name is required";
    if (!email) e.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) e.email = "Enter a valid email";
    }
    if (!message || message.trim().length < 5) e.message = "Message must be at least 5 characters";
    return e;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.target);
  const formDataBody = new URLSearchParams();

  // MUST match the Tab Name in your Google Sheet exactly
  formDataBody.append("formName", "Contact Form"); 

  // Mapping to image_4264b5.png headers
  formDataBody.append("Timestamp", new Date().toLocaleString());
  formDataBody.append("First Name", formData.get("firstName"));
  formDataBody.append("Last Name", formData.get("lastName"));
  formDataBody.append("Email", formData.get("email"));
  formDataBody.append("Message", formData.get("message"));

  try {
    const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
    await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors', // Keeps redirect errors from stopping the code
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formDataBody.toString()
    });

    alert('Message sent successfully!');
    e.target.reset(); // Clears the form
  } catch (err) {
    console.error("Submission Error:", err);
    alert("Failed to send. Please check your connection.");
  } finally {
    setLoading(false);
  }
};
  return (
    <section className="px-4 md:px-12 py-16">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="font-anton text-[#FCD901] mb-4">
            Leave <span className="text-white">A Message</span>{" "}
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className={`w-full bg-[#121212] px-4 py-2 text-white placeholder-gray-400 rounded-lg ${errors.firstName ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className={`w-full bg-[#121212] px-4 py-2 text-white placeholder-gray-400 rounded-lg ${errors.lastName ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <input 
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`w-full bg-[#121212] px-4 py-2 text-white placeholder-gray-400 rounded-lg ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message..."
                  className={`w-full bg-[#121212] px-4 py-2 text-white placeholder-gray-400 rounded-lg ${errors.message ? 'ring-2 ring-red-500' : ''}`}
                  rows={6}
                ></textarea>
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>
            </div>
            <button disabled={loading} className="bg-[#FCD901] px-8 py-2 rounded-lg mt-4">
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="flex-1">
          <div className="aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.417846033399!2d76.87872427526023!3d8.555757191487888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05befaeabb885f%3A0x486c83afdd2a6d65!2sGenrobotic%20Innovations%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1751174302919!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: "0",borderRadius: "10px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Form;
