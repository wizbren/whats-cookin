import RecipeFavButton from "./RecipeFavButton";

const SearchResultListItem = (props) => {
  const { recipe } = props; //may need liked state here

  return (
    <div>
      <span>
        <img src={recipe.image} alt={recipe.title} /> 
        <div>
          <span>
            <h3>{recipe.title}</h3>
            <RecipeFavButton />
          </span>
          <p>{recipe.description}</p>
        </div>
      </span>
    </div>
  );
};

export default SearchResultListItem;
