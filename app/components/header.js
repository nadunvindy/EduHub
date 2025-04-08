import { GoogleTagManager } from "@next/third-parties/google";
import { useRouter } from "next/navigation";
import "../../src/cookieconsent.css"


export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear the stored user session
    router.push("/"); // Redirect to the login page
  };

  return (
    <div className="flex p-6 content-center justify-between bg-primary text-white">
      <h1 className="self-center text-3xl">
        Welcome to <span className="text-secondary font-bold">EduHub</span>
      </h1>
      <div className="self-end">
        <button
          onClick={handleLogout}
          className="text-lg px-4 bg-secondary text-white rounded-lg hover:bg-secondary-dark py-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
