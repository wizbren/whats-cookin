import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/components/_header.scss";

export default function Header(props) {
  const {
    user,
    setUserId,
    userInfo,
    setUserInfo,
    setPrompt,
    setRecipes,
    setSubmitted,
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const isOnFavoritesPage = location.pathname.startsWith(`/users/`);

  const handleLogout = () => {
    setUserId(null);
    setUserInfo(null);
    setRecipes([]);
    setPrompt("");
    setSubmitted(false);
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleFavorites = () => {
    if (user) {
      navigate(`/users/${user}`); // navigates to the user's liked recipes page
      window.location.reload(); //need a refresh to render recipes
    } else {
      alert("Please log in to view your favorites");
    }
  };

  return (
    <nav className="header">
      {/* LEFT BOX */}
      <div className="header-section header-left">
        <p className="user-name">
          {userInfo ? `Logged in as: ${userInfo.name}` : "User Not Logged In"}
        </p>
        <div className="header-buttons">
          <button className="header-btn" onClick={handleLogout}>
            Logout
          </button>
          {isOnFavoritesPage ? (
            <button className="header-btn" onClick={() => navigate("/")}>
              Home
            </button>
          ) : (
            <button className="header-btn" onClick={handleFavorites}>
              Favourites
            </button>
          )}

          <button className="header-btn" onClick={() => setPrompt("")}>
            Clear Prompt
          </button>
        </div>
      </div>

      {/* MIDDLE BOX */}
      <div className="header-section header-center">
        <h1 className="project-title">
          What's <br />
          Cookin'?
        </h1>
        <p className="project-credits">
          Created by <br />
          Jesse Miller - Boxin Cao - Brendan Brown
        </p>
      </div>

      {/* RIGHT BOX */}
      <div className="header-section header-right">
        {/* KEEP EMPTY FOR FLEXBOX SPACING */}
      </div>
    </nav>
  );
}

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/components/_header.scss";

// export default function Header(props) {
//   const { user, setUserId, userInfo, setUserInfo } = props;
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setUserId(null);
//     setUserInfo(null);
//     navigate("/login");
//   };

//   //newly added
//   const handleFavorites = () => {
//     // Navigate to user page, passing userId as URL parameter
//     if (user) {
//       navigate(`/user/${user}`);
//     } else {
//       // Handle case where user is not logged in
//       alert("Please log in to view your favorites");
//     }
//   };

//   return (
//     <nav className="header">
//       {/* LEFT BOX BELOW */}
//       <div className="header-section header-left">
//         <p className="user-name">
//           {userInfo ? `Logged in as: ${userInfo.name}` : "User Not Logged In"}
//         </p>
//         <div className="header-buttons">
//           <button className="header-btn" onClick={handleLogout}>
//             Logout
//           </button>
//           <button className="header-btn">Favorites</button>
//           <button className="header-btn">Clear Prompt</button>
//         </div>
//       </div>

//       {/* MIDDLE BOX BELOW */}
//       <div className="header-section header-center">
//         <h1 className="project-title">
//           What's <br />
//           Cookin'?
//         </h1>
//         <p className="project-credits">
//           Created by <br />
//           Jesse Miller - Boxin Cao - Brendan Brown
//         </p>
//       </div>

//       {/* RIGHT BOX BELOW (EMPTY) */}
//       <div className="header-section header-right">
//         {/* KEEP EMPTY FOR FLEXBOX SPACING */}
//       </div>
//     </nav>
//   );
// }
