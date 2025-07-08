import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { FiX, FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      const res = await fetch("http://localhost:2025/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success("Account created! Please check your email to verify.");
      navigate("/verify-info");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <FiX className="text-gray-800 dark:text-gray-200 text-xl" />
          </button>

          {/* Left side - Image */}
          <div className="hidden md:block w-1/2 relative">
            <motion.img
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&auto=format&fit=crop&w=1000&q=80"
              alt="Sign Up Visual"
              className={`w-full h-full object-cover ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            )}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <h3 className="text-white text-xl font-bold mb-2">
                  CodeGrader Pro
                </h3>
                <p className="text-gray-300">
                  Advanced solution evaluation for computer science educators
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Join our community and explore amazing features.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <div className="recaptcha-container flex justify-center">
                  <ReCAPTCHA
                    sitekey="6Lcd7JQqAAAAAMT-lTBgJsgIDp5O9pmTMYbaRIbu"
                    onChange={handleCaptchaChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  Sign Up <FiArrowRight />
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                  >
                    <FaGoogle className="text-red-500 text-lg" />
                  </button>

                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                  >
                    <FaGithub className="text-gray-800 dark:text-gray-200 text-lg" />
                  </button>

                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                  >
                    <FaFacebook className="text-blue-600 text-lg" />
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Sign in
                </a>
              </div>
            </motion.div>
            <ToastContainer />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignUp;
