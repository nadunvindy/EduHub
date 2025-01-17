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
        INSERT INTO Student_Subject (student_id, subject_id)
        VALUES (${student_id}, ${subject_id});
      `;
      res.status(200).json({ message: "Student enrolled successfully" });
    } catch (error) {
      console.error("Error enrolling student:", error);
      res.status(500).json({ message: "Failed to enroll student" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
