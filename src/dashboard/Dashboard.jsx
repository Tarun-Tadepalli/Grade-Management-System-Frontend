import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiPlusSquare, FiList, FiUser, FiLogOut, FiChevronRight, FiMenu } from 'react-icons/fi';
import { FaMoon, FaSun, FaChartLine, FaQuestionCircle } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from '../dashboard/layout';

// Dashboard Stats Component
const DashboardStats = () => {
  const stats = [
    { title: "Total Questions", value: 128, change: "+12%", icon: <FaQuestionCircle className="text-2xl" /> },
    { title: "Active Users", value: 84, change: "+5%", icon: <FiUser className="text-2xl" /> },
    { title: "Avg. Score", value: "78%", change: "+3%", icon: <FaChartLine className="text-2xl" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-80">{stat.title}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              {stat.icon}
            </div>
          </div>
          <p className="text-sm mt-4 opacity-90 flex items-center">
            <span className="bg-white/20 px-2 py-1 rounded-md text-xs mr-2">{stat.change}</span>
            vs last month
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// Recent Questions Component
const RecentQuestions = () => {
  const questions = [
    { id: 1, title: "Array Manipulation", difficulty: "Medium", date: "2 hours ago" },
    { id: 2, title: "Binary Tree Traversal", difficulty: "Hard", date: "5 hours ago" },
    { id: 3, title: "String Palindrome", difficulty: "Easy", date: "1 day ago" },
    { id: 4, title: "Graph Algorithms", difficulty: "Hard", date: "2 days ago" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold dark:text-white">Recent Questions</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ x: 5 }}
            className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer flex items-center"
          >
            <div className="flex-1">
              <h4 className="font-medium dark:text-white">{question.title}</h4>
              <div className="flex items-center mt-1">
                <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                  question.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                  question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                }`}>
                  {question.difficulty}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{question.date}</span>
              </div>
            </div>
            <FiChevronRight className="text-gray-400" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Dashboard Main Component
const DashboardMain = () => (
  <div className="space-y-8">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center"
    >
      <h1 className="text-3xl font-bold flex items-center dark:text-white">
        <RiDashboardFill className="mr-3 text-indigo-500" />
        Dashboard Overview
      </h1>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm"
      >
        <FiPlusSquare className="mr-2" />
        Add Question
      </motion.button>
    </motion.div>
    
    <DashboardStats />
    <RecentQuestions />
  </div>
);

export default function Dashboard() {
  return (
    <Layout>
      <DashboardMain />
    </Layout>
  );
}