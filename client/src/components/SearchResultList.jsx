import SearchResultListItem from "./SearchResultListItem";

const SearchResultList = (props) => {
  const { recipesFromSearch, setModalOpen, setSelectedRecipe } = props;

  return (
    <ul>
      {(recipesFromSearch || []).map((recipe) => (
        <SearchResultListItem
          key={recipe.id}
          recipe={recipe}
          setModalOpen={setModalOpen}
          setSelectedRecipe={setSelectedRecipe}
        />
      ))}
    </ul>
  );
};

export default SearchResultList;
