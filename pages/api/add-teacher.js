import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { first_name, last_name, email, subjects } = req.body;

    if (!first_name || !last_name || !email || !subjects) {
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

    const existingTeacher = data.users.find((user) => user.email === email);
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const newTeacher = {
      email,
      role: "Teacher",
      first_name,
      last_name,
      subjects: Array.isArray(subjects)
        ? subjects
        : subjects.split(",").map((s) => s.trim()),
    };

    data.users.push(newTeacher);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    res
      .status(201)
      .json({ message: "Teacher added successfully", teacher: newTeacher });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
