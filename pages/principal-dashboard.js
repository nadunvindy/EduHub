import "../src/globals.css";
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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [carouselIndex, setCarouselIndex] = useState(0); // Added for carousel
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
        const [studentsRes, teachersRes, parentsRes, noticesRes] =
          await Promise.all([
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

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const direction =
        prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction };
    });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const renderCarousel = () => {
    if (!notices.length) {
      return <p className="mt-6 text-sm text-gray-500">No notices available.</p>;
    }

    const currentNotice = notices[carouselIndex];

    return (
      <div className="mt-6 bg-secondary text-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-bold">{currentNotice.student_name || "Notice"}</h3>
        <p className="text-sm italic">{currentNotice.message || "No message available."}</p>
        <p className="text-xs">Date: {new Date(currentNotice.created_at).toLocaleDateString()}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              setCarouselIndex((prev) => (prev === 0 ? notices.length - 1 : prev - 1))
            }
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCarouselIndex((prev) => (prev === notices.length - 1 ? 0 : prev + 1))
            }
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === "Students") {
      const sortedStudents = getSortedData(students);
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Students</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("first_name")}
                >
                  Name {sortConfig.key === "first_name" ? "▲" : "▼"}
                </th>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("year")}
                >
                  Year {sortConfig.key === "year" ? "▲" : "▼"}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr
                  key={student.id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td
                    className="border px-4 py-2 text-primary underline"
                    onClick={() =>
                      router.push(
                        `/principal-student-details?student_id=${student.id}`
                      )
                    }
                  >
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
      const sortedTeachers = getSortedData(teachers);
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Teachers</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("first_name")}
                >
                  Name {sortConfig.key === "first_name" ? "▲" : "▼"}
                </th>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("subject_name")}
                >
                  Subject {sortConfig.key === "subject_name" ? "▲" : "▼"}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="border px-4 py-2">
                    {teacher.first_name} {teacher.last_name}
                  </td>
                  <td className="border px-4 py-2">
                    {teacher.subject_name || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === "Parents") {
      const sortedParents = getSortedData(parents);
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Parents</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("first_name")}
                >
                  Name {sortConfig.key === "first_name" ? "▲" : "▼"}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedParents.map((parent) => (
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
    } 
  };

  if (!principal) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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
          {renderCarousel()}
        </div>
        <div className="flex-grow bg-white p-6">
          <div className="flex justify-around mb-6 border-b pb-4">
            {["Students", "Teachers", "Parents"].map((tab) => (
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
