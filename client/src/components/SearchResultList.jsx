import SearchResultListItem from "./SearchResultListItem";

const SearchResultList = (props) => {
  const { recipesFromSearch } = props;

  return (
    <ul>
      {recipesFromSearch.map((recipe) => (
        <SearchResultListItem
          key={recipe.id}
          recipe={recipe}
        />
      ))}
    </ul>
  );
};

export default SearchResultList;
