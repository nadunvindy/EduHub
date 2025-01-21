import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ChildDetails() {
  const router = useRouter();
  const { student_id } = router.query;
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    const fetchChildSubjects = async () => {
      if (!student_id) {
        console.error("Student ID is missing.");
        setError("Invalid request. Student ID is required.");
        return;
      }

      try {
        const response = await fetch(`/api/student/subjects?student_id=${student_id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch subjects: ${response.statusText}`);
        }

        const data = await response.json();
        setSubjects(data.subjects);
      } catch (error) {
        console.error("Error fetching child subjects:", error.message);
        setError("Failed to load child details.");
      }
    };

    fetchChildSubjects();
  }, [router.isReady, student_id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!subjects.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No subjects found.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">Child Details</h1>
        <div className="bg-white p-6 border border-primary rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Subjects</h2>
          <ul className="space-y-6">
            {subjects.map((subject) => (
              <li
                key={subject.subject_id}
                className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col space-y-2"
              >
                <h3 className="text-xl font-bold">{subject.subject_name}</h3>
                <p>
                  <strong>Grade:</strong> {subject.grade || "Not Graded"}
                </p>
                <p>
                  <strong>Teacher:</strong> {subject.teacher_name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
