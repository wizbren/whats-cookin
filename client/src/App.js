import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Main from "./components/Main";
import ModalComponent from "./components/Modal";
import Header from "./components/Header";
import useAppData from "./hooks/useAppData";
import "./styles/main.scss";

import User from "./components/User";

function App() {
  // Remove the hardcoded user - we'll use the state from useAppData
  // const user = "User 1"; //TEMPORARY HARDCODE FOR TESTING - REMOVED
  
  const {
    apiMessage,
    modalOpen,
    setModalOpen,
    likedStatus, //pass down as a prop to users when we make the route (and import recipeFavButton)
    toggleLikedStatus, //pass down as a prop to users when we make the route (and import recipeFavButton)
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

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    const savedUserInfo = localStorage.getItem("userInfo");
    
    if (savedUserId && savedUserInfo) {
      setUserId(parseInt(savedUserId));
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, [setUserId, setUserInfo]);

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
        />{" "}
        {/* renders Header at the top */}
        <Routes>
          <Route
            path="/login"
            element={
              <Login 
                userId={userId} 
                setUserId={setUserId} 
                setUserInfo={setUserInfo}
              />
            }
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
                userInfo={userInfo} // Pass userInfo to Main component
              />
            }
          />

          <Route 
            path="/user/:id" 
            element={
              <User 
                likedStatus={likedStatus}
                toggleLikedStatus={toggleLikedStatus}
                userInfo={userInfo}
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