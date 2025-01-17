import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { first_name, last_name, email, subjects } = req.body;

    if (!first_name || !last_name || !email || !subjects) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      await sql`INSERT INTO Teachers (first_name, last_name, email) VALUES (${first_name}, ${last_name}, ${email})`;

      const teacher = await sql`SELECT id FROM Teachers WHERE email = ${email}`;
      const teacher_id = teacher[0].id;

      const subjectValues = subjects.split(",").map((subject_id) => ({
        teacher_id,
        subject_id: parseInt(subject_id, 10),
      }));

      await sql`INSERT INTO Teacher_Subject ${sql(subjectValues)}`;
      res.status(201).json({ message: "Teacher added successfully" });
    } catch (error) {
      console.error("Error adding teacher:", error);
      res.status(500).json({ message: "Failed to add teacher" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
