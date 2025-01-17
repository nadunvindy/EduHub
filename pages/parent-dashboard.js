import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ParentDashboard() {
  const [parent, setParent] = useState(null);
  const [children, setChildren] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchParentData = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        router.push("/"); 
        return;
      }

      const userData = JSON.parse(storedUser);
      if (userData.role !== "Parent") {
        router.push("/"); 
        return;
      }

      setParent(userData);

      try {
        const response = await fetch(`/api/parent/children?parent_id=${userData.id}`);
        const data = await response.json();
        setChildren(data.children);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchParentData();
  }, [router]);

  if (!parent)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-5 my-5">
        <div className="bg-white p-6 border border-primary rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Parent Dashboard</h1>
          <p>
            <strong>Name:</strong> {parent.first_name} {parent.last_name}
          </p>
          <p>
            <strong>Email:</strong> {parent.email}
          </p>
        </div>

        <div className="mt-5">
          <h2 className="text-2xl font-bold mb-4">Your Children</h2>
          {children.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child, index) => (
                <div
                  key={index}
                  className="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold">
                    {child.first_name} {child.last_name}
                  </h3>
                  <p className="mt-2">
                    <strong>Year:</strong> {child.year}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No children found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
