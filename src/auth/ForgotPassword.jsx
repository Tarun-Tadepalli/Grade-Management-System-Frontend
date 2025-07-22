import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiX, FiMail, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { PiGraduationCapFill } from "react-icons/pi";
import { FiSun, FiMoon } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") !== "false";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  return [darkMode, toggleDarkMode];
};

const ForgotPassword = () => {
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0 && isVerified) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, isVerified]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsVerified(true);
      toast.success("Verification email sent successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to send verification email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
    
    if (newOtp.every(val => val !== "") && newOtp.length === 6) {
      verifyOtp();
    }
  };

  const verifyOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter the full 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("OTP Verified! Redirecting...");
      setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
    } catch (err) {
      toast.error(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("New OTP sent to your email!");
      setCountdown(30);
    } catch (err) {
      toast.error(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`h-screen w-screen overflow-hidden transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-white"}`}
    >
      <nav className="w-full px-8 py-6 flex justify-between items-center absolute top-0 left-0 z-10">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center space-x-2"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
          >
            <PiGraduationCapFill className="text-3xl text-indigo-600 dark:text-indigo-400" />
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
            CodeGrader Pro
          </span>
        </motion.div>

        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="flex items-center space-x-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all ${
              darkMode
                ? "bg-gray-700 text-amber-300 hover:bg-gray-600"
                : "bg-gray-200 text-indigo-700 hover:bg-gray-300"
            }`}
          >
            {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg transition-all shadow-md hover:shadow-indigo-500/30 flex items-center gap-2"
          >
            Home <FiChevronLeft />
          </motion.button>
        </motion.div>
      </nav>

      <div className="h-full w-full flex items-center justify-center p-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-lg p-10 rounded-2xl ${
            darkMode ? "bg-gray-800/90 border-gray-700" : "bg-white border-gray-200"
          } shadow-2xl border backdrop-blur-sm`}
        >
          <div className="flex justify-between items-center mb-6">
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                {!isVerified ? "Reset your password" : "Verify your email"}
              </h2>
              <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {!isVerified ? "Enter your email to continue" : "We sent a code to your email"}
              </p>
            </motion.div>
            
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/")}
              className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            >
              <FiX className=
              {`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {!isVerified ? (
              <motion.form
                key="email-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <FiMail />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                          darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
                        } border ${darkMode ? "border-gray-600" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
                      darkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600"
                    } text-white font-medium transition-all`}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 border-2 border-white rounded-full border-t-transparent"
                      />
                    ) : (
                      <>
                        Continue <FiArrowRight />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="otp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className={`p-4 rounded-lg mb-6 ${darkMode ? "bg-gray-700/50" : "bg-indigo-50"} text-center`}
                >
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-indigo-800"}`}>
                    We've sent a 6-digit verification code to
                  </p>
                  <p className={`font-medium ${darkMode ? "text-white" : "text-indigo-900"}`}>
                    {email}
                  </p>
                </motion.div>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      htmlFor="otp"
                      className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Enter verification code
                    </label>
                    <div className="flex justify-center gap-3">
                      {otp.map((digit, index) => (
                        <motion.input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          className={`w-12 h-12 text-center text-xl rounded-lg ${
                            darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
                          } border ${darkMode ? "border-gray-600 focus:border-indigo-500" : "border-gray-300 focus:border-indigo-500"} focus:ring-2 focus:ring-indigo-500 transition`}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !digit && index > 0) {
                              document.getElementById(`otp-${index - 1}`).focus();
                            }
                          }}
                          whileFocus={{ scale: 1.05 }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={verifyOtp}
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg ${
                      darkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600"
                    } text-white font-medium transition-all flex items-center justify-center gap-2`}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 border-2 border-white rounded-full border-t-transparent"
                      />
                    ) : (
                      <>
                        Verify OTP <FiArrowRight />
                      </>
                    )}
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <button
                      type="button"
                      onClick={resendOtp}
                      disabled={countdown > 0 || isLoading}
                      className={`text-sm font-medium ${
                        darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500"
                      } transition ${countdown > 0 || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {isLoading ? (
                        "Sending..."
                      ) : countdown > 0 ? (
                        `Resend code in ${countdown}s`
                      ) : (
                        <motion.span whileHover={{ scale: 1.05 }}>
                          Didn't receive code? Resend
                        </motion.span>
                      )}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => navigate("/")} 
              className={`text-sm font-medium ${
                darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500"
              } transition`}
            >
              Remember your password? Sign in
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      <ToastContainer
        position="bottom-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        transition="bounce"
      />
    </motion.div>
  );
};

export default ForgotPassword;