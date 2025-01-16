'use client';
import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]); // All students from JSON
  const [subjectStudents, setSubjectStudents] = useState([]); // Students for the selected subject
  const [selectedSubject, setSelectedSubject] = useState(null); // The subject being managed
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
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

      // Fetch all students from the API
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data.students);
    };

    fetchData();
  }, [router]);

  const handleSubjectSelect = async (subject) => {
    setSelectedSubject(subject);

    // Filter students enrolled in the selected subject
    const enrolledStudents = students.filter((student) =>
      student.subjects.some((subj) => subj.title === subject)
    );
    setSubjectStudents(enrolledStudents);
  };

  const handleEnrollStudent = async (student) => {
    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentEmail: student.email,
        subject: selectedSubject,
        teacherEmail: teacher.email,
      }),
    });

    if (res.ok) {
      alert(`${student.first_name} ${student.last_name} has been enrolled in ${selectedSubject}`);
      handleSubjectSelect(selectedSubject); // Refresh enrolled students list
    } else {
      alert("Failed to enroll student");
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
          {teacher.subjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teacher.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold">{subject}</h3>
                  <button
                    onClick={() => handleSubjectSelect(subject)}
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
            <h2 className="text-2xl font-bold mb-4">Managing: {selectedSubject}</h2>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Enrolled Students</h3>
              {subjectStudents.length > 0 ? (
                <ul>
                  {subjectStudents.map((student, index) => (
                    <li key={index}>{student.first_name} {student.last_name}</li>
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
                  .filter((student) => !student.subjects.some((subj) => subj.title === selectedSubject))
                  .map((student) => (
                    <li key={student.email} className="flex items-center justify-between">
                      {student.first_name} {student.last_name}
                      <button
                        onClick={() => handleEnrollStudent(student)}
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
