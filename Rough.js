// import logo from './logo.svg';
import './App.css';
import React,{useState} from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [financialAdvice, setFinancialAdvice] = useState("Save at least 20% of your income.");
  const [futureExpensePrediction, setFutureExpensePrediction] = useState("Your predicted expenses for next month are $1200.");
    const [formData, setFormData] = useState({
      date: "",
      description: "",
      category: "",
      amount: "",
      csvFile: null,
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleFileChange = (event) => {
      setFormData({ ...formData, csvFile: event.target.files[0] });
    };
    
    const handleCSVUpload = () => {
      if (formData.csvFile) {
        alert(`CSV File "${formData.csvFile.name}" Uploaded!`);
      } else {
        alert("Please choose a CSV file first.");
      }
    };
    const handlesubmit = (event) => {
      event.preventDefault();
      alert("Transaction Added!");
    };
    const handleAddTransaction = () => {
      if (formData.date && formData.description && formData.category && formData.amount) {
        setTransactions([...transactions, formData]);
        setFormData({ date: "", description: "", category: "", amount: "" });
      } else {
        alert("Please fill out all fields.");
      }
      setFinancialAdvice("Based on your transactions, avoid overspending on entertainment.");
    setFutureExpensePrediction("Your predicted expenses for next month are $1500.");
    };
  
    
  
  return (
    <div className='App' style={{backgroundColor:"black",color:"white"}}>
    <div style={{margin: "20px", maxWidth: "1500px", fontFamily: "Arial, sans-serif",justifyContent:"center"}}>
      <h2 style={{ textAlign: "center" }}>Manual Transaction Entry</h2>
      <form onsubmit={handlesubmit} style={{marginBottom:"20px",backgroundColor:"black"}}>
      <div style={{ marginBottom: "15px",padding:"20px" }}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          /></div>
          <div style={{marginBottom:"15px",padding:"20px"}}>
            <label>Description:</label>
            <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder='Add a description'
            required/>
          </div>
          <div style={{marginBottom:"15px",padding:"20px"}}>
            <label>Category</label>
            <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder='Add a category'
            required/>
          </div>
          <div style={{marginBottom:"15px",padding:"20px"}}>
            <label>Amount</label>
            <input
            type="number"
            name="amount"
            value={formData.Amount}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            placeholder='Add an amount'
            required/>
          </div>
          <button onClick={handleAddTransaction} className="btn btn-primary"
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
          <div>
          <h2 style={{ textAlign: "center" }}>Upload CSV Files</h2>
          <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ marginBottom: "10px" }}
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
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.amount}</td>
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
          height:"30vh",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <p>{financialAdvice}</p>
      </div>

      <h2 style={{ marginTop: "20px" }}>Future Expense Prediction</h2>
      <div
        style={{
          height:"50vh",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          marginBottom:"10px",
        }}
      >
        <p>{futureExpensePrediction}</p>
      </div>
      </form>

    </div>
    </div>
  );
}

export default App;
