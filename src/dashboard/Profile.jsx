import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEdit, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../dashboard/layout';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      theme: document.documentElement.classList.contains('dark') ? "dark" : "light",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Layout>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto"
        >
          {/* Profile Card (Left Side) */}
          <motion.div
            variants={itemVariants}
            className="lg:w-1/3"
          >
            <motion.div
              whileHover="hover"
              className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col"
            >
              <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 8, repeat: Infinity }
                  }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                >
                  <div className="relative h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 overflow-hidden shadow-lg">
                    <div className="flex items-center justify-center h-full w-full bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300 text-3xl font-bold">
                      {userData.name.charAt(0)}
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex-1 p-6 pt-16 text-center flex flex-col">
                <motion.h2 
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%'],
                    transition: {
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear"
                    }
                  }}
                  className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent bg-[length:300%_100%] mb-4"
                >
                  {userData.name}
                </motion.h2>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-auto py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center gap-2 mx-auto"
                >
                  <FiEdit />
                  {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Details Card (Right Side) */}
          <motion.div
            variants={itemVariants}
            className="lg:w-2/3"
          >
            <motion.div
              whileHover="hover"
              className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold flex items-center dark:text-white">
                  <FiUser className="mr-3 text-indigo-500" />
                  Account Details
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Name Field */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                >
                  <label className="md:col-span-1 text-sm font-medium dark:text-gray-300">
                    Full Name
                  </label>
                  {isEditing ? (
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                  ) : (
                    <div className="md:col-span-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {userData.name}
                    </div>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                >
                  <label className="md:col-span-1 text-sm font-medium dark:text-gray-300">
                    Email Address
                  </label>
                  {isEditing ? (
                    <div className="md:col-span-2">
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                  ) : (
                    <div className="md:col-span-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {userData.email}
                    </div>
                  )}
                </motion.div>

                {/* Change Password */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                >
                  <label className="md:col-span-1 text-sm font-medium dark:text-gray-300">
                    Password
                  </label>
                  <div className="md:col-span-2">
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/forgot-password')}
                      className="w-full text-left flex justify-between items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center">
                        <FiLock className="mr-3 text-indigo-500" />
                        <span className="font-medium dark:text-white">Change Password</span>
                      </div>
                      <FiChevronRight className="text-gray-500 dark:text-gray-400" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Save Button (only in edit mode) */}
                <AnimatePresence>
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="pt-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSave}
                        className="w-full py-3 px-6 rounded-xl font-medium text-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                      >
                        Save Changes
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.main>
    </Layout>
  );
};

export default Profile;