import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [options, setOptions] = useState([{ text: "", marks: 0 }]);
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [subjectTypes, setSubjectTypes] = useState([]);

  // Modal state
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectType, setNewSubjectType] = useState("");

  // Fetch data from APIs
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

    fetch("http://localhost:2025/api/questions")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          setQuestions([]);
          toast.error("Invalid data format for questions");
        }
      })
      .catch(() => toast.error("Failed to load questions"));

    fetch("http://localhost:2025/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load departments"));

    fetch("http://localhost:2025/api/questions/question-types")
      .then((res) => res.json())
      .then((data) => setQuestionTypes(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load question types"));

    fetch("http://localhost:2025/api/subjects/subject-types")
      .then((res) => res.json())
      .then((data) => setSubjectTypes(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load subject types"));
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
    const updated = [...options];
    updated.splice(index, 1);
    setOptions(updated);
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
      toast.success("Question added!");

      // Fetch updated questions after submit
      fetch("http://localhost:2025/api/questions")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setQuestions(data);
          } else {
            setQuestions([]);
            toast.error("Invalid data format for questions");
          }
        })
        .catch(() => toast.error("Failed to load questions"));
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add a New Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Question Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          className="w-full p-2 mb-3 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Select Question Type</option>
          {questionTypes.map((qt) => (
            <option key={qt} value={qt}>
              {qt.charAt(0) + qt.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 border rounded"
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

        <div>
          <select
            className="w-full p-2 border rounded"
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
          <button
            type="button"
            onClick={() => setShowSubjectModal(true)}
            className="mt-1 text-sm text-indigo-600 hover:underline"
          >
            + Add new subject
          </button>
        </div>

        <div>
          <label className="block font-semibold mb-2">Options</label>
          {options.map((opt, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                className="flex-1 p-2 border rounded"
                placeholder={`Option ${index + 1}`}
                value={opt.text}
                onChange={(e) =>
                  handleOptionChange(index, "text", e.target.value)
                }
                required
              />
              <input
                type="number"
                className="w-20 p-2 border rounded"
                placeholder="Marks"
                value={opt.marks}
                onChange={(e) =>
                  handleOptionChange(index, "marks", parseInt(e.target.value))
                }
                required
              />
              <button
                type="button"
                className="text-red-500 ml-2"
                onClick={() => handleRemoveOption(index)}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="text-sm text-indigo-600 hover:underline mt-1"
          >
            + Add Option
          </button>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-10 mb-4">All Questions</h2>
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="p-4 border rounded shadow-sm bg-white">
            <h3 className="font-bold">{q.title}</h3>
            <p className="text-sm text-gray-500">Type: {q.type}</p>
            <ul className="list-disc list-inside mt-2">
              {q.options?.map((opt, i) => (
                <li key={i}>
                  {opt.text} ({opt.marks} marks)
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal for adding a new subject */}
      {showSubjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Subject</h3>
            <input
              className="w-full p-2 mb-3 border rounded"
              placeholder="Subject Name"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
            />

            <select
              className="w-full p-2 mb-3 border rounded"
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

            <select
              className="w-full p-2 mb-4 border rounded"
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

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowSubjectModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={submitNewSubject}
              >
                Add Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddQuestion;
