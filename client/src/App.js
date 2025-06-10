import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Modal from './components/Modal'
import ModalComponent from './components/Modal';
import Header from "./components/Header";
import "./styles/main.scss";

function App() {
  const [apiMessage, setApiMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(true);
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
          <Route path="/" element={<Main />} />
        </Routes>
        <ModalComponent show={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
