import { GoogleTagManager } from "@next/third-parties/google";
import CookiesComponent from "./cookies";

export default function Footer() {
  return (
    
    <div className="flex p-6 content-center justify-center bg-secondary text-white flex-col items-center">
      <GoogleTagManager gtmId="GTM-NQ5FRSZR" />
      <h1 className="text-lg ">EduHub Ltd ©</h1>
      <CookiesComponent />
    </div>
  );
}
