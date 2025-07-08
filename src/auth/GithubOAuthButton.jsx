import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const GitHubOAuthButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        window.location.href =
          "http://localhost:2025/oauth2/authorization/github";
      }}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <FaGithub className="text-xl" />
    </motion.button>
  );
};

export default GitHubOAuthButton;
