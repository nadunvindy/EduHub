import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    year: "",
    parent_id: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students");
        const data = await response.json();
        setStudents(data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    try {
      const response = await fetch("/api/add-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding student:", errorData.message);
        return;
      }

      const data = await response.json();
      setStudents((prev) => [...prev, data.student]);
      setNewStudent({
        first_name: "",
        last_name: "",
        email: "",
        year: "",
        parent_id: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleRemoveStudent = async (email) => {
    try {
      const response = await fetch("/api/remove-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error removing student:", errorData.message);
        return;
      }

      setStudents((prev) => prev.filter((student) => student.email !== email));
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-5 my-5">
        <div className="bg-white p-6 border border-primary rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Manage Students</h1>
          <div className="mb-6">
            <input
              type="text"
              placeholder="First Name"
              value={newStudent.first_name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, first_name: e.target.value })
              }
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newStudent.last_name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, last_name: e.target.value })
              }
              className="border p-2 mr-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent({ ...newStudent, email: e.target.value })
              }
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Year"
              value={newStudent.year}
              onChange={(e) =>
                setNewStudent({ ...newStudent, year: e.target.value })
              }
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Parent ID"
              value={newStudent.parent_id}
              onChange={(e) =>
                setNewStudent({ ...newStudent, parent_id: e.target.value })
              }
              className="border p-2 mr-2"
            />
            <button
              onClick={handleAddStudent}
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Add Student
            </button>
          </div>
          <ul>
            {students.map((student, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg"
              >
                {student.first_name} {student.last_name}
                <button
                  onClick={() => handleRemoveStudent(student.email)}
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
