import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ParentDashboard() {
  const [parent, setParent] = useState(null);
  const [children, setChildren] = useState([]);
  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState("Kids");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/"); // Redirect if not authenticated
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.role === "Parent") {
      setParent(userData);

      // Fetch children and notices
      fetch(`/api/parent/children?parent_id=${userData.id}`)
        .then((res) => res.json())
        .then((data) => setChildren(data.children || []))
        .catch((error) => console.error("Error fetching children:", error));

      fetch(`/api/parent/notices?parent_id=${userData.id}`)
        .then((res) => res.json())
        .then((data) => setNotices(data.notices || []))
        .catch((error) => console.error("Error fetching notices:", error));
    } else {
      router.push("/"); // Redirect if not a parent
    }
  }, [router]);

  const renderContent = () => {
    if (activeTab === "Kids") {
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Your Children</h2>
          <ul>
            {children.map((child) => (
              <li
                key={child.id}
                className="mb-2 bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span>
                  {child.first_name} {child.last_name} (Year: {child.year})
                </span>
                <button
                  onClick={() => {
                    console.log(
                      `Navigating to child details for student_id: ${child.id}`
                    ); // Debug log
                    router.push(`/child-details?student_id=${child.id}`);
                  }}
                  className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (activeTab === "Notices") {
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Notices</h2>
          <ul>
            {notices.map((notice) => (
              <li
                key={notice.id}
                className="mb-2 bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <p>
                  <strong>Child:</strong> {notice.student_name}
                </p>
                <p>
                  <strong>Subject:</strong> {notice.subject_name}
                </p>
                <p>
                  <strong>Message:</strong> {notice.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-gray-100 p-6 border-r">
          {parent ? (
            <>
              <h1 className="text-xl font-bold mb-4">Parent Details</h1>
              <p>
                <strong>Name:</strong> {parent.first_name} {parent.last_name}
              </p>
              <p>
                <strong>Email:</strong> {parent.email}
              </p>
              <button
                onClick={() => router.push("/excursion-form")}
                className="mt-4 bg-tertiary text-white px-4 py-2 rounded-lg hover:bg-primary"
              >
                Upcoming Excursion Form
              </button>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex-grow bg-white p-6">
          <div className="flex justify-around mb-6 border-b pb-4">
            {["Kids", "Notices"].map((tab) => (
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
