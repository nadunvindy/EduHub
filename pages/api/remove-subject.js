import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { subject_id } = req.body;

    if (!subject_id) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    try {
      await sql`DELETE FROM Subjects WHERE subject_id = ${subject_id}`;
      res.status(200).json({ message: "Subject removed successfully" });
    } catch (error) {
      console.error("Error removing subject:", error);
      res.status(500).json({ message: "Failed to remove subject" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
