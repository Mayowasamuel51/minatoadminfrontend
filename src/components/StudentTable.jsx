import React, { useEffect, useState } from "react";

const ApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://minatobackend-ixct.vercel.app/api/v1/applications") // ✅ Update with your API endpoint
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Debugging
        if (data.success) {
          setApplications(data.data); // ✅ Use data.data
        } else {
          setError("Failed to load applications");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Applications</h2>
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Full Name</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Description</th>
            <th className="p-3 border-b">Location</th>
            <th className="p-3 border-b">Age</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{app.id}</td>
              <td className="p-3 border-b">{app.fullname}</td>
              <td className="p-3 border-b">{app.email}</td>
              <td className="p-3 border-b">{app.description}</td>
              <td className="p-3 border-b">{app.location}</td>
              <td className="p-3 border-b">{app.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;
