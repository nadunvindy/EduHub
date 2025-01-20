'use client';
import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function StudentDetails() {
  const router = useRouter();
  const { student_id } = router.query;
  const [teacher, setTeacher] = useState(null); // Logged-in teacher data
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [newGrade, setNewGrade] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch logged-in teacher data from local storage
    const storedTeacher = localStorage.getItem("user");
    if (!storedTeacher) {
      router.push("/"); // Redirect if not authenticated
      return;
    }
    setTeacher(JSON.parse(storedTeacher));

    const fetchStudentDetails = async () => {
      console.log("Router Query Student ID:", student_id);
      if (!student_id) return;

      try {
        const response = await fetch(`/api/student/details?student_id=${student_id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch student details: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Student Data:", data);
        setStudent(data.student);
        setSubjects(data.subjects);
      } catch (error) {
        console.error("Error fetching student details:", error.message);
        setError("Failed to load student details. Please try again later.");
      }
    };

    fetchStudentDetails();
  }, [student_id, router]);

  const handleModifyGrade = (subjectId, currentGrade) => {
    setEditingSubjectId(subjectId);
    setNewGrade(currentGrade || "");
  };

  const handleSaveGrade = async (subjectId) => {
    try {
      const teacher = JSON.parse(localStorage.getItem("user")); // Fetch teacher info
      if (!teacher || !teacher.id) {
        throw new Error("Teacher not authenticated.");
      }

      const response = await fetch(`/api/student/grade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-teacher-id": teacher.id, // Include teacher_id in headers
        },
        body: JSON.stringify({
          student_id,
          subject_id: subjectId,
          grade: newGrade,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update grade: ${response.statusText}`);
      }

      const updatedSubjects = subjects.map((subject) =>
        subject.subject_id === subjectId ? { ...subject, grade: newGrade } : subject
      );

      setSubjects(updatedSubjects);
      setEditingSubjectId(null);
      setNewGrade("");
    } catch (error) {
      console.error("Error updating grade:", error.message);
      setError("Failed to update grade. Please try again later.");
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!student || !teacher) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-5 my-5">
        <h1 className="text-3xl font-bold mb-4">Student Details</h1>
        <div className="bg-white p-6 border border-primary rounded-lg shadow-md">
          <p><strong>Name:</strong> {student.first_name} {student.last_name}</p>
          <p><strong>Year:</strong> {student.year}</p>
        </div>
        <h2 className="text-2xl font-bold mt-6 mb-4">Subjects</h2>
        <ul>
          {subjects.map((subject) => (
            <li key={subject.subject_id} className="my-2 bg-gray-100 p-4 rounded-lg shadow-md">
              <p><strong>{subject.subject_name}:</strong> {subject.description}</p>
              <div className="flex items-center mt-2">
                <p className="mr-4"><strong>Grade:</strong> {subject.grade || "Not Graded"}</p>
                {subject.teacher_id === teacher.id && (
                  editingSubjectId === subject.subject_id ? (
                    <>
                      <input
                        type="text"
                        value={newGrade}
                        onChange={(e) => setNewGrade(e.target.value)}
                        className="border p-2 mr-2"
                        placeholder="Enter new grade"
                      />
                      <button
                        onClick={() => handleSaveGrade(subject.subject_id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingSubjectId(null)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleModifyGrade(subject.subject_id, subject.grade)}
                      className="bg-primary text-white px-4 py-2 rounded-lg"
                    >
                      Modify
                    </button>
                  )
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
