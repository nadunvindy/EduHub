import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { student_id, subject_id, grade } = req.body;

    if (!student_id || !subject_id || !grade) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      await sql`
        INSERT INTO grades (student_id, subject_id, grade)
        VALUES (${student_id}, ${subject_id}, ${grade})
        ON CONFLICT (student_id, subject_id)
        DO UPDATE SET grade = ${grade};
      `;
      res.status(200).json({ message: "Grade updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating grade", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
