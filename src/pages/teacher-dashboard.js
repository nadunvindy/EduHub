import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const TeacherDashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser || JSON.parse(storedUser).role !== 'Teacher') {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <p>Name: {user.name}</p>
      <p>Subjects: {user.subjects.join(', ')}</p>
    </div>
  );
};

export default TeacherDashboard;
