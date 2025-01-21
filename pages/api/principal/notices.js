import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { student_id } = req.query;

    if (!student_id) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    try {
      const notices = await sql`
        SELECT 
          p.first_name || ' ' || p.last_name AS parent_name,
          t.first_name || ' ' || t.last_name AS teacher_name,
          n.message
        FROM notices n
        JOIN parents p ON n.parent_id = p.id
        LEFT JOIN teachers t ON n.teacher_id = t.id
        WHERE n.student_id = ${student_id};
      `;

      res.status(200).json(notices);
    } catch (error) {
      res.status(500).json({ message: "Error fetching notices", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
