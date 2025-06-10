import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import ModalComponent from "./components/Modal";
import Header from "./components/Header";
import useAppData from "./hooks/UseAppData";
import "./styles/main.scss";


function App() {
  const user = "User 1"; //TEMPORARY HARDCORE FOR TESTING
  const {
    apiMessage,
    modalOpen,
    setModalOpen,
    likedStatus, //pass down as a prop to users when we make the route (and import recipeFavButton)
    toggleLikedStatus, //pass down as a prop to users when we make the route (and import recipeFavButton)
    userId,
    setUserId,
  } = useAppData();

  return (
    <Router>
      <div className="App">
        <Header user={user} /> {/* renders Header at the top */}
        <Routes>
          <Route
            path="/login"
            element={<Login userId={userId} setUserId={setUserId} />}
          />
          <Route
            path="/"
            element={
              <Main
                apiMessage={apiMessage}
                likedStatus={likedStatus}
                toggleLikedStatus={toggleLikedStatus}
              />
            }
          />
        </Routes>
        <ModalComponent
          show={modalOpen}
          onClose={() => setModalOpen(false)}
          likedStatus={likedStatus}
          toggleLikedStatus={toggleLikedStatus}
        />
      </div>
    </Router>
  );
}

export default App;
