import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { parent_id } = req.query;

    if (!parent_id) {
      return res.status(400).json({ message: "Parent ID is required" });
    }

    try {
      const children = await sql`
        SELECT
          s.id AS student_id,
          s.first_name,
          s.last_name,
          s.year
        FROM Students s
        JOIN Parent_Student ps ON ps.student_id = s.id
        WHERE ps.parent_id = ${parent_id};
      `;

      res.status(200).json({ children });
    } catch (error) {
      console.error("Error fetching children:", error);
      res.status(500).json({ message: "Failed to fetch children" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
