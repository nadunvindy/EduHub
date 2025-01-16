import "../src/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import { useRouter } from "next/router";

export default function PrincipalDashboard() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-5 my-5">
        <div className="bg-white p-6 border border-primary rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Principal Dashboard</h1>
          <p>Welcome to the admin control panel.</p>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manage Students */}
          <div
            className="bg-white p-4 border border-gray-300 rounded-lg shadow-md cursor-pointer"
            onClick={() => router.push("/students")}
          >
            <h3 className="text-xl font-bold">Manage Students</h3>
            <p className="mt-2">View, add, or remove students.</p>
          </div>

          {/* Manage Teachers */}
          <div
            className="bg-white p-4 border border-gray-300 rounded-lg shadow-md cursor-pointer"
            onClick={() => router.push("/teachers")}
          >
            <h3 className="text-xl font-bold">Manage Teachers</h3>
            <p className="mt-2">View, add, or remove teachers.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
