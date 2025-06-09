import FavIcon from "./FavIcon";
import "../styles/RecipeFavButton.scss";

//this component is responsible for favourite button, it handles the click and the actual change in appearance when the botton is clicked
const RecipeFavButton = () => {
  // const { toggleFavourite, favouriteStatus } = props;

  return (
    <div className="recipe-list__fav-icon" onClick={toggleFavourite}>
      <div className="recipe-list__fav-icon-svg">
        <FavIcon selected={favouriteStatus === "favourited"} />
      </div>
    </div>
  );
};

export default RecipeFavButton;

//this is exactly the same as photolabs but the state has to be passed down as a prop in order to make this work
//I changed the instances of "photo" to "recipe" but i may have missed some steps
