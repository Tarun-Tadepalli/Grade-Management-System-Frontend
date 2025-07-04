import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const GoogleOAuthButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        window.location.href =
          "http://localhost:2025/oauth2/authorization/google";
      }}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <FcGoogle className="text-xl" />
      Sign in with Google
    </motion.button>
  );
};

export default GoogleOAuthButton;
