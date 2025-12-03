import { useState } from "react";
import axios from "axios";

export function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/rto/check?rto=${number}`
    );
    console.log(res.data.data);
    setResult(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>RTO Vehicle Check</h2>

      <input
        type="text"
        placeholder="Enter RTO Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <p>
            <b>Source:</b> {result.source}
          </p>
          <p>
            <b>Owner:</b> {result.data.owner}
          </p>
          <p>
            <b>Vehicle:</b> {result.data.model}
          </p>
          <p>
            <b>Insurance:</b> {result.data.insuranceUpto}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
