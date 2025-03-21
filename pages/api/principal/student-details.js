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
        SELECT id, first_name, last_name, year 
        FROM students 
        WHERE id = ${student_id};
      `;

      const subjects = await sql`
        SELECT 
          sub.subject_id, 
          sub.name AS subject_name, 
          g.grade
        FROM student_subject ss
        JOIN subjects sub ON ss.subject_id = sub.subject_id
        LEFT JOIN grades g ON g.subject_id = sub.subject_id AND g.student_id = ${student_id}
        WHERE ss.student_id = ${student_id};
      `;

      res.status(200).json({ student: student[0], subjects });
    } catch (error) {
      res.status(500).json({ message: "Error fetching student details", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
