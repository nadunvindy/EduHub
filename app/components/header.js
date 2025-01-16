import { GoogleTagManager } from "@next/third-parties/google";

import Link from "next/link";

export default function Header() {
  return (
    <div className="flex p-6 content-center justify-between bg-primary text-white">
      <GoogleTagManager gtmId="GTM-NQ5FRSZR" />

      <h1 className="text-lg">Welcome to EduHub</h1>
      <div className="self-end">
        <Link href="/" className="text-lg px-4">
          Home
        </Link>
        <Link href="/" className="text-lg px-4">
          Login
        </Link>
      </div>
    </div>
  );
}
