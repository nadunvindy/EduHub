

import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "public", "data.json");
    let data;

    try {
      const fileData = fs.readFileSync(filePath, "utf8");
      data = JSON.parse(fileData);
    } catch (error) {
      return res.status(500).json({ message: "Failed to read data file" });
    }

    // Filter only teachers from data
    const teachers = data.users.filter((user) => user.role === "Teacher");
    return res.status(200).json({ teachers });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
