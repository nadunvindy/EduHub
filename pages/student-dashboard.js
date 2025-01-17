import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
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
        const response = await fetch(`/api/student/details?student_id=${userData.id}`);
        const data = await response.json();
        setStudent(data.student);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentData();
  }, [router]);

  if (!student)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row justify-between mx-5 my-5">
        <div className="w-full md:w-1/2 bg-white mx-2 p-6 border border-primary rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Student Details</h1>
          <div className="mb-4">
            <p>
              <strong>Name:</strong> {student.first_name} {student.last_name}
            </p>
            <p>
              <strong>Year:</strong> {student.year}
            </p>
            <p>
              <strong>Parent:</strong> {student.parent_name || "N/A"}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white mx-2 p-6 border border-primary rounded-lg shadow-md mt-5 md:mt-0">
          <h2 className="text-2xl font-bold mb-4">Subjects</h2>
          <p className="mb-4">View your subjects in detail.</p>
          <button
            onClick={() => router.push("/student-subjects")}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
          >
            View Subjects
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
