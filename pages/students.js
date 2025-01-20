import "../public/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    year: "",
    parent_id: "",
  });

  useEffect(() => {
    const fetchStudentsAndParents = async () => {
      try {
        const studentResponse = await fetch("/api/students");
        const studentData = await studentResponse.json();
        setStudents(studentData.students);

        const parentResponse = await fetch("/api/parents");
        const parentData = await parentResponse.json();
        setParents(parentData.parents);
      } catch (error) {
        console.error("Error fetching students or parents:", error);
      }
    };

    fetchStudentsAndParents();
  }, []);

  const handleAddStudent = async () => {
    if (!newStudent.first_name || !newStudent.last_name || !newStudent.year || !newStudent.parent_id) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch("/api/add-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      setStudents((prev) => [...prev, data.student]);
      setNewStudent({ first_name: "", last_name: "", year: "", parent_id: "" });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      const response = await fetch("/api/remove-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: studentId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      setStudents((prev) => prev.filter((student) => student.id !== studentId));
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
            <h2 className="text-xl font-bold mb-2">Add Student</h2>
            <input
              type="text"
              placeholder="First Name"
              value={newStudent.first_name}
              onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newStudent.last_name}
              onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Year"
              value={newStudent.year}
              onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
              className="border p-2 mr-2"
            />
            <select
              value={newStudent.parent_id}
              onChange={(e) => setNewStudent({ ...newStudent, parent_id: e.target.value })}
              className="border p-2 mr-2"
            >
              <option value="">Select Parent</option>
              {parents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.first_name} {parent.last_name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddStudent}
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Add Student
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4">Existing Students</h2>
          <ul>
            {students.map((student) => (
              <li
                key={student.id}
                className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg"
              >
                {student.first_name} {student.last_name}
                <button
                  onClick={() => handleRemoveStudent(student.id)}
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
