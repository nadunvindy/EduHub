import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { subject_id } = req.query;

    if (!subject_id) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    try {
      const students = await sql`
        SELECT s.id, s.first_name, s.last_name
        FROM Student_Subject ss
        JOIN Students s ON ss.student_id = s.id
        WHERE ss.subject_id = ${subject_id};
      `;
      res.status(200).json({ students });
    } catch (error) {
      console.error("Error fetching students for subject:", error);
      res.status(500).json({ message: "Failed to fetch students" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
