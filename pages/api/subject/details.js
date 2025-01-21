import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { subject_id, student_id } = req.query;

    if (!subject_id || isNaN(subject_id)) {
      return res.status(400).json({ message: "Valid Subject ID is required" });
    }

    if (!student_id || isNaN(student_id)) {
      return res.status(400).json({ message: "Valid Student ID is required" });
    }

    try {
      const subjectDetails = await sql`
        SELECT 
          sub.subject_id,
          sub.name AS subject_name,
          sub.description,
          g.grade AS student_grade,
          COALESCE(
            STRING_AGG(
              CONCAT(t.first_name, ' ', t.last_name), ', '
            ) FILTER (WHERE t.id IS NOT NULL),
            'No Assigned Teacher'
          ) AS teacher_names
        FROM subjects sub
        LEFT JOIN grades g 
          ON g.subject_id = sub.subject_id AND g.student_id = ${student_id}
        LEFT JOIN teacher_subject ts 
          ON sub.subject_id = ts.subject_id
        LEFT JOIN teachers t 
          ON ts.teacher_id = t.id
        WHERE sub.subject_id = ${subject_id}
        GROUP BY sub.subject_id, sub.name, sub.description, g.grade;
      `;

      if (subjectDetails.length === 0) {
        return res.status(404).json({ message: "Subject not found" });
      }

      res.status(200).json({ subject: subjectDetails[0] });
    } catch (error) {
      console.error("Error fetching subject details:", error.message);
      res.status(500).json({ message: "Failed to fetch subject details" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
