import React, { useState } from "react";
import axios from "axios";
import { FaFacebookF, FaTwitter, FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar"; // Import Navbar component

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:3100/api/user/${isSignup ? "signup" : "signin"}`;
      const response = await axios.post(url, formData);
      setMessage(response.data.message || "Operation successful");
      if (!isSignup && response.data.token) {
        localStorage.setItem("token", response.data.token); // Save token for authentication
        setIsAuthenticated(true); // Set authentication status
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  if (isAuthenticated) {
    return <Navbar />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <head>
        <title>Complain App</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/* Sign-in / Sign-up Form Section */}
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-green-500">Task</span>App
            </div>
            <div className="p-10">
              <h2 className="text-2xl font-bold text-green-500 mb-2">
                {isSignup ? "Create Your Account" : "Sign In To Your Account"}
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <a href="/facebook" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaFacebookF className="text-sm" />
                </a>
                <a href="/google" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaGoogle className="text-sm" />
                </a>
                <a href="/twitter" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaTwitter className="text-sm" />
                </a>
              </div>
              <p className="text-gray-400 my-3">
                Or Use {isSignup ? "Your Details" : "Your Email"}
              </p>
              <div className="flex flex-col items-center">
                {isSignup && (
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <CgProfile className="text-gray-400 m-2" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email@xyz.com"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="border-2 border-green-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
                >
                  {isSignup ? "Sign Up" : "Sign In"}
                </button>
              </div>
              {message && <p className="text-red-500 mt-4">{message}</p>}
            </div>
          </div>

          {/* Welcome Section */}
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">
              {isSignup ? "Welcome Back!" : "Hello Friend!"}
            </h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              {isSignup
                ? "Already have an account? Sign in here."
                : "Don't have an account? Create one here."}
            </p>
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginSignup;
