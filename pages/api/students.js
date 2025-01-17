import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  try {
    const students = await sql`SELECT * FROM Students`;
    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
}
