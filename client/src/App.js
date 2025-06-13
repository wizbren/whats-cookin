import { useEffect } from "react"; // ⬅️ Import useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import ModalComponent from "./components/Modal";
import Header from "./components/Header";
import useAppData from "./hooks/useAppData";
import "./styles/main.scss";
import User from "./components/User";
import axios from "axios"; // ⬅️ Import axios

function App() {
  const {
    apiMessage,
    modalOpen,
    setModalOpen,
    likedStatus,
    toggleLikedStatus,
    recipes,
    setRecipes,
    fetchRecipes,
    userId,
    setUserId,
    userInfo,
    setUserInfo,
    submitted,
    setSubmitted,
    prompt,
    setPrompt,
    recipesFromSearch,
    selectedRecipe,
    setSelectedRecipe,
  } = useAppData();

  // ⬇️ Automatically fetch user info whenever userId is set
  useEffect(() => {
    if (userId) {
      axios.get(`/api/users/${userId}`)
        .then(res => {
          setUserInfo(res.data);
        })
        .catch(err => {
          console.error("Error fetching user info:", err);
        });
    } else {
      setUserInfo(null); // Clear when logged out
    }
  }, [userId]);

  return (
    <Router>
      <div className="App">
        <Header
          user={userId}
          setUserId={setUserId}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setPrompt={setPrompt}
          setRecipes={setRecipes}
          setSubmitted={setSubmitted}
        />

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
                submitted={submitted}
                setSubmitted={setSubmitted}
                fetchRecipes={fetchRecipes}
                prompt={prompt}
                setPrompt={setPrompt}
                recipesFromSearch={recipesFromSearch}
                setModalOpen={setModalOpen}
                setSelectedRecipe={setSelectedRecipe}
                recipes={recipes}
              />
            }
          />
          <Route
            path="/user/:id"
            element={
              <User
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
          selectedRecipe={selectedRecipe}
        />
      </div>
    </Router>
  );
}

export default App;
