import UserLikeListItem from "./UserLikeListItem";

const UserLikeList = (props) => {
  const {
    recipesFromSearch,
    setModalOpen,
    setSelectedRecipe,
    toggleLikedStatus,
    likedStatus,
    recipesFromDB,
  } = props;

  return (
    // VERIFY:ensures .map only runs if recipesFromSearch is actually an array
    <ul>
      {Array.isArray(recipesFromDB) &&
        recipesFromDB.map((recipe) => (
          <userLikeListItem
            key={recipe.id}
            recipe={recipe}
            setModalOpen={setModalOpen}
            setSelectedRecipe={setSelectedRecipe}
            toggleLikedStatus={toggleLikedStatus}
            likedStatus={likedStatus}
          />
        ))}
    </ul>
  );
};

export default UserLikeList;
