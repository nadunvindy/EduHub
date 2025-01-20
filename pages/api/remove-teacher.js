import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    try {
      // Check if the teacher exists
      console.log("Checking if teacher exists for ID:", id);
      const teacher = await sql`SELECT * FROM Teachers WHERE id = ${id}`;
      if (teacher.length === 0) {
        console.error("Teacher not found:", id);
        return res.status(404).json({ message: "Teacher not found" });
      }

      // Delete from Teacher_Subject table
      console.log("Deleting teacher from Teacher_Subject table");
      await sql`DELETE FROM Teacher_Subject WHERE teacher_id = ${id}`;

      // Delete from Teachers table
      console.log("Deleting teacher from Teachers table");
      await sql`DELETE FROM Teachers WHERE id = ${id}`;

      // Delete from Users table
      console.log("Deleting teacher from Users table");
      await sql`DELETE FROM Users WHERE id = ${id}`;

      console.log("Teacher removed successfully");
      res.status(200).json({ message: "Teacher removed successfully", teacher: teacher[0] });
    } catch (error) {
      console.error("Error removing teacher:", error.message, error.stack);
      res.status(500).json({ message: "Failed to remove teacher", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
