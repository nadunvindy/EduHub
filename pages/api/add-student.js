import { neon } from "@neondatabase/serverless";

const sql = neon("postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { first_name, last_name, year, parent_id } = req.body;

    console.log("Received payload:", { first_name, last_name, year, parent_id });

    // Validate input
    if (!first_name || !last_name || !year || !parent_id) {
      console.error("Validation failed: Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Auto-generate email and password
      const email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}@example.com`;
      const password = "password123";

      console.log("Generated email:", email);

      // Check if the parent exists in the Users table with role = 'Parent'
      console.log("Checking if parent exists for ID:", parent_id);
      const parentExists = await sql`
        SELECT id FROM Users WHERE id = ${parent_id} AND role = 'Parent';
      `;
      if (parentExists.length === 0) {
        console.error("Parent ID does not exist:", parent_id);
        return res.status(404).json({ message: `Parent ID ${parent_id} does not exist` });
      }

      // Insert into Users table with the Student role
      console.log("Inserting into Users table");
      const user = await sql`
        INSERT INTO Users (first_name, last_name, email, password, role)
        VALUES (${first_name}, ${last_name}, ${email}, ${password}, 'Student')
        RETURNING id;
      `;
      const userId = user[0].id;

      console.log("Generated User ID:", userId);

      // Insert into Students table
      console.log("Inserting into Students table");
      const student = await sql`
        INSERT INTO Students (id, first_name, last_name, year, parent_id)
        VALUES (${userId}, ${first_name}, ${last_name}, ${year}, ${parent_id})
        RETURNING *;
      `;

      console.log("Insert successful. New student:", student[0]);

      res.status(201).json({ student: student[0] });
    } catch (error) {
      console.error("Error adding student:", error.message, error.stack);
      res.status(500).json({ message: "Failed to add student", error: error.message });
    }
  } else {
    console.log("Invalid HTTP method:", req.method);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
