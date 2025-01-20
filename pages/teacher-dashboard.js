'use client';
import "../public/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState("Students"); // Tab state for navigation
  const router = useRouter();

  useEffect(() => {
    const fetchTeacherData = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        router.push("/"); // Redirect to login if not authenticated
        return;
      }

      const userData = JSON.parse(storedUser);
      if (userData.role !== "Teacher") {
        router.push("/"); // Redirect if not a teacher
        return;
      }

      setTeacher(userData);

      try {
        // Fetch subjects
        const subjectsResponse = await fetch(`/api/teacher/subjects?teacher_id=${userData.id}`);
        if (!subjectsResponse.ok) {
          console.error("Error fetching subjects:", subjectsResponse.status);
        } else {
          const subjectsData = await subjectsResponse.json();
          setSubjects(subjectsData.subjects || []);
        }

        // Fetch students
        const studentsResponse = await fetch(`/api/teacher/students?teacher_id=${userData.id}`);
        if (!studentsResponse.ok) {
          console.error("Error fetching students:", studentsResponse.status);
        } else {
          const studentsData = await studentsResponse.json();
          setStudents(studentsData.students || []);
        }

        // Fetch notices
        const noticesResponse = await fetch(`/api/teacher/notices?teacher_id=${userData.id}`);
        if (!noticesResponse.ok) {
          console.error("Error fetching notices:", noticesResponse.status);
        } else {
          const noticesData = await noticesResponse.json();
          setNotices(noticesData.notices || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTeacherData();
  }, [router]);

  const navigateToStudentDetails = (studentId) => {
    router.push(`/student-details?student_id=${studentId}`);
  };

  const navigateToNoticeDetails = (noticeId) => {
    router.push(`/notice-details?notice_id=${noticeId}`);
  };

  const renderContent = () => {
    if (activeTab === "Students") {
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Students</h2>
          <ul>
            {students.length > 0 ? (
              students.map((student) => (
                <li key={student.id} className="mb-2 flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                  <span>{student.first_name} {student.last_name}</span>
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={() => navigateToStudentDetails(student.id)}
                  >
                    View Details
                  </button>
                </li>
              ))
            ) : (
              <p>No students found.</p>
            )}
          </ul>
        </div>
      );
    } else if (activeTab === "Notices") {
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Parent Notices</h2>
          <ul>
            {notices.length > 0 ? (
              notices.map((notice) => (
                <li key={notice.id} className="mb-2 flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                  <span>{notice.message}</span>
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={() => navigateToNoticeDetails(notice.id)}
                  >
                    View Details
                  </button>
                </li>
              ))
            ) : (
              <p>No notices found.</p>
            )}
          </ul>
        </div>
      );
    }
  };

  if (!teacher) {
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
        {/* Left Sidebar */}
        <div className="w-1/4 bg-gray-100 p-6 border-r">
          <h2 className="text-xl font-bold mb-4">Teacher Details</h2>
          <p><strong>Name:</strong> {teacher.first_name} {teacher.last_name}</p>
          <p><strong>Email:</strong> {teacher.email}</p>
          <h3 className="text-lg font-bold mt-6 mb-2">Subjects</h3>
          <ul>
            {subjects.map((subject) => (
              <li key={subject.subject_id} className="mb-2">
                {subject.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Area */}
        <div className="flex-grow bg-white p-6">
          <div className="flex justify-around mb-6 border-b pb-4">
            {["Students", "Notices"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 ${activeTab === tab ? "font-bold border-b-2 border-primary" : ""}`}
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
