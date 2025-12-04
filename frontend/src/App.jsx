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
    setNumber("");
  };

  return (
    <div className="h-screen w-full p-2 flex items-center justify-center">
      <div className=" shadown rounded w-full md:w-2/3 lg:w-1/2 p-2 bg-sky-100 flex flex-col items-center">
        <h2 className="text-lg mb-4">RTO Vehicle Check</h2>

        <div className="">
          <input
            className="border-2 border-sky-700 p-2 rounded"
            type="text"
            placeholder="Enter RTO Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <button
            className="bg-sky-700 text-white p-2 rounded shadow-xs cursor-pointer ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {result && (
          <div className="uppercase mt-4 bg-sky-200 p-3 rounded ">
            <p>
              <b>RTO:</b> {result.data.rtoNumber}
            </p>
            <p>
              <b>Owner:</b> {result.data.owner}
            </p>
            <p>
              <b>Vehicle:</b> {result.data.model}
            </p>
            <p>
              <b>Chessis Number:</b>{" "}
              {result.data.chassisNumber.slice(0, 5) + "XXXX"}
            </p>
            <p>
              <b>Engine Number:</b>{" "}
              {result.data.engineNumber.slice(0, 5) + "XXXX"}
            </p>
            <p>
              <b>Insurance:</b> {result.data.insuranceUpto}
            </p>
            <p className="text-xs text-center border p-2 bg-red-500 rounded mt-3 w-1/2 m-auto text-white">
              {result.source}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
