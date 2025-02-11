import './App.css';
import React, { useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [financialAdvice, setFinancialAdvice] = useState("Save at least 20% of your income.");
  const [futureExpensePrediction, setFutureExpensePrediction] = useState("Your predicted expenses for next month are $1200.");
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCSVUpload = () => {
    if (formData.csvFile) {
      alert(`CSV File "${formData.csvFile.name}" Uploaded!`);
    } else {
      alert("Please choose a CSV file first.");
    }
  };
  const handleAddTransaction = (event) => {
    event.preventDefault();
    if (formData.date && formData.description && formData.category && formData.amount) {
      setTransactions([...transactions, formData]);
      setFormData({ date: "", description: "", category: "", amount: "" });
      setFinancialAdvice("Based on your transactions, avoid overspending on entertainment.");
      setFutureExpensePrediction("Your predicted expenses for next month are $1500.");
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const rows = content.split("\n").slice(1); // Skip header row
        const newTransactions = rows.map(row => {
          const [date, description, category, amount] = row.split(",");
          return { date: date.trim(), description: description.trim(), category: category.trim(), amount: amount.trim() };
        }).filter(transaction => transaction.date && transaction.description && transaction.category && transaction.amount);
        setTransactions([...transactions, ...newTransactions]);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  return (
    <div className='App' style={{ backgroundColor: "black", color: "white" }}>
      <div style={{ margin: "20px", maxWidth: "1300px", fontFamily: "Arial, sans-serif", justifyContent: "center" }}>
        <h2 style={{ textAlign: "center" ,padding:"10px"}}>Manual Transaction Entry</h2>
        <form onSubmit={handleAddTransaction} style={{ marginBottom: "20px", backgroundColor: "black" }}>
          <div style={{ marginBottom: "15px", padding: "10px" }}>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </div>
          <div style={{ marginBottom: "15px", padding: "10px" }}>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              placeholder='Add a description'
              required
            />
          </div>
          <div style={{ marginBottom: "15px", padding: "10px" }}>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              placeholder='Add a category'
              required
            />
          </div>
          <div style={{ marginBottom: "15px", padding: "10px" }}>
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
              placeholder='Add an amount'
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Transaction
          </button>
        </form>
        <div>
        <h2>Upload CSV Files</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
            color:"black"
          }}
        />
        <button
          onClick={handleCSVUpload}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Upload CSV
        </button>
        </div>

        <h2>Transaction List</h2>
        <div className="transaction-list">
          {transactions.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "black", color: "white" }}>
                  <th style={{ padding: "10px", border: "1px solid grey" }}>Date</th>
                  <th style={{ padding: "10px", border: "1px solid grey" }}>Description</th>
                  <th style={{ padding: "10px", border: "1px solid grey" }}>Category</th>
                  <th style={{ padding: "10px", border: "1px solid grey" }}>Amount</th>
                  <th style={{ padding: "10px", border: "1px solid grey" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "black" : "black" }}>
                    <td style={{ padding: "10px", border: "1px solid grey" }}>{transaction.date}</td>
                    <td style={{ padding: "10px", border: "1px solid grey" }}>{transaction.description}</td>
                    <td style={{ padding: "10px", border: "1px solid grey" }}>{transaction.category}</td>
                    <td style={{ padding: "10px", border: "1px solid grey" }}>{transaction.amount}</td>
                    <td style={{ padding: "10px", border: "1px solid grey", textAlign: "center" }}>
                      <button
                        onClick={() => handleDeleteTransaction(index)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "red",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transactions added yet.</p>
          )}
        </div>

        <h2 style={{ marginTop: "20px" }}>Financial Advice</h2>
        <div
          style={{
            height: "30vh",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "black",
            color:"white"
          }}
        >
          <p>{financialAdvice}</p>
        </div>

        <h2 style={{ marginTop: "20px" }}>Future Expense Prediction</h2>
        <div
          style={{
            height: "50vh",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "black",
            marginBottom: "10px",
            color:"white"
          }}
        >
          <p>{futureExpensePrediction}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
