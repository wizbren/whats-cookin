import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import ModalComponent from "./components/Modal";
import Header from "./components/Header";
import useAppData from "./hooks/useAppData";
import "./styles/main.scss";

function App() {
  const user = "User 1"; //TEMPORARY HARDCORE FOR TESTING
  const { apiMessage, modalOpen, setModalOpen } = useAppData();

  return (
    <Router>
      <div className="App">
        <Header user={user} /> {/* renders Header at the top */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main apiMessage={apiMessage} />} />
        </Routes>
        <ModalComponent show={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
