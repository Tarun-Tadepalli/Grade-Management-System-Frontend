import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../dashboard/layout";

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [options, setOptions] = useState([{ text: "", marks: 0 }]);
  
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [subjectTypes, setSubjectTypes] = useState([]);
  
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectType, setNewSubjectType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  const fetchSubjects = async () => {
    try {
      const res = await fetch("http://localhost:2025/api/subjects");
      const data = await res.json();
      setSubjects(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load subjects");
    }
  };

  useEffect(() => {
    fetchSubjects();

    fetch("http://localhost:2025/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(Array.isArray(data) ? data : []));

    fetch("http://localhost:2025/api/questions/question-types")
      .then((res) => res.json())
      .then((data) => setQuestionTypes(Array.isArray(data) ? data : []));

    fetch("http://localhost:2025/api/subjects/subject-types")
      .then((res) => res.json())
      .then((data) => setSubjectTypes(Array.isArray(data) ? data : []));
  }, []);

  const handleAddOption = () => {
    setOptions([...options, { text: "", marks: 0 }]);
  };

  const handleOptionChange = (index, key, value) => {
    const updated = [...options];
    updated[index][key] = value;
    setOptions(updated);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const submitNewSubject = async () => {
    if (!newSubjectName || !newSubjectType || !departmentId) {
      toast.error("Subject name, type, and department are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:2025/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newSubjectName,
          type: newSubjectType,
          departmentId: departmentId,
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      toast.success("Subject added successfully!");
      setShowSubjectModal(false);
      setNewSubjectName("");
      setNewSubjectType("");
      fetchSubjects();
    } catch (err) {
      toast.error("Error creating subject");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title,
      type,
      subjectId: parseInt(subjectId),
      departmentId: parseInt(departmentId),
      options: options.filter((opt) => opt.text.trim() !== ""),
    };

    try {
      const response = await fetch("http://localhost:2025/api/questions/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit question");
      
      const data = await response.json();
      toast.success("Question added successfully!");
      setTitle("");
      setType("");
      setSubjectId("");
      setDepartmentId("");
      setOptions([{ text: "", marks: 0 }]);
      setAiSuggestions([]);
    } catch (error) {
      toast.error("Failed to submit question");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEvaluationTechniques = async () => {
    if (!title.trim()) {
      toast.error("Please enter a question first");
      return;
    }

    setAiLoading(true);
    setShowAiSuggestions(true);

    try {
      const response = await fetch("http://localhost:2025/api/gemini/suggest-evaluations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: title,
          subject: subjects.find(s => s.id === parseInt(subjectId))?.name || "general",
          questionType: type
        }),
      });

      if (!response.ok) throw new Error("Failed to get AI suggestions");

      const data = await response.json();
      setAiSuggestions(data.suggestions || []);
    } catch (error) {
      toast.error("Failed to get evaluation techniques");
      const mockSuggestions = generateMockSuggestions(title);
      setAiSuggestions(mockSuggestions);
    } finally {
      setAiLoading(false);
    }
  };

  const generateMockSuggestions = (question) => {
    if (question.toLowerCase().includes("linked list")) {
      return [
        "Solved using singly linked list",
        "Solved using doubly linked list",
        "Solved with recursion",
        "Solved iteratively",
        "Solved with stack approach",
        "Solved with two-pointer technique",
        "Solved with dummy node approach",
        "Solved with tail pointer optimization",
        "Solved with hash map for cycle detection",
        "Solved with fast/slow pointer technique"
      ];
    } else if (question.toLowerCase().includes("array")) {
      return [
        "Solved with brute force approach",
        "Solved with two-pointer technique",
        "Solved with sliding window",
        "Solved with hash map/dictionary",
        "Solved with sorting first",
        "Solved with binary search",
        "Solved with dynamic programming",
        "Solved with divide and conquer",
        "Solved with prefix sum technique",
        "Solved with bit manipulation"
      ];
    } else if (question.toLowerCase().includes("tree")) {
      return [
        "Solved with depth-first search (DFS)",
        "Solved with breadth-first search (BFS)",
        "Solved with recursive traversal",
        "Solved with iterative traversal",
        "Solved with Morris traversal",
        "Solved with level order traversal",
        "Solved with post-order traversal",
        "Solved with in-order traversal",
        "Solved with pre-order traversal",
        "Solved with serialization approach"
      ];
    } else {
      return [
        "Analytical solution",
        "Theoretical approach",
        "Mathematical proof",
        "Step-by-step derivation",
        "Conceptual explanation",
        "Diagrammatic representation",
        "Case study approach",
        "Comparative analysis",
        "Historical context analysis",
        "Practical implementation"
      ];
    }
  };

  const addSuggestionAsOption = (suggestion) => {
    if (options.some(opt => opt.text.toLowerCase() === suggestion.toLowerCase())) {
      toast.error("This evaluation technique already exists");
      return;
    }
    
    setOptions([...options, { text: suggestion, marks: 5 }]);
    toast.success("Evaluation technique added!");
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Layout>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full"
        >
          {/* Form Section */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl shadow-2xl transition-all duration-500 h-full overflow-y-auto bg-white dark:bg-gray-800"
          >
            <div className="flex items-center mb-6">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="mr-4"
              >
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Add New Question
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="relative"
              >
                <label className="absolute -top-2 left-4 px-2 text-xs font-medium bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-300">
                  Question Title
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="Enter your question here..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  rows={3}
                  required
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                >
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Question Type
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Select Type</option>
                    {questionTypes.map((qt) => (
                      <option key={qt} value={qt}>
                        {qt.charAt(0) + qt.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                >
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Department
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.div 
                whileHover={{ scale: 1.01 }}
              >
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <div className="flex space-x-2">
                  <select
                    className="flex-grow px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowSubjectModal(true)}
                    className="px-4 rounded-xl transition-all duration-300 flex items-center bg-indigo-500 hover:bg-indigo-600 text-white shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New
                  </motion.button>
                </div>
              </motion.div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Evaluation Techniques
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={getEvaluationTechniques}
                    disabled={!title.trim()}
                    className={`text-xs px-3 py-1 rounded-lg transition-all duration-300 flex items-center ${
                      !title.trim() 
                        ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
                        : 'bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700'
                    } text-white shadow-md`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    AI Suggestions
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {options.map((opt, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start space-x-3 p-3 rounded-xl mb-3 transition-all duration-300 bg-gray-50 dark:bg-gray-700"
                    >
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">
                            Technique
                          </label>
                          <input
                            className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                            placeholder={`Evaluation technique ${index + 1}`}
                            value={opt.text}
                            onChange={(e) =>
                              handleOptionChange(index, "text", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">
                            Marks
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                            placeholder="Marks"
                            value={opt.marks}
                            onChange={(e) =>
                              handleOptionChange(
                                index,
                                "marks",
                                parseInt(e.target.value)
                              )
                            }
                            required
                          />
                        </div>
                      </div>
                      {options.length > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          className="mt-6 p-1 rounded-full transition-all duration-300 text-red-500 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleAddOption}
                  className="mt-3 inline-flex items-center transition-all duration-300 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Technique
                </motion.button>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-xl font-medium text-lg shadow-lg transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Submit Question
                    </span>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Gemini AI Suggestions Panel */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl shadow-2xl transition-all duration-500 h-[80vh] overflow-hidden flex flex-col bg-white dark:bg-gray-800"
          >
            <div className="flex items-center mb-6">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="mr-4"
              >
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                AI Evaluation Suggestions
              </h2>
            </div>
            
            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
              {showAiSuggestions ? (
                <>
                  {aiLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="mb-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </motion.div>
                      <motion.p
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-lg text-gray-600 dark:text-gray-300"
                      >
                        Analyzing your question...
                      </motion.p>
                      <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                        Gemini AI is suggesting evaluation techniques
                      </p>
                    </motion.div>
                  ) : aiSuggestions.length > 0 ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4 p-4 rounded-xl bg-indigo-50 dark:bg-gray-700 border border-indigo-200 dark:border-gray-600"
                      >
                        <h3 className="font-medium text-indigo-700 dark:text-indigo-300">
                          Suggested Evaluation Techniques:
                        </h3>
                        <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                          Based on: "{title.substring(0, 50)}{title.length > 50 ? '...' : ''}"
                        </p>
                      </motion.div>
                      
                      <AnimatePresence>
                        {aiSuggestions.map((suggestion, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 rounded-xl transition-all duration-300 bg-gray-50 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 hover:shadow-md flex justify-between items-center"
                          >
                            <div>
                              <h3 className="font-medium text-gray-800 dark:text-white">
                                {suggestion}
                              </h3>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => addSuggestionAsOption(suggestion)}
                              className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                              </svg>
                            </motion.button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="text-center py-10 rounded-xl bg-gray-50 dark:bg-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500"
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
                      <motion.p 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mt-3 text-lg text-gray-500 dark:text-gray-300"
                      >
                        No suggestions generated
                      </motion.p>
                      <p className="text-sm text-gray-400 dark:text-gray-400">
                        Try entering a more detailed question
                      </p>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-center py-10 rounded-xl bg-gray-50 dark:bg-gray-700 h-full flex flex-col items-center justify-center"
                >
                  <div className="p-4 rounded-full bg-gray-200 dark:bg-gray-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">
                    Gemini AI Assistant
                  </h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    Get AI-powered evaluation technique suggestions for your questions
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={getEvaluationTechniques}
                    disabled={!title.trim()}
                    className={`px-6 py-2 rounded-xl font-medium shadow-lg transition-all duration-300 ${
                      !title.trim() 
                        ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
                    } text-white`}
                  >
                    Generate Suggestions
                  </motion.button>
                  <p className="text-xs mt-6 text-gray-500 dark:text-gray-400">
                    Enter a question and click the button to get started
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.main>

      {/* New Subject Modal */}
      <AnimatePresence>
        {showSubjectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="rounded-3xl shadow-2xl w-full max-w-md bg-white dark:bg-gray-800"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Create New Subject
                  </h3>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    onClick={() => setShowSubjectModal(false)}
                    className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Subject Name
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      placeholder="e.g. Mathematics, Physics"
                      value={newSubjectName}
                      onChange={(e) => setNewSubjectName(e.target.value)}
                      required
                    />
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Subject Type
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      value={newSubjectType}
                      onChange={(e) => setNewSubjectType(e.target.value)}
                      required
                    >
                      <option value="">Select Subject Type</option>
                      {subjectTypes.map((stype) => (
                        <option key={stype} value={stype}>
                          {stype.charAt(0) + stype.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Department
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      value={departmentId}
                      onChange={(e) => setDepartmentId(e.target.value)}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-xl transition-all duration-300 font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    onClick={() => setShowSubjectModal(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-xl transition-all duration-300 font-medium shadow-lg bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={submitNewSubject}
                  >
                    Add Subject
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default AddQuestion;