import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import ModalComponent from "./components/Modal";
import Header from "./components/Header";
import useAppData from "./hooks/useAppData";
import "./styles/main.scss";

import User from "./components/User";

function App() {
  const user = "User 1"; //TEMPORARY HARDCODE FOR TESTING
  const {
    apiMessage,
    modalOpen,
    setModalOpen,
    likedStatus, //pass down as a prop to users when we make the route (and import recipeFavButton)
    toggleLikedStatus, //pass down as a prop to users when we make the route (and import recipeFavButton)
    recipes,
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

  return (
    <Router>
      <div className="App">
        <Header
          user={userId}
          setUserId={setUserId}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setPrompt={setPrompt}
        />{" "}
        {/* renders Header at the top */}
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

          <Route path="/user/:id" element={<User />} />



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
