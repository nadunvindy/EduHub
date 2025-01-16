import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { first_name, last_name, email, year, parent } = req.body;

    if (!first_name || !last_name || !email || !year || !parent) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const filePath = path.join(process.cwd(), "public", "data.json");
    let data;

    try {
      const fileData = fs.readFileSync(filePath, "utf8");
      data = JSON.parse(fileData);
    } catch (error) {
      data = { users: [] };
    }

    const existingStudent = data.users.find((user) => user.email === email);
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const newStudent = {
      email,
      role: "Student",
      first_name,
      last_name,
      year,
      parent,
      subjects: [],
    };

    data.users.push(newStudent);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
