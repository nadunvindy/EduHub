import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { teacher_id } = req.query;

    if (!teacher_id) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    try {
      const notices = await sql`
        SELECT n.id, n.message, s.first_name AS student_name, sub.name AS subject_name, p.first_name AS parent_name
        FROM Notices n
        JOIN Students s ON n.student_id = s.id
        JOIN Subjects sub ON n.subject_id = sub.subject_id
        JOIN Users p ON n.parent_id = p.id
        WHERE n.teacher_id = ${teacher_id};
      `;
      res.status(200).json({ notices });
    } catch (error) {
      console.error("Error fetching notices:", error);
      res.status(500).json({ message: "Failed to fetch notices" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
