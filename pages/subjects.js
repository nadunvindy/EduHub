import "../public/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useState, useEffect } from "react";

export default function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("/api/subjects");
        const data = await response.json();
        setSubjects(data.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleAddSubject = async () => {
    try {
      const response = await fetch("/api/add-subject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSubject),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding subject:", errorData.message);
        return;
      }

      const addedSubject = await response.json();
      setSubjects((prev) => [...prev, addedSubject]);
      setNewSubject({ name: "", description: "" });
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const handleRemoveSubject = async (subjectId) => {
    try {
      const response = await fetch(`/api/remove-subject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject_id: subjectId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error removing subject:", errorData.message);
        return;
      }

      setSubjects((prev) => prev.filter((subject) => subject.subject_id !== subjectId));
    } catch (error) {
      console.error("Error removing subject:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-5 my-5">
        <div className="bg-white p-6 border border-primary rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Manage Subjects</h1>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Add Subject</h2>
            <input
              type="text"
              placeholder="Subject Name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={newSubject.description}
              onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
              className="border p-2 mr-2"
            />
            <button
              onClick={handleAddSubject}
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Add Subject
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4">Existing Subjects</h2>
          <ul>
            {subjects.map((subject) => (
              <li
                key={subject.subject_id}
                className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg"
              >
                <div>
                  <p>
                    <strong>Name:</strong> {subject.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {subject.description}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveSubject(subject.subject_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
