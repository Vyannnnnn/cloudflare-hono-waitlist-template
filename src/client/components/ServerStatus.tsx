import { useState, useEffect } from "react"
import api from "axios"

export const ServerStatus = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get("/api/hello");
        console.log(response);
        setStatus(response.data);
      } catch (error) {
        setStatus("Error fetching status");
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="my-3">
      <h2 className="text-2xl font-bold text-center">Server Status</h2>
      <p className="text-2xl text-green-200 text-center">{status}</p>
    </div>
  );
}