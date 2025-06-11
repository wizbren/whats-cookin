import RecipeFavButton from "./RecipeFavButton";

const SearchResultListItem = (props) => {
  const { recipe, setModalOpen, setSelectedRecipe } = props;

  const handleCardClick = () => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  }

  return (
    <div className="card mb-3" style={{ maxWidth: "540px", cursor: "pointer" }} onClick={handleCardClick}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <h5 className="card-title">{recipe.title}</h5>
              <RecipeFavButton />
            </div>
            <p className="card-text">{recipe.description}</p>
            <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm">
              View Recipe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultListItem;
