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
      const subjects = await sql`
        SELECT 
          ss.subject_id, 
          sub.name AS subject_name, 
          sub.description, 
          COALESCE(g.grade, 'Not Graded') AS grade, 
          COALESCE(g.created_at, NULL) AS grade_date,
          COALESCE(CONCAT(t.first_name, ' ', t.last_name), 'No Assigned Teacher') AS teacher_name
        FROM student_subject ss
        JOIN subjects sub ON ss.subject_id = sub.subject_id
        LEFT JOIN grades g ON ss.student_id = g.student_id AND ss.subject_id = g.subject_id
        LEFT JOIN teacher_subject ts ON ss.subject_id = ts.subject_id
        LEFT JOIN teachers t ON ts.teacher_id = t.id
        WHERE ss.student_id = ${student_id};
      `;

      console.log("Fetched Subjects:", subjects);

      if (subjects.length === 0) {
        return res.status(404).json({ message: "No subjects found for the given student ID" });
      }

      res.status(200).json({ subjects });
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
