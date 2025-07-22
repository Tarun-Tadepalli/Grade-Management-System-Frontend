import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Layout from "../dashboard/layout";

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.3]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      fetch("http://localhost:2025/api/questions", {
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch questions");
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setQuestions(data);
          } else {
            throw new Error("Invalid data format");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Could not load questions");
        })
        .finally(() => setIsLoading(false));
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 50,
      opacity: 0,
      rotateX: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const optionVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "backOut"
      }
    }),
    hover: {
      x: 5,
      backgroundColor: "rgba(79, 70, 229, 0.3)"
    }
  };

  return (
    <Layout>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* Animated background elements */}
        <motion.div 
          style={{ opacity: backgroundOpacity }}
          className="fixed inset-0 overflow-hidden"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                rotate: Math.random() * 360
              }}
              animate={{
                x: [null, Math.random() * 100 - 50],
                y: [null, Math.random() * 100 - 50],
                rotate: [null, Math.random() * 360],
                transition: {
                  duration: 20 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          {/* Page Header */}
          <motion.div 
            variants={cardVariants}
            className="flex items-center mb-8 p-6 rounded-2xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700"
          >
            <motion.div 
              animate={{ 
                rotate: 360,
                transition: {
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              className="mr-4"
            >
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </motion.div>
            <motion.h1
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%'],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }
              }}
              className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent bg-[length:300%_100%]"
            >
              All Questions
            </motion.h1>
          </motion.div>

          {/* Loading Animation */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-64"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="mb-4"
              >
                <svg className="h-16 w-16 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </motion.div>
              <motion.p
                animate={{
                  opacity: [0.6, 1, 0.6],
                  transition: {
                    duration: 2,
                    repeat: Infinity
                  }
                }}
                className="text-lg text-gray-600 dark:text-gray-300"
              >
                Loading your questions...
              </motion.p>
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && questions.length === 0 && (
            <motion.div
              variants={cardVariants}
              className="text-center py-16 rounded-2xl shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mx-auto text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
              <motion.h2
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%'],
                  transition: {
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }
                }}
                className="mt-6 text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-500 bg-clip-text text-transparent bg-[length:300%_100%]"
              >
                No Questions Found
              </motion.h2>
              <motion.p
                animate={{
                  opacity: [0.7, 1, 0.7],
                  transition: {
                    duration: 3,
                    repeat: Infinity
                  }
                }}
                className="mt-2 text-gray-500 dark:text-gray-400"
              >
                The question bank is currently empty
              </motion.p>
              <motion.button
                whileHover={{ 
                  y: -3,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-2 rounded-full font-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-md"
              >
                Add First Question
              </motion.button>
            </motion.div>
          )}

          {/* Questions List */}
          {!isLoading && questions.length > 0 && (
            <div className="space-y-6">
              <AnimatePresence>
                {questions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="rounded-2xl overflow-hidden transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg"
                    style={{
                      transformOrigin: "center top",
                      perspective: "1000px"
                    }}
                  >
                    <div className="p-6">
                      {/* Question Header */}
                      <div className="flex items-start justify-between">
                        <motion.h3 
                          animate={{
                            color: hoveredCard === index 
                              ? "#6366f1"
                              : "var(--text-primary)"
                          }}
                          className="text-xl font-bold dark:text-white"
                        >
                          {q.title}
                        </motion.h3>
                        <motion.div
                          animate={{
                            scale: hoveredCard === index ? 1.1 : 1,
                            backgroundColor: hoveredCard === index
                              ? "rgba(199, 210, 254, 0.5)"
                              : "rgba(249, 250, 251, 0.7)"
                          }}
                          className="px-3 py-1 rounded-full text-xs font-medium shadow-sm dark:bg-gray-700"
                        >
                          {q.type}
                        </motion.div>
                      </div>

                      {/* Meta Information */}
                      <motion.div 
                        className="flex flex-wrap gap-4 mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {q.subject?.name && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center"
                          >
                            <motion.svg 
                              animate={{
                                rotate: hoveredCard === index ? 15 : 0
                              }}
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 mr-1 text-indigo-500 dark:text-indigo-300" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </motion.svg>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {q.subject.name}
                            </span>
                          </motion.div>
                        )}
                        {q.department?.name && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center"
                          >
                            <motion.svg 
                              animate={{
                                rotate: hoveredCard === index ? -15 : 0
                              }}
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 mr-1 text-indigo-500 dark:text-indigo-300" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </motion.svg>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {q.department.name}
                            </span>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Options List */}
                      {q.options?.length > 0 && (
                        <motion.ul 
                          className="mt-4 space-y-2"
                        >
                          {q.options.map((opt, i) => (
                            <motion.li
                              key={i}
                              custom={i}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              variants={optionVariants}
                              className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center"
                            >
                              <span className="text-gray-700 dark:text-gray-200">
                                {opt.text}
                              </span>
                              <motion.span
                                whileHover={{ scale: 1.1 }}
                                className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/80 dark:text-indigo-200 shadow-sm"
                              >
                                {opt.marks} marks
                              </motion.span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.main>

      {/* Floating action button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ 
            scale: 1.1,
            rotate: 10,
            boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full shadow-xl bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Particle background */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              opacity: [0, 0.8, 0],
              transition: {
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
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
};

export default AllQuestions;