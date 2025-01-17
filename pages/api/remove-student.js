import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const student = await sql`SELECT * FROM Students WHERE email = ${email}`;

      if (student.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      await sql`DELETE FROM Students WHERE email = ${email}`;
      res.status(200).json({ message: "Student removed successfully", student: student[0] });
    } catch (error) {
      console.error("Error removing student:", error);
      res.status(500).json({ message: "Failed to remove student" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
