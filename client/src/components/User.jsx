import UserLikeList from './UserLikeList';

const User = (props) => {
  const {
    setModalOpen,
    setSelectedRecipe,
    toggleLikedStatus,
    likedStatus,
    recipesFromDB,
  } = props;

  return (
    <div
      className="main-view"
      style={{ backgroundImage: "url('/images/food.png')" }}
    >
      <UserLikeList
        setModalOpen={setModalOpen}
        setSelectedRecipe={setSelectedRecipe}
        toggleLikedStatus={toggleLikedStatus}
        likedStatus={likedStatus}
        recipesFromDB={recipesFromDB}
      />
    </div>
  );
};

export default User;
