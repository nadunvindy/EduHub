import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PrincipalDashboard() {
  const [principal, setPrincipal] = useState(null);
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

  if (!principal)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-gray-100 p-6 border-r border-gray-300">
          <h1 className="text-xl font-bold mb-4">Principal Details</h1>
          <p>
            <strong>Name:</strong> {principal.first_name} {principal.last_name}
          </p>
          <p>
            <strong>Email:</strong> {principal.email}
          </p>
          <p className="mt-4">Welcome, Principal {principal.last_name}!</p>
        </div>

        {/* Right Section */}
        <div className="flex-grow bg-white p-6">
          <div className="carousel">
            <div className="carousel-item">
              <div
                className="bg-primary text-white p-6 rounded-lg shadow-md cursor-pointer text-center"
                onClick={() => router.push("/students")}
              >
                <h2 className="text-2xl font-bold mb-2">Manage Students</h2>
                <p>View, add, or remove students.</p>
              </div>
            </div>
            <div className="carousel-item">
              <div
                className="bg-secondary text-white p-6 rounded-lg shadow-md cursor-pointer text-center"
                onClick={() => router.push("/teachers")}
              >
                <h2 className="text-2xl font-bold mb-2">Manage Teachers</h2>
                <p>View, add, or remove teachers.</p>
              </div>
            </div>
            <div className="carousel-item">
              <div
                className="bg-tertiary text-white p-6 rounded-lg shadow-md cursor-pointer text-center"
                onClick={() => router.push("/subjects")}
              >
                <h2 className="text-2xl font-bold mb-2">Manage Subjects</h2>
                <p>View, add, or remove subjects.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
