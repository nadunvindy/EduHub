import "../public/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function StudentSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [error, setError] = useState("");
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
        if (!response.ok) {
          throw new Error(`Failed to fetch subjects: ${response.statusText}`);
        }
        const data = await response.json();
        setSubjects(data.subjects);
        setSelectedSubject(data.subjects[0]); // Select the first subject by default
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
        setError("Failed to load subjects. Please try again later.");
      }
    };

    fetchSubjects();
  }, [router]);

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
      <main className="flex-grow flex">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-gray-100 p-6 border-r">
          <h2 className="text-2xl font-bold mb-6">Subjects</h2>
          <ul className="space-y-4">
            {subjects.map((subject, index) => (
              <li
                key={index}
                className={`cursor-pointer p-4 text-lg font-semibold rounded-lg text-center ${
                  selectedSubject && selectedSubject.name === subject.name
                    ? "bg-secondary text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedSubject(subject)}
              >
                {subject.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className="flex-grow bg-white p-6">
          {selectedSubject ? (
            <div>
              <h2 className="text-4xl font-bold mb-6">{selectedSubject.name}</h2>
              <p className="text-lg mb-6">
                <strong>Description:</strong> {selectedSubject.description}
              </p>
              <p className="text-7xl font-bold mb-6 text-primary">
                <strong>Grade:</strong> {selectedSubject.grade || "Not Graded"}
              </p>
              <p className="text-lg">
                <strong>Teacher:</strong> {selectedSubject.teacher_name || "N/A"}
              </p>
            </div>
          ) : (
            <div>Select a subject to view details.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
