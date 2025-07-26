import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBook,
  FiEdit2,
  FiZap,
  FiSun,
  FiMoon,
  FiArrowRight,
  FiChevronRight,
  FiCheck,
  FiSave,
} from "react-icons/fi";
import { FaGoogle, FaChalkboardTeacher } from "react-icons/fa";
import { PiGraduationCapFill } from "react-icons/pi";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import backgroundImage from "./images/6img.webp";
import lightBackgroundImage from "./images/light2.png";

// Custom hook for dark mode with default as dark
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

// Particle Background Component
const ParticleBackground = ({ darkMode }) => {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 5 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            darkMode ? "bg-indigo-400/20" : "bg-indigo-500/20"
          }`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          initial={{
            y: 0,
            x: 0,
            opacity: 0,
          }}
          animate={{
            y: [0, -100, -200, -300],
            x: [
              0,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            opacity: [0, 0.8, 0.5, 0],
          }}
          transition={{
            delay: particle.delay,
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Solution Evaluation Component
const SolutionEvaluator = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [subject, setSubject] = useState("CS101 - Algorithms");
  const [solutions, setSolutions] = useState([
    {
      id: 1,
      method: "Recursive Approach",
      marks: [
        { criteria: "Correctness", score: 8, max: 10 },
        { criteria: "Efficiency", score: 6, max: 10 },
        { criteria: "Readability", score: 9, max: 10 },
      ],
      feedback: "Good implementation but could optimize time complexity",
    },
    {
      id: 2,
      method: "Dynamic Programming",
      marks: [
        { criteria: "Correctness", score: 10, max: 10 },
        { criteria: "Efficiency", score: 9, max: 10 },
        { criteria: "Readability", score: 7, max: 10 },
      ],
      feedback: "Excellent optimization, could improve code documentation",
    },
    {
      id: 3,
      method: "Iterative Solution",
      marks: [
        { criteria: "Correctness", score: 7, max: 10 },
        { criteria: "Efficiency", score: 8, max: 10 },
        { criteria: "Readability", score: 8, max: 10 },
      ],
      feedback: "Solid implementation, handles edge cases well",
    },
  ]);
  const [newMethod, setNewMethod] = useState("");

  const addSolutionMethod = () => {
    if (newMethod.trim() === "") return;

    const newSolution = {
      id: solutions.length + 1,
      method: newMethod,
      marks: [
        { criteria: "Correctness", score: 0, max: 10 },
        { criteria: "Efficiency", score: 0, max: 10 },
        { criteria: "Readability", score: 0, max: 10 },
      ],
      feedback: "",
    };

    setSolutions([...solutions, newSolution]);
    setNewMethod("");
    setActiveTab(solutions.length);
  };

  const updateScore = (solutionId, criteria, value) => {
    setSolutions(
      solutions.map((solution) => {
        if (solution.id === solutionId) {
          return {
            ...solution,
            marks: solution.marks.map((mark) =>
              mark.criteria === criteria
                ? { ...mark, score: Math.min(parseInt(value || 0), mark.max) }
                : mark
            ),
          };
        }
        return solution;
      })
    );
  };

  const updateFeedback = (solutionId, feedback) => {
    setSolutions(
      solutions.map((solution) =>
        solution.id === solutionId ? { ...solution, feedback } : solution
      )
    );
  };

  const calculateTotal = (marks) => {
    return marks.reduce((sum, mark) => sum + mark.score, 0);
  };

  const calculateMaxTotal = (marks) => {
    return marks.reduce((sum, mark) => sum + mark.max, 0);
  };

  const saveEvaluations = () => {
    console.log("Saving evaluations:", { subject, solutions });
    alert("Evaluations saved successfully!");
  };

  return (
    <motion.div
      className={`w-full h-full p-6 rounded-2xl ${
        darkMode 
          ? "bg-gray-800/70 border-gray-700" 
          : "bg-white shadow-lg"
      } backdrop-blur-sm transition-all duration-300`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2
          className={`text-xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {subject}
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMethod}
            onChange={(e) => setNewMethod(e.target.value)}
            placeholder="Add solution method"
            className={`px-3 py-2 rounded-lg text-sm ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            } border ${
              darkMode ? "border-gray-600" : "border-gray-300"
            } focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition shadow-sm`}
          />
          <motion.button
            onClick={addSolutionMethod}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-2 rounded-lg ${
              darkMode
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white text-sm font-medium transition-all shadow-md`}
          >
            Add
          </motion.button>
        </div>
      </div>

      {solutions.length > 0 ? (
        <>
          <div className="flex overflow-x-auto pb-2 mb-6 gap-1">
            {solutions.map((solution, index) => (
              <motion.button
                key={solution.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === index
                    ? darkMode
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-indigo-600 text-white shadow-md"
                    : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {solution.method}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-96 overflow-y-auto"
            >
              {solutions[activeTab] && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3
                      className={`text-lg font-semibold ${
                        darkMode ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      Evaluation Criteria for {solutions[activeTab].method}
                    </h3>

                    {solutions[activeTab].marks.map((mark, i) => (
                      <motion.div
                        key={i}
                        className="space-y-2"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <div className="flex justify-between items-center">
                          <span
                            className={`text-sm font-medium ${
                              darkMode ? "text-gray-300" : "text-gray-900"
                            }`}
                          >
                            {mark.criteria}
                            <span className="text-xs opacity-70 ml-2">
                              (Max: {mark.max})
                            </span>
                          </span>
                          <input
                            type="number"
                            min="0"
                            max={mark.max}
                            value={mark.score}
                            onChange={(e) =>
                              updateScore(
                                solutions[activeTab].id,
                                mark.criteria,
                                e.target.value
                              )
                            }
                            className={`w-16 px-2 py-1 rounded ${
                              darkMode
                                ? "bg-gray-700 text-white"
                                : "bg-white text-gray-900"
                            } border ${
                              darkMode ? "border-gray-600" : "border-gray-300"
                            } text-right focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition shadow-sm`}
                          />
                        </div>
                        <motion.div
                          className={`w-full h-2 rounded-full ${
                            darkMode ? "bg-gray-700" : "bg-indigo-100"
                          } overflow-hidden`}
                          initial={{
                            scaleX: 0,
                            transformOrigin: "left center",
                          }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(mark.score / mark.max) * 100}%`,
                            }}
                            transition={{
                              duration: 0.8,
                              delay: 0.3 + i * 0.1,
                              type: "spring",
                              damping: 10,
                            }}
                            style={{
                              background:
                                mark.score / mark.max > 0.89
                                  ? darkMode
                                    ? "#4F46E5"
                                    : "#4F46E5"
                                  : mark.score / mark.max > 0.69
                                  ? darkMode
                                    ? "#7C3AED"
                                    : "#7C3AED"
                                  : darkMode
                                  ? "#A78BFA"
                                  : "#A78BFA",
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      darkMode
                        ? "bg-gradient-to-r from-indigo-500/10 to-violet-500/10"
                        : "bg-gradient-to-r from-indigo-50 to-violet-50"
                    } shadow-sm`}
                  >
                    <span
                      className={`font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      Total Score:
                    </span>
                    <span
                      className={`text-xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {calculateTotal(solutions[activeTab].marks)} /{" "}
                      {calculateMaxTotal(solutions[activeTab].marks)}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4
                      className={`text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      Feedback
                    </h4>
                    <textarea
                      value={solutions[activeTab].feedback}
                      onChange={(e) =>
                        updateFeedback(solutions[activeTab].id, e.target.value)
                      }
                      className={`w-full p-3 rounded-lg ${
                        darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-white text-gray-900"
                      } border ${
                        darkMode ? "border-gray-600" : "border-gray-300"
                      } focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition shadow-sm`}
                      rows="3"
                      placeholder="Enter detailed feedback for this solution..."
                    />
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.button
            onClick={saveEvaluations}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-6 w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
              darkMode
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-medium transition-all shadow-lg`}
          >
            <FiSave /> Save Evaluations
          </motion.button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-64 flex items-center justify-center"
        >
          <p className={`${darkMode ? "text-gray-400" : "text-gray-900"}`}>
            No solution methods added yet. Add your first solution method to
            begin evaluation.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};


const HomePage = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveFeature((prev) => (prev + 1) % 3);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const features = [
    {
      icon: <FiBook className="text-3xl" />,
      title: "Multi-Method Evaluation",
      description: "Evaluate different solution approaches with customized criteria",
      details: {
        title: "Comprehensive Solution Analysis",
        items: [
          "Support for multiple solution methods per problem",
          "Custom evaluation criteria for each approach",
          "Detailed feedback for each solution variant",
        ],
      },
    },
    {
      icon: <FiEdit2 className="text-3xl" />,
      title: "Structured Rubrics",
      description: "Create detailed evaluation criteria with weighted scoring",
      details: {
        title: "Consistent Evaluation Standards",
        items: [
          "Define criteria like correctness, efficiency, readability",
          "Set maximum scores for each evaluation dimension",
          "Standardized rubrics across all evaluations",
        ],
      },
    },
    {
      icon: <FiZap className="text-3xl" />,
      title: "Data Insights",
      description: "Analyze performance across different solution methods",
      details: {
        title: "Performance Analytics",
        items: [
          "Compare scores across different approaches",
          "Identify most effective solution methods",
          "Track improvement over multiple attempts",
        ],
      },
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "dark bg-gray-900" : "bg-white"
    }`}>
      <ParticleBackground darkMode={darkMode} />

      {/* Navigation */}
      <nav className={`w-full px-4 sm:px-6 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 relative ${
        darkMode ? "bg-gray-900" : "bg-white"
      } border-b ${
        darkMode ? "border-gray-800" : "border-gray-200"
      } shadow-sm`}>
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PiGraduationCapFill className="text-3xl text-indigo-600 dark:text-indigo-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
            CodeGrader Pro
          </span>
        </motion.div>

        <motion.div
          className="flex items-center space-x-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all ${
              darkMode
                ? "bg-gray-700 text-amber-300 hover:bg-gray-600"
                : "bg-gray-200 text-indigo-600 hover:bg-gray-300"
            }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <FiSun className="text-xl" />
            ) : (
              <FiMoon className="text-xl" />
            )}
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSignIn(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg transition-all shadow-md hover:shadow-indigo-500/30 flex items-center gap-2"
          >
            Sign In <FiChevronRight />
          </motion.button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section
  className={`w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16 md:py-20 relative ${
    darkMode ? "bg-gray-900" : "bg-sky-50"
  }`}
  style={{
    backgroundImage: `url(${darkMode ? backgroundImage : lightBackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
        {darkMode && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>
        )}

        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          {/* Text content */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                darkMode ? "bg-indigo-900/50 text-indigo-200" : "bg-indigo-100 text-indigo-800"
              } mb-4 shadow-sm`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Advanced Solution Evaluator
            </motion.span>

            <motion.h1
  className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight ${
    darkMode ? "text-white" : "text-gray-900"
  }`}
>
  Evaluate Multiple <br />
  <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
    Solution Approaches
  </span>
</motion.h1>
            <motion.p
              className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-900"} mb-10`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              The comprehensive evaluation system that helps educators assess
              different solution methods for the same problem with structured
              criteria and detailed feedback.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSignUp(true)}
                className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md hover:shadow-indigo-500/30 flex items-center justify-center gap-2 text-lg font-medium"
              >
                Get Started <FiArrowRight />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSignIn(true)}
                className={`px-8 py-3.5 flex items-center justify-center gap-2 ${
                  darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
                } rounded-xl ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                } transition border ${
                  darkMode ? "border-gray-700" : "border-gray-300"
                } shadow-sm text-lg font-medium`}
              >
                <FaGoogle className="text-blue-500" /> Sign in with Google
              </motion.button>
            </motion.div>

            <motion.div
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-900"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p>Developed by: T. Tarun & M. Kowsik</p>
            </motion.div>
          </motion.div>

          {/* Solution Evaluator Component */}
          <motion.div
            className="lg:w-1/2 h-[600px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SolutionEvaluator darkMode={darkMode} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${darkMode ? "bg-gray-800/50" : "bg-white"} backdrop-blur-sm relative`}>
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                darkMode ? "bg-indigo-900/50 text-indigo-200" : "bg-indigo-100 text-indigo-800"
              } mb-4 shadow-sm`}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Key Features
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 dark:text-white text-gray-900"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Designed for{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Computer Science
              </span>{" "}
              Educators
            </motion.h2>

            <motion.p
              className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-900"} max-w-2xl mx-auto`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Specialized tools for evaluating multiple solution approaches to
              programming problems
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`p-8 rounded-xl transition-all ${
                  darkMode
                    ? index % 2 === 0 
                      ? "bg-gray-800/70 hover:bg-gray-800" 
                      : "bg-gray-700/50 hover:bg-gray-700"
                    : index % 2 === 0
                      ? "bg-white hover:bg-gray-50 border border-gray-900"
                      : "bg-sky-50 hover:bg-sky-100 border border-gray-900"
                } hover:shadow-lg cursor-pointer shadow-sm`}
                whileHover={{ y: -5 }}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`p-3 rounded-full mb-4 ${
                      darkMode
                        ? "bg-indigo-900/50 text-indigo-300"
                        : "bg-indigo-100 text-indigo-800"
                    } shadow-md`}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`p-8 rounded-2xl ${
                darkMode
                  ? activeFeature % 2 === 0
                    ? "bg-gray-800/70 border-gray-700"
                    : "bg-gray-700/50 border-gray-600"
                  : activeFeature % 2 === 0
                    ? "bg-white"
                    : "bg-sky-50"
              } shadow-lg backdrop-blur-sm`}
            >
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Image on the right */}
                <div className="lg:w-1/2 lg:order-2 h-[400px] flex items-center justify-center">
                  <div
                    className={`w-full h-full p-6 rounded-xl ${
                      darkMode ? "bg-gray-800/50" : "bg-white"
                    } shadow-lg border ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    } flex items-center justify-center`}
                  >
                    {activeFeature === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                      >
                        <div className="text-5xl mb-4">📊</div>
                        <h3
                          className={`text-xl font-semibold mb-2 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Multiple Methods
                        </h3>
                        <p
                          className={
                            darkMode ? "text-gray-300" : "text-gray-900"
                          }
                        >
                          Compare recursive, iterative, and DP solutions
                        </p>
                      </motion.div>
                    )}
                    {activeFeature === 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                      >
                        <div className="text-5xl mb-4">📝</div>
                        <h3
                          className={`text-xl font-semibold mb-2 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Detailed Rubrics
                        </h3>
                        <p
                          className={
                            darkMode ? "text-gray-300" : "text-gray-900"
                          }
                        >
                          Custom criteria for each solution type
                        </p>
                      </motion.div>
                    )}
                    {activeFeature === 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                      >
                        <div className="text-5xl mb-4">🔍</div>
                        <h3
                          className={`text-xl font-semibold mb-2 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Performance Insights
                        </h3>
                        <p
                          className={
                            darkMode ? "text-gray-300" : "text-gray-900"
                          }
                        >
                          Identify most effective approaches
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Text content on the left */}
                <div className="lg:w-1/2 lg:order-1">
                  <motion.h3
                    className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {features[activeFeature].details.title}
                  </motion.h3>

                  <ul className="space-y-4">
                    {features[activeFeature].details.items.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <span
                          className={`p-1 rounded-full mr-3 mt-1 ${
                            darkMode
                              ? "bg-indigo-900/50 text-indigo-300"
                              : "bg-indigo-100 text-indigo-800"
                          } shadow-sm`}
                        >
                          <FiCheck className="text-sm" />
                        </span>
                        <span
                          className={
                            darkMode ? "text-gray-300" : "text-gray-900"
                          }
                        >
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className={`py-20 ${darkMode ? "bg-gray-900/50" : "bg-sky-50"} backdrop-blur-sm relative`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FaChalkboardTeacher className="text-4xl text-indigo-600 dark:text-indigo-400 mx-auto mb-6" />
            </motion.div>

            <motion.blockquote
              className={`text-2xl md:text-3xl font-medium mb-8 ${
                darkMode ? "text-gray-200" : "text-gray-900"
              } leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              "This system has revolutionized how we evaluate different solution
              approaches in our algorithms course. We can now objectively
              compare recursive vs. iterative solutions with consistent
              criteria."
            </motion.blockquote>

            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
                TJ
              </div>
              <div className="text-left">
                <p
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Tarun T
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  Computer Science Department
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${darkMode ? "bg-gray-800/50" : "bg-white"} backdrop-blur-sm relative`}>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <motion.h2
  className={`text-3xl md:text-4xl font-bold mb-6 ${
    darkMode ? "text-white" : "text-gray-900"
  }`}
>
  Ready to Transform Your Evaluations?
</motion.h2>

            <motion.p
              className={`text-xl ${
                darkMode ? "text-gray-300" : "text-gray-900"
              } mb-10`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join educators using CodeGrader Pro to objectively assess multiple
              solution approaches.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSignUp(true)}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md hover:shadow-indigo-500/30 text-lg font-medium"
              >
                Start Free Trial
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 rounded-xl ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                } transition text-lg font-medium shadow-sm`}
              >
                Schedule Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? "bg-gray-900/80" : "bg-sky-50"} backdrop-blur-sm border-t ${
        darkMode ? "border-gray-800" : "border-gray-200"
      } relative`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex items-center space-x-2 mb-6 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <PiGraduationCapFill className="text-2xl text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                CodeGrader Pro
              </span>
            </motion.div>

            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
            >
              {["Privacy", "Terms", "Contact"].map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-indigo-400"
                      : "text-gray-900 hover:text-indigo-800"
                  } transition font-medium`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            className={`border-t ${
              darkMode ? "border-gray-800" : "border-gray-200"
            } mt-8 pt-8 text-center ${
              darkMode ? "text-gray-400" : "text-gray-900"
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} CodeGrader Pro. Developed by T. Tarun &
            M. Kowsik. All rights reserved.
          </motion.div>
        </div>
      </footer>

      {/* Sign In Modal */}
      <AnimatePresence>
        {showSignIn && (
          <SignIn
            onClose={() => setShowSignIn(false)}
            onSignUpClick={() => {
              setShowSignIn(false);
              setShowSignUp(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Sign Up Modal */}
      <AnimatePresence>
        {showSignUp && (
          <SignUp
            onClose={() => setShowSignUp(false)}
            onSignInClick={() => {
              setShowSignUp(false);
              setShowSignIn(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;