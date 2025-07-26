import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEdit, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import Layout from "../dashboard/layout";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile on load
  useEffect(() => {
    fetch("http://localhost:2025/api/auth/me", {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();

        // Set default avatar if none
        if (data.authProvider === "MANUAL" && !data.profileImageUrl?.trim()) {
          data.profileImageUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
            data.name || "User"
          )}`;
        }

        setUserData(data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        toast.error("Failed to load profile");
      });
  }, []);

  // Debounced profile update
  const debouncedSave = useCallback(
    debounce((updated) => {
      fetch("http://localhost:2025/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updated),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Update failed");
          toast.success("Profile updated", { autoClose: 1500 });
        })
        .catch(() => toast.error("Failed to update profile"));
    }, 1000),
    []
  );

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...userData, [name]: value };
    setUserData(updated);
    debouncedSave(updated);
  };

  // Save changes
  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile saved");
  };

  // Show loading while userData is null
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-300">
        Loading profile...
      </div>
    );
  }

  return (
    <Layout>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-8"
      >
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Profile Card */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden h-full">
              <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg">
                    <img
                      src={
                        userData.profileImageUrl?.trim()
                          ? userData.profileImageUrl
                          : `http://localhost:2025/api/auth/profile/image?t=${Date.now()}`
                      }
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 pt-16 text-center flex flex-col">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
                  {userData.name}
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-auto py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center gap-2 mx-auto"
                >
                  <FiEdit />
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-full">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold flex items-center dark:text-white">
                  <FiUser className="mr-3 text-indigo-500" /> Account Details
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium dark:text-gray-300">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="md:col-span-2 px-4 py-3 rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <div className="md:col-span-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {userData.name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium dark:text-gray-300">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="md:col-span-2 px-4 py-3 rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <div className="md:col-span-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {userData.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium dark:text-gray-300">
                    Password
                  </label>
                  <div className="md:col-span-2">
                    <button
                      onClick={() => navigate("/forgotpwd")}
                      className="w-full text-left flex justify-between items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <div className="flex items-center">
                        <FiLock className="mr-3 text-indigo-500" />
                        <span className="font-medium dark:text-white">
                          Change Password
                        </span>
                      </div>
                      <FiChevronRight className="text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="pt-4">
                    <button
                      onClick={handleSave}
                      className="w-full py-3 px-6 rounded-xl text-lg font-medium shadow-md bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </Layout>
  );
};

export default Profile;