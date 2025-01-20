import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { student_id } = req.query;

    if (!student_id) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    try {
      const grades = await sql`
        SELECT sub.name AS subject_name, sub.description, g.grade
        FROM Grades g
        JOIN Subjects sub ON g.subject_id = sub.subject_id
        WHERE g.student_id = ${student_id};
      `;
      res.status(200).json({ grades });
    } catch (error) {
      console.error("Error fetching grades:", error.message);
      res.status(500).json({ message: "Failed to fetch grades" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
