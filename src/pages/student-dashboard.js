import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Name: {user.name}</p>
      <p>Year: {user.year}</p>
      <p>Parent: {user.parent}</p>
      <h2>Subjects</h2>
      <ul>
        {user.subjects.map((subject, index) => (
          <li key={index}>{subject} - Grade: {user.grades[subject]}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
