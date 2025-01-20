import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { teacher_id } = req.query;

    if (!teacher_id) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    try {
      const students = await sql`
        SELECT DISTINCT st.id, st.first_name, st.last_name, st.year
        FROM Students st
        JOIN Student_Subject ss ON st.id = ss.student_id
        JOIN Teacher_Subject ts ON ss.subject_id = ts.subject_id
        WHERE ts.teacher_id = ${teacher_id};
      `;
      res.status(200).json({ students });
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Failed to fetch students" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
