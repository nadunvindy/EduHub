import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and Description are required" });
    }

    try {
      const subject = await sql`
        INSERT INTO Subjects (name, description)
        VALUES (${name}, ${description})
        RETURNING *;
      `;
      res.status(201).json(subject[0]);
    } catch (error) {
      console.error("Error adding subject:", error);
      res.status(500).json({ message: "Failed to add subject" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
