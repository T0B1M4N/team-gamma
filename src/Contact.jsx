import React, { useState } from "react";
import { useAppContext } from "./AppContext";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.includes("@")) {
      newErrors.email = "Email must contain '@'";
    }

    if (!message.trim()) {
      newErrors.message = "Message field must not be empty";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="contactDiv">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded p-2"
            rows={5}
          ></textarea>
          {errors.message && <p className="text-red-600">{errors.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// const handleContactClick = () => {
//  const contactdiv = document.getElementById("contactDiv");
//  contactdiv.className = isSwitchOn ? "contactdiv-dark" : "contactdiv";
//};