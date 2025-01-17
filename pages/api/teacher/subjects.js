import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { teacher_id } = req.query;

    if (!teacher_id) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    try {
      const subjects = await sql`
        SELECT sub.subject_id, sub.name
        FROM Teacher_Subject ts
        JOIN Subjects sub ON ts.subject_id = sub.subject_id
        WHERE ts.teacher_id = ${teacher_id};
      `;
      res.status(200).json({ subjects });
    } catch (error) {
      console.error("Error fetching subjects:", error);
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
