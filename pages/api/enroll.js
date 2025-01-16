import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { studentEmail, subject, teacherEmail } = req.body;

    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileData);

    const student = data.users.find((u) => u.email === studentEmail && u.role === 'Student');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (!student.subjects.some((subj) => subj.title === subject)) {
      student.subjects.push({ title: subject, teacher: teacherEmail, grade: 'N/A' });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    res.status(200).json({ message: 'Student enrolled successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
