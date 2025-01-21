import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { student_id, subject_id } = req.body;

    if (!student_id || !subject_id) {
      return res.status(400).json({ message: "Student ID and Subject ID are required" });
    }

    try {
      await sql`
        INSERT INTO student_subject (student_id, subject_id)
        VALUES (${student_id}, ${subject_id});
      `;
      res.status(200).json({ message: "Subject added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding subject", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
