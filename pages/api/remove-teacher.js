import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const filePath = path.join(process.cwd(), "public", "data.json");
    let data;

    try {
      const fileData = fs.readFileSync(filePath, "utf8");
      data = JSON.parse(fileData);
    } catch (error) {
      return res.status(500).json({ message: "Failed to read data file" });
    }

    const teacherIndex = data.users.findIndex(
      (user) => user.email === email && user.role === "Teacher"
    );

    if (teacherIndex === -1) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const removedTeacher = data.users.splice(teacherIndex, 1);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    res
      .status(200)
      .json({ message: "Teacher removed successfully", teacher: removedTeacher });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
