import "../public/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    first_name: "",
    last_name: "",
    subject_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teachers
        const teacherResponse = await fetch("/api/teachers");
        const teacherData = await teacherResponse.json();
        setTeachers(teacherData.teachers);

        // Fetch subjects
        const subjectResponse = await fetch("/api/subjects");
        const subjectData = await subjectResponse.json();
        setSubjects(subjectData.subjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddTeacher = async () => {
    if (!newTeacher.first_name || !newTeacher.last_name || !newTeacher.subject_id) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch("/api/add-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacher),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding teacher:", errorData.message);
        return;
      }

      const data = await response.json();
      setTeachers((prev) => [...prev, data.teacher]);
      setNewTeacher({ first_name: "", last_name: "", subject_id: "" });
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const handleRemoveTeacher = async (id) => {
    try {
      const response = await fetch("/api/remove-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error removing teacher:", errorData.message);
        return;
      }

      setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    } catch (error) {
      console.error("Error removing teacher:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-5 my-5">
        <div className="bg-white p-6 border border-primary rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Manage Teachers</h1>
          <div className="mb-6">
            <input
              type="text"
              placeholder="First Name"
              value={newTeacher.first_name}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, first_name: e.target.value })
              }
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newTeacher.last_name}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, last_name: e.target.value })
              }
              className="border p-2 mr-2"
            />
            <select
              value={newTeacher.subject_id}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, subject_id: e.target.value })
              }
              className="border p-2 mr-2"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.subject_id} value={subject.subject_id}>
                  {subject.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddTeacher}
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Add Teacher
            </button>
          </div>
          <ul>
            {teachers.map((teacher) => (
              <li
                key={teacher.id}
                className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg"
              >
                {teacher.first_name} {teacher.last_name}
                {teacher.subject_id}
                <button
                  onClick={() => handleRemoveTeacher(teacher.id)}
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
