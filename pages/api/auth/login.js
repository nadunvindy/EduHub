import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileData);

    // Find the user by email and password
    const user = data.users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Send the full user object as the token
    return res.status(200).json({ token: JSON.stringify(user) });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
