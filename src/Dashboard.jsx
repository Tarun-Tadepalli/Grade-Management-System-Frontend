import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info from backend
  useEffect(() => {
    fetch("http://localhost:2025/api/auth/me", {
      credentials: "include", // Required to send session cookie
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/signin"); // Not authenticated
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="p-4 text-gray-600">Loading...</div>;

  if (!user) return <div className="p-4 text-red-600">No user data found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <img
          src={user.picture || user.profileImageUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 mb-4">{user.email}</p>
        <button
          onClick={() => {
            window.location.href = "http://localhost:2025/logout";
          }}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
