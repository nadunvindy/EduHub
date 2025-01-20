import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;

    console.log("Received payload:", { id });

    // Validate input
    if (!id) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    try {
      // Check if the student exists in the Students table
      console.log("Checking if student exists for ID:", id);
      const studentExists = await sql`SELECT * FROM Students WHERE id = ${id}`;
      if (studentExists.length === 0) {
        console.error("Student not found:", id);
        return res.status(404).json({ message: "Student not found" });
      }

      // Delete from Students table
      console.log("Deleting student from Students table");
      await sql`DELETE FROM Students WHERE id = ${id}`;

      // Delete from Users table
      console.log("Deleting student from Users table");
      await sql`DELETE FROM Users WHERE id = ${id}`;

      console.log("Student removed successfully");
      res.status(200).json({ message: "Student removed successfully" });
    } catch (error) {
      console.error("Error removing student:", error.message, error.stack);
      res.status(500).json({ message: "Failed to remove student", error: error.message });
    }
  } else {
    console.log("Invalid HTTP method:", req.method);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
