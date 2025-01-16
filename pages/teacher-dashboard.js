'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/'); // Redirect to login if not authenticated
    } else {
      const userData = JSON.parse(storedUser);
      if (userData.role !== 'Student') {
        router.push('/'); // Redirect to login if not a student
      } else {
        setStudent(userData); // Set the student data
      }
    }
  }, [router]);

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {student.first_name} {student.last_name}</h1>
      <p>Year: {student.year}</p>
      <p>Parent: {student.parent}</p>
      <h2>Subjects</h2>
      <div>
        {student.subjects.length > 0 ? (
          <ul>
            {student.subjects.map((subject, index) => (
              <li key={index}>
                <strong>{subject.title}</strong> - Grade: {subject.grade}, Teacher: {subject.teacher}
              </li>
            ))}
          </ul>
        ) : (
          <p>No subjects assigned.</p>
        )}
      </div>
    </div>
  );
}
