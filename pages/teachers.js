import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subjects: "",
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/teachers");
        const data = await response.json();
        setTeachers(data.teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleAddTeacher = async () => {
    try {
      const response = await fetch("/api/add-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newTeacher,
          subjects: newTeacher.subjects.split(",").map((s) => s.trim()),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding teacher:", errorData.message);
        return;
      }

      const data = await response.json();
      setTeachers((prev) => [...prev, data.teacher]);
      setNewTeacher({ first_name: "", last_name: "", email: "", subjects: "" });
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const handleRemoveTeacher = async (email) => {
    try {
      const response = await fetch("/api/remove-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error removing teacher:", errorData.message);
        return;
      }

      setTeachers((prev) => prev.filter((teacher) => teacher.email !== email));
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
              onChange={(e) => setNewTeacher({ ...newTeacher, first_name: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newTeacher.last_name}
              onChange={(e) => setNewTeacher({ ...newTeacher, last_name: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newTeacher.email}
              onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Subjects (comma-separated)"
              value={newTeacher.subjects}
              onChange={(e) => setNewTeacher({ ...newTeacher, subjects: e.target.value })}
              className="border p-2 mr-2"
            />
            <button
              onClick={handleAddTeacher}
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Add Teacher
            </button>
          </div>
          <ul>
            {teachers.map((teacher, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg"
              >
                {teacher.first_name} {teacher.last_name} ({teacher.email})
                <button
                  onClick={() => handleRemoveTeacher(teacher.email)}
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
