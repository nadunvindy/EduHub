import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    const user = data.users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const token = JSON.stringify({ email: user.email, role: user.role, name: user.name });
    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
