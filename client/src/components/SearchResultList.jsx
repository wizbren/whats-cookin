import SearchResultListItem from "./SearchResultListItem";

const SearchResultList = (props) => {
  const { recipesFromSearch, setModalOpen } = props;

  return (
    <ul>
      {(recipesFromSearch || []).map((recipe) => (
        <SearchResultListItem key={recipe.id} recipe={recipe} setModalOpen={setModalOpen} />
      ))}
    </ul>
  );
};

export default SearchResultList;
