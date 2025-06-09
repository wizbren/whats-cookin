import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Modal from "./components/Modal";
import User from "./components/User";
import Header from "./components/Header";
import "./styles/main.scss";

function App() {
  const [apiMessage, setApiMessage] = useState("");
  const user = "User 1"; //TEMPORARY HARDCORE FOR TESTING

  useEffect(() => {
    fetch("http://localhost:8080/api/test")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} />     {/* renders Header at the top */}
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Add other routes here, e.g. */}
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
