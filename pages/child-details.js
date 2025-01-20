import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SubjectDetails() {
  const router = useRouter();
  const { subject_id } = router.query;
  const [subject, setSubject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    const fetchSubjectDetails = async () => {
      if (!subject_id) {
        console.error("Subject ID is missing.");
        return;
      }

      try {
        const response = await fetch(`/api/subject/details?subject_id=${subject_id}`);
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
  }, [router.isReady, subject_id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!subject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <h1 className="text-4xl font-bold mb-6">{subject.subject_name}</h1>
        <p className="text-lg mb-6"><strong>Description:</strong> {subject.description}</p>
        <p className="text-lg mb-6"><strong>Grade:</strong> {subject.grade || "Not Graded"}</p>
        {subject.teacher_names && (
          <p className="text-lg"><strong>Teachers:</strong> {subject.teacher_names.join(", ")}</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
