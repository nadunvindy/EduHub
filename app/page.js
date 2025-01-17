'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleTagManager } from '@next/third-parties/google';
import { neon } from '@neondatabase/serverless';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem('user', data.token);
      router.push(`/${JSON.parse(data.token).role.toLowerCase()}-dashboard`);
    } else {
      setError(data.message || 'Invalid email or password');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const sql = neon('postgres://neondb_owner:Gu4eYKNOqE0y@ep-frosty-bird-a7shwlpu-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require');
      try {
        const result = await sql`SELECT name FROM playing_with_neon`;
        setData(result); // Save the result in the state
      } catch (error) {
        console.error('Error executing query:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <GoogleTagManager gtmId="GTM-NQ5FRSZR" />
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Query Results</h2>
        <ul className="list-disc pl-5">
          {data.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
