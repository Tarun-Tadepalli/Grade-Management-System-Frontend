import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiX, FiLock, FiEye, FiEyeOff, FiChevronLeft } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
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

const ResetPassword = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    let strength = 0;
    if (newPassword.length >= 8) strength += 1;
    if (/[A-Z]/.test(newPassword)) strength += 1;
    if (/[a-z]/.test(newPassword)) strength += 1;
    if (/\d/.test(newPassword)) strength += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1;
    setPasswordStrength(strength);
  }, [newPassword]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return "Very Weak";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    if (passwordStrength <= 4) return "Strong";
    return "Very Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword.length < 8) {
      toast.error("🔐 Password must be at least 8 characters", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        transition: "bounce",
        style: {
          background: "#ef4444",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
      return;
    }
    
    if (passwordStrength < 3) {
      toast.error("💪 Password is too weak", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        transition: "bounce",
        style: {
          background: "#ef4444",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("🔒 Passwords don't match", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        transition: "bounce",
        style: {
          background: "#ef4444",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("🎉 Password changed successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        transition: "bounce",
        style: {
          background: "#10b981",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error("😢 Failed to reset password", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        transition: "bounce",
        style: {
          background: "#ef4444",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
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
                Create new password
              </h2>
              <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Your new password must be different from previous used passwords
              </p>
            </motion.div>
            
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/forgot-password")}
              className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            >
              <FiX className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
            </motion.button>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="newPassword"
                  className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  New Password
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <FiLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 rounded-lg ${
                      darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
                    } border ${darkMode ? "border-gray-600" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                    placeholder="Enter new password"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-600"}`}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </motion.button>
                </div>
                
                {newPassword && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Strength: <span className={`font-medium ${
                          passwordStrength <= 1 ? "text-red-500" :
                          passwordStrength <= 3 ? "text-yellow-500" : "text-green-500"
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${getPasswordStrengthColor()}`}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="confirmPassword"
                  className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <FiLock />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 rounded-lg ${
                      darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
                    } border ${darkMode ? "border-gray-600" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                    placeholder="Confirm new password"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-600"}`}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </motion.button>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
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
                    Reset Password <FiArrowRight />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
      
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        transition="bounce"
        style={{
          fontSize: "16px",
          fontWeight: "bold",
        }}
      />
    </motion.div>
  );
};

export default ResetPassword;