import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { student_id, subject_id, grade } = req.body;
    const teacher_id = req.headers["x-teacher-id"]; // Fetch teacher_id from headers

    console.log("Received Request:", { student_id, subject_id, grade, teacher_id });

    if (!student_id || !subject_id || !grade || !teacher_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Verify if the teacher is authorized to modify the grade for this subject
      const authorized = await sql`
        SELECT 1
        FROM Teacher_Subject
        WHERE teacher_id = ${teacher_id} AND subject_id = ${subject_id};
      `;

      if (authorized.length === 0) {
        console.warn("Unauthorized attempt:", { teacher_id, subject_id });
        return res.status(403).json({ message: "You are not authorized to modify this grade." });
      }

      // Check if the grade entry exists
      const existingGrade = await sql`
        SELECT id
        FROM Grades
        WHERE student_id = ${student_id} AND subject_id = ${subject_id};
      `;

      if (existingGrade.length > 0) {
        await sql`
          UPDATE Grades
          SET grade = ${grade}
          WHERE student_id = ${student_id} AND subject_id = ${subject_id};
        `;
      } else {
        await sql`
          INSERT INTO Grades (student_id, subject_id, grade, teacher_id)
          VALUES (${student_id}, ${subject_id}, ${grade}, ${teacher_id});
        `;
      }

      res.status(200).json({ message: "Grade updated successfully" });
    } catch (error) {
      console.error("Error updating grade:", error.message);
      res.status(500).json({ message: "Failed to update grade" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
