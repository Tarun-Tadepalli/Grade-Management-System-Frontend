import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2025/api/questions", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setQuestions(data);
        else throw new Error("Invalid data format");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Could not load questions");
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Questions</h1>

      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        questions.map((q) => (
          <div
            key={q.id}
            className="border p-4 mb-4 rounded shadow-sm bg-white"
          >
            <div className="font-bold text-lg">{q.title}</div>
            <div className="text-sm text-gray-600 mb-1">Type: {q.type}</div>
            <div className="text-sm text-gray-600 mb-1">
              Subject: {q.subject?.name}
            </div>
            <div className="text-sm text-gray-600 mb-1">
              Department: {q.department?.name}
            </div>

            {q.options?.length > 0 && (
              <ul className="mt-2 list-disc pl-5">
                {q.options.map((opt, i) => (
                  <li key={i}>
                    <span className="font-medium">{opt.text}</span> —{" "}
                    <span className="text-gray-500">{opt.marks} marks</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AllQuestions;
