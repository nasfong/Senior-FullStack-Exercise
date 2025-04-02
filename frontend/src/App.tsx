import { useQuery } from '@tanstack/react-query';
import './App.css'

const fetchUsers = async () => {
  const res = await fetch("http://localhost:5000/api/course");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

function App() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["course"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <>
      {data.map((user: { id: number; name: string }) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </>
  )
}

export default App
