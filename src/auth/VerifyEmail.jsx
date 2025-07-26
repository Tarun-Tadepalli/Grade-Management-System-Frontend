import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function EmailVerificationPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying your email...");
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:2025/api/auth/verify?token=${token}`, {
      credentials: "include",
    })
      .then((res) => res.text())
      .then((msg) => {
        toast.success(msg);
        setStatus("Email verified! Redirecting to dashboard...");
        setIsVerified(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      })
      .catch(() => {
        toast.error("Invalid or expired verification link.");
        setStatus("Verification failed");
        setIsError(true);
      });
  }, [token, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-xl text-center"
      >
        {!isVerified && !isError ? (
          <>
            <motion.h2
              className="text-2xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Verifying your email
            </motion.h2>
            <motion.div
              className="flex justify-center items-center my-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-14 h-14 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          </>
        ) : isVerified ? (
          <>
            <motion.div
              className="flex justify-center items-center my-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            >
              <FaCheckCircle className="text-green-400 text-5xl" />
            </motion.div>
            <motion.h2
              className="text-2xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Email Verified!
            </motion.h2>
            <motion.p
              className="text-white/80 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Redirecting to dashboard...
            </motion.p>
          </>
        ) : (
          <>
            <motion.div
              className="flex justify-center items-center my-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            >
              <FaTimesCircle className="text-red-400 text-5xl" />
            </motion.div>
            <motion.h2
              className="text-2xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Verification Failed
            </motion.h2>
            <motion.p
              className="text-white/80 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Invalid or expired verification link
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
            >
              Return Home
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}