import { GoogleTagManager } from "@next/third-parties/google";


export default function Header({ onLogout }) {
  return (
    <div className="flex p-6 content-center justify-between bg-primary text-white">
      <GoogleTagManager gtmId="GTM-NQ5FRSZR" />
      <h1 className="self-center text-3xl">Welcome to <span className="text-secondary font-bold">EduHub</span></h1>
      <div className="self-end">
        <button
          onClick={onLogout}
          className="text-lg px-4 bg-secondary text-white rounded-lg hover:bg-secondary-dark py-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
