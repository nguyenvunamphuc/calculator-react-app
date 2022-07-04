import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");

  const getHistory = async () => {
    const res = await axios.get("/sum");
    if (res?.data) {
      setHistory(res.data || []);
    }
  };

  const onClick = async () => {
    if (num1 && num2) {
      const res = await axios.post("/sum", {
        num1: +num1,
        num2: +num2,
      });
      if (res?.data?.result) {
        setResult(res.data.result);
        getHistory();
      }
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="app">
      <header>CALCULATOR</header>
      <div className="card-wrapper">
        <div className="card">
          <p>Enter the number</p>
          <input
            type="number"
            placeholder="number 1"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          />
          <input
            type="number"
            placeholder="number 2"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
          <button onClick={onClick}>Sum</button>
          <div className="break-line" />
          <p>Results</p>
          <input disabled value={result} />
          {history?.length > 0 && (
            <>
              <div className="break-line" />
              <p>History</p>
              {history.map((item: any) => (
                <span>
                  number1: {item?.number1}, number2: {item?.number2}, result:{" "}
                  {item?.result}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
