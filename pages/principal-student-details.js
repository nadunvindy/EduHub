import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PrincipalStudentDetails() {
  const router = useRouter();
  const { student_id } = router.query;
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [notices, setNotices] = useState([]);
  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [newGrade, setNewGrade] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !student_id) return;

    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/principal/student-details?student_id=${student_id}`);
        const { student, subjects } = await response.json();
        setStudent(student || null);
        setSubjects(subjects || []);

        const noticesResponse = await fetch(`/api/principal/notices?student_id=${student_id}`);
        const noticesData = await noticesResponse.json();
        setNotices(noticesData || []);
      } catch (error) {
        console.error("Error fetching student data:", error.message);
        setError("Failed to load student details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [router.isReady, student_id]);

  const handleModifyGrade = (subjectId, currentGrade) => {
    setEditingSubjectId(subjectId);
    setNewGrade(currentGrade || "");
  };

  const handleSaveGrade = async (subjectId) => {
    try {
      const response = await fetch(`/api/principal/update-grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id, subject_id: subjectId, grade: newGrade }),
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
      setError("Failed to update grade.");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Student details not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <h1 className="text-4xl font-bold mb-6">{student.first_name} {student.last_name}</h1>
        <p><strong>Year:</strong> {student.year}</p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Subjects and Grades</h2>
        <button
          onClick={() => router.push(`/add-subject?student_id=${student_id}`)}
          className="bg-primary text-white px-4 py-2 rounded-lg mb-4"
        >
          Add Subject
        </button>
        <ul>
          {subjects.map((subject) => (
            <li key={subject.subject_id} className="mb-4">
              <strong>{subject.subject_name}</strong>:{" "}
              {editingSubjectId === subject.subject_id ? (
                <>
                  <input
                    type="text"
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="border p-2 mr-2"
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
                <>
                  {subject.grade || "Not Graded"}{" "}
                  <button
                    onClick={() => handleModifyGrade(subject.subject_id, subject.grade)}
                    className="bg-secondary text-white px-4 py-2 rounded-lg"
                  >
                    Modify
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-4">Parent Notices</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Parent</th>
              <th className="border px-4 py-2">Teacher</th>
              <th className="border px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{notice.parent_name}</td>
                <td className="border px-4 py-2">{notice.teacher_name}</td>
                <td className="border px-4 py-2">{notice.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
}
