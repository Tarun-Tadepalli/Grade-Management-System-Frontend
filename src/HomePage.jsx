import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBook,
  FiEdit2,
  FiZap,
  FiBarChart2,
  FiSun,
  FiMoon,
  FiArrowRight,
} from "react-icons/fi";
import { FaGoogle, FaChalkboardTeacher } from "react-icons/fa";
import { PiGraduationCapFill } from "react-icons/pi";
import { Link } from "react-router-dom";

// Vector illustrations (would be separate SVG files in reality)
const EvaluationIllustration = () => (
  <svg viewBox="0 0 500 300" className="w-full h-auto">
    {/* Modern vector illustration of grading dashboard */}
    <rect
      x="50"
      y="50"
      width="400"
      height="200"
      rx="10"
      fill="#6366F1"
      opacity="0.1"
    />
    <rect x="70" y="80" width="120" height="40" rx="5" fill="#4F46E5" />
    <rect x="70" y="140" width="360" height="20" rx="5" fill="#A5B4FC" />
    <rect x="70" y="180" width="300" height="20" rx="5" fill="#A5B4FC" />
    <rect x="70" y="220" width="280" height="20" rx="5" fill="#A5B4FC" />
    <circle cx="400" cy="100" r="30" fill="#8B5CF6" />
  </svg>
);

const FeatureIllustration = ({ index }) => {
  const illustrations = [
    <svg key="0" viewBox="0 0 200 200" className="w-40 h-40">
      <rect x="30" y="50" width="140" height="120" rx="10" fill="#E0E7FF" />
      <rect x="50" y="70" width="100" height="20" rx="5" fill="#4F46E5" />
      <rect x="50" y="100" width="80" height="15" rx="5" fill="#8B5CF6" />
      <rect x="50" y="125" width="60" height="15" rx="5" fill="#C4B5FD" />
    </svg>,
    <svg key="1" viewBox="0 0 200 200" className="w-40 h-40">
      <rect x="40" y="40" width="120" height="120" rx="10" fill="#F5F3FF" />
      <path
        d="M60 80 L140 80 L140 160 L60 160 Z"
        fill="#8B5CF6"
        opacity="0.3"
      />
      <circle cx="100" cy="100" r="30" fill="#7C3AED" />
      <line
        x1="100"
        y1="60"
        x2="100"
        y2="140"
        stroke="#4F46E5"
        strokeWidth="4"
      />
      <line
        x1="60"
        y1="100"
        x2="140"
        y2="100"
        stroke="#4F46E5"
        strokeWidth="4"
      />
    </svg>,
    <svg key="2" viewBox="0 0 200 200" className="w-40 h-40">
      <circle cx="100" cy="100" r="80" fill="#EDE9FE" />
      <path d="M100 40 A60 60 0 0 1 160 100 L100 100 Z" fill="#8B5CF6" />
      <path d="M100 160 A60 60 0 0 1 40 100 L100 100 Z" fill="#7C3AED" />
      <circle cx="100" cy="100" r="30" fill="#5B21B6" />
    </svg>,
  ];
  return illustrations[index];
};

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 to-indigo-50 text-gray-900"
      }`}
    >
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PiGraduationCapFill className="text-3xl text-indigo-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            GradeEval Pro
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-amber-300"
                : "bg-gray-200 text-indigo-700"
            }`}
          >
            {darkMode ? (
              <FiSun className="text-xl" />
            ) : (
              <FiMoon className="text-xl" />
            )}
          </button>
          <Link to="/signin">
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Precision Grading <br />
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg">
              The modern evaluation system that helps educators create
              structured assessments, track student progress, and deliver
              meaningful feedback efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md hover:shadow-indigo-500/30 flex items-center gap-2"
                >
                  Get Started <FiArrowRight />
                </motion.button>
              </Link>
              <Link to="/signin">
                <button className="px-8 py-3.5 flex items-center justify-center gap-2 bg-white text-gray-800 rounded-xl hover:bg-gray-50 transition border border-gray-200 shadow-sm">
                  <FaGoogle className="text-blue-500" /> Sign in with Google
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white"
                  ></div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Trusted by 500+ educators worldwide
              </p>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div
              className={`p-1 rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-xl`}
            >
              <EvaluationIllustration />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800 mb-4">
              Powerful Features
            </span>
            <h2 className="text-3xl font-bold mb-4">
              Designed for <span className="text-indigo-600">Educators</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Streamline your evaluation process with our comprehensive toolset
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <FiBook className="text-3xl mb-4 text-indigo-600" />,
                title: "Subject Management",
                description:
                  "Organize courses by departments with customizable structures",
              },
              {
                icon: <FiEdit2 className="text-3xl mb-4 text-violet-600" />,
                title: "Rubric Builder",
                description:
                  "Create detailed evaluation criteria with weighted scoring",
              },
              {
                icon: <FiZap className="text-3xl mb-4 text-blue-600" />,
                title: "AI Assistance",
                description: "Get smart suggestions for assessment criteria",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-xl ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                } hover:shadow-lg transition cursor-pointer ${
                  activeFeature === index ? "ring-2 ring-indigo-500" : ""
                }`}
                whileHover={{ y: -5 }}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
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
              transition={{ duration: 0.3 }}
              className={`p-8 rounded-2xl ${
                darkMode ? "bg-gray-700" : "bg-indigo-50"
              } shadow-lg`}
            >
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  {activeFeature === 0 && (
                    <>
                      <h3 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
                        Organize Your Curriculum
                      </h3>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>
                            Hierarchical subject organization by department and
                            category
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>
                            Customizable grading templates for different course
                            types
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>
                            Collaborative environment for department-wide
                            standards
                          </span>
                        </li>
                      </ul>
                    </>
                  )}
                  {activeFeature === 1 && (
                    <>
                      <h3 className="text-2xl font-bold mb-4 text-violet-700 dark:text-violet-300">
                        Build Better Rubrics
                      </h3>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-violet-500 mr-2">•</span>
                          <span>
                            Create multi-dimensional evaluation criteria
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-violet-500 mr-2">•</span>
                          <span>
                            Set weighted scoring for different competency levels
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-violet-500 mr-2">•</span>
                          <span>
                            Standardized rubrics across your institution
                          </span>
                        </li>
                      </ul>
                    </>
                  )}
                  {activeFeature === 2 && (
                    <>
                      <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">
                        Intelligent Assistance
                      </h3>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>
                            AI-generated suggestions for evaluation criteria
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>
                            Automated rubric generation based on learning
                            objectives
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Bias detection in assessment design</span>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <FeatureIllustration index={activeFeature} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-indigo-100"}`}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <FaChalkboardTeacher className="text-4xl text-indigo-600 mx-auto mb-6" />
            <blockquote className="text-2xl font-medium mb-8 text-gray-800 dark:text-gray-200">
              "GradeEval Pro has transformed how our department handles
              assessments. We've reduced grading time by 40% while improving the
              quality of feedback."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500"></div>
              <div className="text-left">
                <p className="font-semibold">Dr. Sarah Johnson</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Chair, Computer Science Department
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Elevate Your Grading Process?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Join thousands of educators using GradeEval Pro to save time and
              enhance student learning outcomes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md hover:shadow-indigo-500/30 text-lg font-medium"
              >
                Start Free Trial
              </motion.button>
              <button className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition text-lg font-medium">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <PiGraduationCapFill className="text-2xl text-indigo-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                GradeEval Pro
              </span>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} GradeEval Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
