import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RTOChecker() {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFetch = async () => {
    if (!number.trim()) {
      toast.error("Please enter an RTO number");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`http://localhost:5000/api/vehicle/${number}`);
      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        toast.error(data?.message || "Failed to fetch info");
      }
    } catch (err) {
      toast.error("Server unreachable or API error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <ToastContainer />

      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-lg text-white">
        <h1 className="text-3xl font-bold mb-6 text-center drop-shadow-md">
          RTO Info Checker
        </h1>

        <input
          type="text"
          placeholder="Enter RTO Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/30 placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white mb-4 text-white"
        />

        <button
          onClick={handleFetch}
          disabled={loading}
          className="w-full p-3 rounded-xl bg-white text-purple-700 font-semibold hover:bg-purple-100 transition shadow-lg disabled:opacity-60"
        >
          {loading ? "Fetching..." : "Fetch Info"}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-white/30 rounded-xl text-sm text-white space-y-2">
            <h2 className="text-xl font-semibold mb-2">Fetched Data</h2>
            <pre className="whitespace-pre-wrap break-all">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
