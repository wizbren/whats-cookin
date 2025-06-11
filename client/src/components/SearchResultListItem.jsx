import RecipeFavButton from "./RecipeFavButton";

const SearchResultListItem = (props) => {
  const { title, description, image } = props; //may need liked state here

  return (
    <div>
      <span>
        <img src={image} alt={title} /> 
        <div>
          <span>
            <h3>{title}</h3>
            <RecipeFavButton />
          </span>
          <p>{description}</p>
        </div>
      </span>
    </div>
  );
};

export default SearchResultListItem;
