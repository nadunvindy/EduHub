import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function StudentSubjects() {
  const [student, setStudent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/"); // Redirect to login if not authenticated
    } else {
      const userData = JSON.parse(storedUser);
      if (userData.role !== "Student") {
        router.push("/"); // Redirect to login if not a Student
      } else {
        setStudent(userData); // Set logged-in student details
      }
    }
  }, [router]);

  if (!student)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  // Validate if student has subjects
  const subjects = student.subjects || []; // Default to an empty array if undefined

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-5 my-5">
        <h1 className="text-3xl font-bold mb-6">Subjects</h1>
        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-bold">{subject.title}</h2>
                <p className="mt-2">
                  <strong>Teacher:</strong> {subject.teacher || "N/A"}
                </p>
                <p className="mt-2">
                  <strong>Grade:</strong> {subject.grade || "N/A"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No subjects available.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
