import UserLikeListItem from "./UserLikeListItem";

const UserLikeList = (props) => {
  const {
    setModalOpen,
    setSelectedRecipe,
    toggleLikedStatus,
    likedStatus,
    recipesFromDB,
  } = props;

  return (
    <ul>
      {Array.isArray(recipesFromDB) &&
        recipesFromDB.map((recipe) => (
          <UserLikeListItem
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
