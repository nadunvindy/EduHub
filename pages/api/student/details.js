import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { student_id } = req.query;

    console.log("Received Student ID:", student_id);

    if (!student_id || isNaN(student_id)) {
      return res.status(400).json({ message: "Valid Student ID is required" });
    }

    try {
      // Fetch student details
      const student = await sql`
        SELECT id, first_name, last_name, year
        FROM Students
        WHERE id = ${student_id};
      `;
      if (student.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Fetch subjects, grades, and their respective teacher details
      const subjects = await sql`
        SELECT 
          ss.subject_id,
          sub.name AS subject_name,
          sub.description,
          g.grade,
          CONCAT(t.first_name, ' ', t.last_name) AS teacher_name
        FROM Student_Subject ss
        JOIN Subjects sub ON ss.subject_id = sub.subject_id
        LEFT JOIN Grades g ON ss.student_id = g.student_id AND ss.subject_id = g.subject_id
        LEFT JOIN Teacher_Subject ts ON ss.subject_id = ts.subject_id
        LEFT JOIN Teachers t ON ts.teacher_id = t.id
        WHERE ss.student_id = ${student_id};
      `;

      res.status(200).json({ student: student[0], subjects });
    } catch (error) {
      console.error("Error fetching student details:", error.message);
      res.status(500).json({ message: "Failed to fetch student details" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
