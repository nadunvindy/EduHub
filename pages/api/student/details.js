import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { student_id } = req.query;

    if (!student_id) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    try {
      const student = await sql`
        SELECT s.id, s.first_name, s.last_name, s.year, p.first_name AS parent_name
        FROM Students s
        LEFT JOIN Parents p ON s.parent_id = p.id
        WHERE s.id = ${student_id};
      `;
      res.status(200).json({ student: student[0] });
    } catch (error) {
      console.error("Error fetching student details:", error);
      res.status(500).json({ message: "Failed to fetch student details" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
