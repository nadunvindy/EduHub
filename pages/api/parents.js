import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const parents = await sql`SELECT id, first_name, last_name FROM Parents`;
      res.status(200).json({ parents });
    } catch (error) {
      console.error("Error fetching parents:", error.message);
      res.status(500).json({ message: "Failed to fetch parents" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
