import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FiChevronLeft, FiX, FiSun, FiMoon } from "react-icons/fi";
import { PiGraduationCapFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

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

export default function VerifyInfo() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [showSpinner, setShowSpinner] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`h-screen w-screen overflow-hidden transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-white"}`}
    >
      {/* Navbar - identical to ForgotPassword */}
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

      {/* Main content */}
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
                Verify Your Email
              </h2>
              <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Check your inbox to continue
              </p>
            </motion.div>
            
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/")}
              className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            >
              <FiX className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
            </motion.button>
          </div>

          <div className="flex flex-col items-center">
            {showSpinner ? (
              <motion.div
                className="flex justify-center items-center my-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className={`w-14 h-14 border-4 rounded-full animate-spin ${
                  darkMode ? "border-indigo-500 border-t-transparent" : "border-indigo-400 border-t-transparent"
                }`}></div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="flex justify-center items-center my-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                >
                  <FaCheckCircle className={`text-5xl ${darkMode ? "text-green-400" : "text-green-500"}`} />
                </motion.div>

                <motion.p
                  className={`text-lg leading-relaxed mb-4 text-center ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  A verification link has been sent to your email. <br />
                  Please check and confirm to continue.
                </motion.p>
              </>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 w-full"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                className={`w-full py-3 rounded-lg ${
                  darkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600"
                } text-white font-medium transition-all flex items-center justify-center gap-2`}
              >
                Back to Home <FiChevronLeft />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}