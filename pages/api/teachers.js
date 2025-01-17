import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  try {
    const teachers = await sql`SELECT * FROM Teachers`;
    res.status(200).json({ teachers });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Failed to fetch teachers" });
  }
}
