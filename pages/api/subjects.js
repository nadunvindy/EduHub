import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const subjects = await sql`SELECT subject_id, name, description FROM Subjects`;
      res.status(200).json({ subjects });
    } catch (error) {
      console.error("Error fetching subjects:", error);
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
