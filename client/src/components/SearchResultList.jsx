import SearchResultListItem from "./SearchResultListItem";

const SearchResultList = (props) => {
  const { recipesFromSearch } = props;

  return (   // VERIFY:ensures .map only runs if recipesFromSearch is actually an array
    <ul>
      {Array.isArray(recipesFromSearch) &&
        recipesFromSearch.map((recipe) => (
          <SearchResultListItem key={recipe.id} recipe={recipe} />
        ))}
    </ul>
  );
};

export default SearchResultList;

/* I replaced this with the above
<ul>
  {(recipesFromSearch || []).map((recipe) => (
    <SearchResultListItem key={recipe.id} recipe={recipe} />
  ))}
</ul>
*/
