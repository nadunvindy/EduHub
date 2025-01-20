import "../public/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PrincipalDashboard() {
  const [principal, setPrincipal] = useState(null);
  const [activeTab, setActiveTab] = useState("Students");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [parents, setParents] = useState([]);
  const [notices, setNotices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role === "Principal") {
        setPrincipal(userData);
      } else {
        router.push("/"); // Redirect if not a principal
      }
    } else {
      router.push("/"); // Redirect to login if not authenticated
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes, parentsRes, noticesRes] = await Promise.all([
          fetch("/api/students"),
          fetch("/api/teachers"),
          fetch("/api/parents"),
          fetch("/api/notices"),
        ]);

        const studentsData = await studentsRes.json();
        const teachersData = await teachersRes.json();
        const parentsData = await parentsRes.json();
        const noticesData = await noticesRes.json();

        setStudents(studentsData.students);
        setTeachers(teachersData.teachers);
        setParents(parentsData.parents);
        setNotices(noticesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    if (activeTab === "Students") {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Students</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
              
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Year</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border px-4 py-2">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="border px-4 py-2">{student.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === "Teachers") {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Teachers</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Subject</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="border px-4 py-2">
                    {teacher.first_name} {teacher.last_name}
                  </td>
                  <td className="border px-4 py-2">{teacher.subject_name || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === "Parents") {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Parents</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((parent) => (
                <tr key={parent.id}>
                  <td className="border px-4 py-2">
                    {parent.first_name} {parent.last_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === "Notices") {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Notices</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">Parent</th>
                <th className="border px-4 py-2">Student</th>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Teacher</th>
                <th className="border px-4 py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice.id}>
                  <td className="border px-4 py-2">{notice.parent_name}</td>
                  <td className="border px-4 py-2">{notice.student_name}</td>
                  <td className="border px-4 py-2">{notice.subject_name}</td>
                  <td className="border px-4 py-2">{notice.teacher_name}</td>
                  <td className="border px-4 py-2">{notice.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  if (!principal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex">
        <div className="w-1/4 bg-gray-100 p-6 border-r border-gray-300">
          <h1 className="text-xl font-bold mb-4">Principal Details</h1>
          <p>
            <strong>Name:</strong> {principal.first_name} {principal.last_name}
          </p>
          <p>
            <strong>Email:</strong> {principal.email}
          </p>
          <p className="mt-4">Welcome, Principal {principal.last_name}!</p>
          <div className="mt-6">
            <button
              className="w-full bg-primary text-white py-2 mb-2 rounded-lg"
              onClick={() => router.push("/students")}
            >
              Manage Students
            </button>
            <button
              className="w-full bg-secondary text-white py-2 mb-2 rounded-lg"
              onClick={() => router.push("/teachers")}
            >
              Manage Teachers
            </button>
            <button
              className="w-full bg-tertiary text-white py-2 rounded-lg"
              onClick={() => router.push("/subjects")}
            >
              Manage Subjects
            </button>
          </div>
        </div>
        <div className="flex-grow bg-white p-6">
          <div className="flex justify-around mb-6 border-b pb-4">
            {["Students", "Teachers", "Parents", "Notices"].map((tab) => (
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
