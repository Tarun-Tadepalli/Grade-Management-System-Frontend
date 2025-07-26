import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiPlusSquare,
  FiList,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiFileText,
} from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { PiGraduationCapFill } from "react-icons/pi";

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:2025/api/auth/logout", {
        method: "POST",
        credentials: "include", // ✅ Very important to send cookies
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      navigate("/"); // ✅ Redirect after logout
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const sidebarWidth = sidebarCollapsed ? "w-20" : "w-64";

  return (
    <div
      className={`min-h-screen w-full fixed inset-0 overflow-y-auto ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full ${sidebarWidth} ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-xl transition-all duration-300 z-40`}
        onMouseEnter={() => setIsHoveringSidebar(true)}
        onMouseLeave={() => setIsHoveringSidebar(false)}
      >
        <div
          className={`p-4 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } flex items-center justify-center`}
        >
          {sidebarCollapsed ? (
            <PiGraduationCapFill className="text-3xl text-indigo-500" />
          ) : (
            <div className="flex items-center space-x-2">
              <PiGraduationCapFill className="text-3xl text-indigo-500" />
              <h1 className="font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent text-2xl">
                CodeGrader Pro
              </h1>
            </div>
          )}
        </div>

        <div className="p-4">
          <nav className="space-y-2">
            {/* Dashboard Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/dashboard")}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-0 py-4" : "px-4 py-3"
              } rounded-lg transition-all relative overflow-hidden group ${
                location.pathname.includes("dashboard")
                  ? darkMode
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-500 text-white"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <RiDashboardFill
                className={`${sidebarCollapsed ? "text-xl" : "mr-3"}`}
              />
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Dashboard
                </motion.span>
              )}
              <span
                className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-300 ${
                  location.pathname.includes("dashboard")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </motion.button>

            {/* Add Questions Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/addq")}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-0 py-4" : "px-4 py-3"
              } rounded-lg transition-all relative overflow-hidden group ${
                location.pathname.includes("addq")
                  ? darkMode
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-500 text-white"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiPlusSquare
                className={`${sidebarCollapsed ? "text-xl" : "mr-3"}`}
              />
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Add Questions
                </motion.span>
              )}
              <span
                className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-300 ${
                  location.pathname.includes("addq")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </motion.button>

            {/* My Questions Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/myq")}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-0 py-4" : "px-4 py-3"
              } rounded-lg transition-all relative overflow-hidden group ${
                location.pathname.includes("myq")
                  ? darkMode
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-500 text-white"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiFileText
                className={`${sidebarCollapsed ? "text-xl" : "mr-3"}`}
              />
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  My Questions
                </motion.span>
              )}
              <span
                className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-300 ${
                  location.pathname.includes("myq")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </motion.button>

            {/* View Questions Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/allq")}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-0 py-4" : "px-4 py-3"
              } rounded-lg transition-all relative overflow-hidden group ${
                location.pathname.includes("allq")
                  ? darkMode
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-500 text-white"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiList className={`${sidebarCollapsed ? "text-xl" : "mr-3"}`} />
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  View All Questions
                </motion.span>
              )}
              <span
                className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-300 ${
                  location.pathname.includes("allq")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </motion.button>
          </nav>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              sidebarCollapsed ? "justify-center px-0 py-4" : "px-4 py-3"
            } rounded-lg transition-all ${
              darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiLogOut className={sidebarCollapsed ? "text-xl" : "mr-3"} />
            {!sidebarCollapsed && "Logout"}
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed z-50 ${
          sidebarCollapsed ? "left-20" : "left-64"
        } top-6 p-2 rounded-full ${
          darkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-200 text-gray-700"
        } shadow-lg transition-all duration-300 flex items-center justify-center`}
        onClick={toggleSidebar}
        style={{
          boxShadow: darkMode
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        {sidebarCollapsed ? (
          <FiMenu className="text-lg" />
        ) : (
          <FiX className="text-lg" />
        )}
      </motion.button>

      {/* Main Content */}
      <div
        className={`ml-0 transition-all duration-300 ${
          !sidebarCollapsed ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Top Navbar */}
        <header
          className={`sticky top-0 z-30 ${
            darkMode ? "bg-gray-800/90" : "bg-white/90"
          } backdrop-blur-md shadow-lg transition-colors duration-500`}
        >
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <PiGraduationCapFill className="text-2xl text-indigo-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                {location.pathname.includes("dashboard") && "Dashboard"}
                {location.pathname.includes("addq") && "Add Question"}
                {location.pathname.includes("myq") && "My Questions"}
                {location.pathname.includes("allq") && "All Questions"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Creative Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-500 focus:outline-none ${
                  darkMode ? "bg-indigo-900" : "bg-yellow-300"
                }`}
                aria-label="Toggle dark mode"
              >
                <motion.div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-md`}
                  initial={false}
                  animate={{
                    x: darkMode ? 26 : 0,
                    rotate: darkMode ? 360 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30,
                  }}
                >
                  {darkMode ? (
                    <FaMoon className="text-yellow-300 text-sm" />
                  ) : (
                    <FaSun className="text-yellow-500 text-sm" />
                  )}
                </motion.div>
                <span className="sr-only">Toggle dark mode</span>
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 ${
                  darkMode
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-500 hover:bg-indigo-600"
                } text-white px-4 py-2 rounded-lg transition-all`}
                onClick={() => navigate("/profile")}
              >
                <FiUser />
                <span>Profile</span>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="container mx-auto px-6 py-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;