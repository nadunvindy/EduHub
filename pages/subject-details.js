import "../src/globals.css"; 
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SubjectDetails() {
  const router = useRouter();
  const { subject_id, student_id } = router.query;
  const [subject, setSubject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    const fetchSubjectDetails = async () => {
      if (!subject_id || !student_id) {
        console.error("Subject ID or Student ID is missing.");
        setError("Invalid request. Subject ID and Student ID are required.");
        return;
      }

      try {
        const response = await fetch(`/api/subject/details?subject_id=${subject_id}&student_id=${student_id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch subject details: ${response.statusText}`);
        }

        const data = await response.json();
        setSubject(data.subject);
      } catch (error) {
        console.error("Error fetching subject details:", error.message);
        setError("Failed to load subject details.");
      }
    };

    fetchSubjectDetails();
  }, [router.isReady, subject_id, student_id]);

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  if (!subject) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow p-8 mx-auto max-w-4xl bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-primary">{subject.subject_name}</h1>
        <p className="text-lg mb-6 text-gray-700">
          <strong>Description:</strong> {subject.description}
        </p>
        <p className="text-lg mb-6 text-gray-700">
          <strong>Grade:</strong> 
          <span className="text-xl font-semibold text-secondary ml-2">
            {subject.student_grade || "Not Graded"}
          </span>
        </p>
        <p className="text-lg text-gray-700">
          <strong>Teachers:</strong> 
          <span className="text-lg font-medium text-gray-900 ml-2">
            {subject.teacher_names.join(", ")}
          </span>
        </p>
      </main>
      <Footer />
    </div>
  );
}
