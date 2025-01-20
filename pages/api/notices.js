import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const notices = await sql`
        SELECT 
          n.id,
          CONCAT(p.first_name, ' ', p.last_name) AS parent_name,
          CONCAT(s.first_name, ' ', s.last_name) AS student_name,
          sub.name AS subject_name,
          CONCAT(t.first_name, ' ', t.last_name) AS teacher_name,
          n.message,
          n.created_at
        FROM notices n
        LEFT JOIN parents p ON n.parent_id = p.id
        LEFT JOIN students s ON n.student_id = s.id
        LEFT JOIN subjects sub ON n.subject_id = sub.subject_id
        LEFT JOIN teachers t ON n.teacher_id = t.id;
      `;
      res.status(200).json(notices);
    } catch (error) {
      console.error("Error fetching notices:", error.message);
      res.status(500).json({ message: "Failed to fetch notices" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
