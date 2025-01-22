import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import "../src/globals.css"

export default function NoticeDetails() {
  const [notice, setNotice] = useState(null);
  const router = useRouter();
  const { notice_id } = router.query;

  useEffect(() => {
    const fetchNoticeDetails = async () => {
      if (!notice_id) return;
      try {
        const response = await fetch(`/api/teacher/notice-details?notice_id=${notice_id}`);
        const data = await response.json();
        setNotice(data.notice);
      } catch (error) {
        console.error("Error fetching notice details:", error);
      }
    };
    fetchNoticeDetails();
  }, [notice_id]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-5 my-5">
        <h1 className="text-3xl font-bold mb-4">Notice Details</h1>
        {notice && (
          <div>
            <p>
              <strong>From Parent:</strong> {notice.parent_name}
            </p>
            <p>
              <strong>Child:</strong> {notice.student_name}
            </p>
            <p>
              <strong>Subject:</strong> {notice.subject_name}
            </p>
            <p>
              <strong>Message:</strong> {notice.message}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
