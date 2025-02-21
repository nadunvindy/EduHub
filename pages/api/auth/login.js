import { neon } from "@neondatabase/serverless";

const sql = neon(
  "postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Query the database for the user with matching email and password
      const result =
        await sql`SELECT * FROM users WHERE email = ${email} AND password = ${password};`;

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = result[0];

      console.log("User Role (Server):", user.role); // Debugging log

      // Return the token and user role separately
      return res.status(200).json({
        token: JSON.stringify(user),
        role: user.role, // Send role explicitly
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
