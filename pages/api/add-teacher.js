import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { first_name, last_name, subject_id } = req.body;

    if (!first_name || !last_name || !subject_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Auto-generate email and password
      const email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}@example.com`;
      const password = "password123";

      // Insert into Users table
      console.log("Inserting into Users table");
      const user = await sql`
        INSERT INTO Users (first_name, last_name, email, password, role)
        VALUES (${first_name}, ${last_name}, ${email}, ${password}, 'Teacher')
        RETURNING id;
      `;
      const userId = user[0].id;

      console.log("Generated User ID:", userId);

      // Insert into Teachers table
      console.log("Inserting into Teachers table");
      const teacher = await sql`
        INSERT INTO Teachers (id, first_name, last_name, subject_id)
        VALUES (${userId}, ${first_name}, ${last_name}, ${subject_id})
        RETURNING *;
      `;

      // Insert into Teacher_Subject table
      console.log("Inserting into Teacher_Subject table");
      await sql`
        INSERT INTO Teacher_Subject (teacher_id, subject_id)
        VALUES (${userId}, ${subject_id});
      `;

      console.log("Insert successful. New teacher:", teacher[0]);
      res.status(201).json({ teacher: teacher[0] });
    } catch (error) {
      console.error("Error adding teacher:", error.message, error.stack);
      res.status(500).json({ message: "Failed to add teacher", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
