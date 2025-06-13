import RecipeFavButton from "./RecipeFavButton";

const UserLikeListItem = (props) => {
  const { recipe, setModalOpen, setSelectedRecipe, toggleLikedStatus, likedStatus } = props;

  const handleCardClick = () => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  return (
    <div
      className="card mb-3"
      style={{ 
        maxWidth: "540px", 
        cursor: "pointer",
        border: "5px solid #148e01",
       }}
      onClick={handleCardClick}
    >
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
              <RecipeFavButton
                recipeId={recipe.id}
                liked={likedStatus?.[recipe.id] === "liked"}
                toggleLikedStatus={() =>
                  toggleLikedStatus(recipe.id, recipe.url, recipe.image)
                }
              />
            </div>
            <p className="card-text">{recipe.description}</p>
            <a
              href={recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success btn-sm"
              onClick={(e) => e.stopPropagation()}
            >
              View Recipe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLikeListItem;
