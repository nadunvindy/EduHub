'use client';
import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [subjectStudents, setSubjectStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTeacherData = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        router.push("/"); // Redirect to login if not authenticated
        return;
      }

      const userData = JSON.parse(storedUser);
      if (userData.role !== "Teacher") {
        router.push("/"); // Redirect if not a teacher
        return;
      }

      setTeacher(userData);

      try {
        const subjectResponse = await fetch(`/api/teacher/subjects?teacher_id=${userData.id}`);
        const subjectData = await subjectResponse.json();
        setSubjects(subjectData.subjects);

        const studentResponse = await fetch("/api/students");
        const studentData = await studentResponse.json();
        setStudents(studentData.students);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTeacherData();
  }, [router]);

  const handleSubjectSelect = async (subjectId) => {
    setSelectedSubject(subjectId);

    try {
      const response = await fetch(`/api/teacher/subject-students?subject_id=${subjectId}`);
      const data = await response.json();
      setSubjectStudents(data.students);
    } catch (error) {
      console.error("Error fetching students for subject:", error);
    }
  };

  const handleEnrollStudent = async (studentId) => {
    try {
      const response = await fetch("/api/teacher/enroll-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: studentId, subject_id: selectedSubject }),
      });

      if (response.ok) {
        alert("Student enrolled successfully");
        handleSubjectSelect(selectedSubject); // Refresh enrolled students
      } else {
        alert("Failed to enroll student");
      }
    } catch (error) {
      console.error("Error enrolling student:", error);
    }
  };

  if (!teacher)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-5 my-5">
        <div className="bg-white p-6 border border-primary rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Teacher Details</h1>
          <p>
            <strong>Name:</strong> {teacher.first_name} {teacher.last_name}
          </p>
          <p>
            <strong>Email:</strong> {teacher.email}
          </p>
        </div>

        <div className="mt-5">
          <h2 className="text-2xl font-bold mb-4">Your Subjects</h2>
          {subjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <div
                  key={subject.subject_id}
                  className="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold">{subject.name}</h3>
                  <button
                    onClick={() => handleSubjectSelect(subject.subject_id)}
                    className="mt-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
                  >
                    Manage
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No subjects assigned.</p>
          )}
        </div>

        {selectedSubject && (
          <div className="mt-5">
            <h2 className="text-2xl font-bold mb-4">Managing Subject</h2>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Enrolled Students</h3>
              {subjectStudents.length > 0 ? (
                <ul>
                  {subjectStudents.map((student) => (
                    <li key={student.id}>
                      {student.first_name} {student.last_name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No students enrolled in this subject.</p>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Enroll a Student</h3>
              <ul>
                {students
                  .filter(
                    (student) =>
                      !subjectStudents.some((enrolled) => enrolled.id === student.id)
                  )
                  .map((student) => (
                    <li key={student.id} className="flex items-center justify-between">
                      {student.first_name} {student.last_name}
                      <button
                        onClick={() => handleEnrollStudent(student.id)}
                        className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Enroll
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
