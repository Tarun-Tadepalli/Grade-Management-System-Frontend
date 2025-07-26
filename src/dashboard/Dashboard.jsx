import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  FiHome,
  FiPlusSquare,
  FiList,
  FiUser,
  FiLogOut,
  FiChevronRight,
  FiMenu,
} from "react-icons/fi";
import { FaMoon, FaSun, FaChartLine, FaQuestionCircle } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../dashboard/layout";
import CountUp from "react-countup";
import axios from "axios";

// Dashboard Stats Component (Unchanged)
const DashboardStats = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res1 = await axios.get("http://localhost:2025/api/auth/users-count");
        const res2 = await axios.get("http://localhost:2025/api/questions/questions-count");
        const res3 = await axios.get("http://localhost:2025/api/subjects/subjects-count");
        setUserCount(res1.data.userCount || 0);
        setQuestionCount(res2.data.questionCount || 0);
        setSubjectCount(res3.data.subjectCount || 0);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Questions",
      value: questionCount,
      change: "+12%",
      icon: <FaQuestionCircle className="text-2xl" />,
    },
    {
      title: "Total Subjects",
      value: subjectCount,
      isPercent: true,
      change: "+3%",
      icon: <FaChartLine className="text-2xl" />,
    },
    {
      title: "Active Users",
      value: userCount,
      change: "+5%",
      icon: <FiUser className="text-2xl" />,
    },
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
              <p className="text-3xl font-bold mt-2">
                {loading ? (
                  "..."
                ) : (
                  <CountUp end={stat.value} duration={1.5} suffix={stat.isPercent ? "" : ""} />
                )}
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">{stat.icon}</div>
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
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:2025/api/questions/latest");
        setQuestions(response.data);  // Set the questions in state
      } catch (error) {
        console.error("Failed to fetch recent questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestQuestions();
  }, []);

   return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-sky-200 dark:bg-gray-800 rounded-xl shadow-lg mt-8"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-black dark:text-white">Recent Questions</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {loading ? (
          <p className="p-4 text-black dark:text-gray-400">Loading...</p>
        ) : questions.length === 0 ? (
          <p className="p-4 text-black dark:text-gray-400">No recent questions found.</p>
        ) : (
          questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ x: 5 }}
              className="p-4 hover:bg-sky-300/30 dark:hover:bg-gray-700/50 cursor-pointer flex items-center"
            >
              <div className="flex-1">
                <h4 className="font-medium text-black dark:text-white">{question.title}</h4>
                <div className="flex items-center mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                    question.difficulty === "Easy"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                      : question.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                  }`}>
                    {question.difficulty}
                  </span>
                  <span className="text-xs text-black dark:text-gray-400">
                    {question.createdAt ? new Date(question.createdAt).toLocaleString() : ""}
                  </span>
                </div>
              </div>
              <FiChevronRight className="text-black dark:text-gray-400" />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

// Dashboard Main Component (Modified heading color)
const DashboardMain = () => (
  <div className="space-y-8">
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
      <h1 className="text-3xl font-bold flex items-center text-black dark:text-white">
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
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.3]);

  return (
    <Layout>
      {/* === Animated Background === */}
      <motion.div style={{ opacity: backgroundOpacity }} className="fixed inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: Math.random() * 360,
            }}
            animate={{
              x: [null, Math.random() * 100 - 50],
              y: [null, Math.random() * 100 - 50],
              rotate: [null, Math.random() * 360],
              transition: {
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            className="absolute rounded-full bg-indigo-200/50 dark:bg-indigo-900/20"
            style={{
              width: `${5 + Math.random() * 15}rem`,
              height: `${5 + Math.random() * 15}rem`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      <DashboardMain />

      {/* === Particle Background === */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0,
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              opacity: [0, 0.8, 0],
              transition: {
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            className="absolute rounded-full bg-indigo-400/20 dark:bg-indigo-500/20"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </Layout>
  );
}