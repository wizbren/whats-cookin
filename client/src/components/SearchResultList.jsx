import SearchResultListItem from "./SearchResultListItem";

const SearchResultList = (props) => {
  const { recipesFromSearch, setModalOpen, setSelectedRecipe, toggleLikedStatus, likedStatus } = props;

  return (
    <ul>
      {(recipesFromSearch || []).map((recipe) => (
        <SearchResultListItem
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

export default SearchResultList;
