import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const teacher = await sql`SELECT * FROM Teachers WHERE email = ${email}`;

      if (teacher.length === 0) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      await sql`DELETE FROM Teachers WHERE email = ${email}`;
      res.status(200).json({ message: "Teacher removed successfully", teacher: teacher[0] });
    } catch (error) {
      console.error("Error removing teacher:", error);
      res.status(500).json({ message: "Failed to remove teacher" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
