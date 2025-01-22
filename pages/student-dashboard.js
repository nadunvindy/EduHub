import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [activeTab, setActiveTab] = useState("Profile");
  const router = useRouter();

  useEffect(() => {
    const fetchStudentData = async () => {
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
        const studentResponse = await fetch(`/api/student/details?student_id=${userData.id}`);
        const studentData = await studentResponse.json();
        setStudent(studentData.student);

        const subjectsResponse = await fetch(`/api/student/subjects?student_id=${userData.id}`);
        const subjectsData = await subjectsResponse.json();
        setSubjects(subjectsData.subjects);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchStudentData();
  }, [router]);

  if (!student) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const renderContent = () => {
    if (activeTab === "Profile") {
      return (
        <div className="bg-white p-6 border border-primary rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p><strong>Name:</strong> {student.first_name} {student.last_name}</p>
          <p><strong>Year:</strong> {student.year}</p>
        </div>
      );
    } else if (activeTab === "Subjects") {
      return (
        <div className="bg-white p-6 border border-primary rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <div
                key={`${subject.subject_id}-${subject.teacher_name}`}
                className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                onClick={() =>
                  router.push(`/subject-details?subject_id=${subject.subject_id}&student_id=${student.id}`)
                }
              >
                <h3 className="text-xl font-bold">{subject.subject_name}</h3>
                <p className="text-sm">{subject.teacher_name || "No Teacher Assigned"}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex">
        <div className="w-1/4 bg-gray-100 p-6 border-r">
          <h1 className="text-xl font-bold mb-4">Student Details</h1>
          <p><strong>Name:</strong> {student.first_name} {student.last_name}</p>
          <p><strong>Year:</strong> {student.year}</p>
          <button
            onClick={() => router.push("/excursion-notice")}
            className="mt-4 bg-tertiary text-white px-4 py-2 rounded-lg hover:bg-primary"
          >
            View Excursion Notice
          </button>
        </div>
        <div className="flex-grow bg-white p-6">
          <div className="flex justify-around mb-6 border-b pb-4">
            {["Profile", "Subjects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 ${
                  activeTab === tab ? "font-bold border-b-2 border-primary" : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
