import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function StudentSubjects() {
  const [subjects, setSubjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSubjects = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        router.push("/"); // Redirect to login if not authenticated
        return;
      }

      const userData = JSON.parse(storedUser);
      if (userData.role !== "Student") {
        router.push("/"); // Redirect if not a Student
        return;
      }

      try {
        const response = await fetch(`/api/student/subjects?student_id=${userData.id}`);
        const data = await response.json();
        setSubjects(data.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [router]);

  if (!subjects.length)
    return (
      <div className="flex items-center justify-center min-h-screen">
        No subjects found.
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-5 my-5">
        <h1 className="text-3xl font-bold mb-6">Subjects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold">{subject.name}</h2>
              <p className="mt-2">
                <strong>Description:</strong> {subject.description}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
