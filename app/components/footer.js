import { GoogleTagManager } from "@next/third-parties/google";

export default function Footer() {
    return(
         <div className="flex p-6 content-center justify-center bg-secondary text-white">
                    <GoogleTagManager gtmId="GTM-NQ5FRSZR" />
            <h1 className="text-lg ">EduHub Ltd ©</h1>
        </div>
    )
}