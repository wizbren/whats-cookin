import "../styles/RecipeFavButton.scss";
import FavBadge from "./FavBadge";

//this component is responsible for favourite button, it handles the click and the actual change in appearance when the botton is clicked
const RecipeFavButton = (props) => {
  const { liked, toggleLikedStatus } = props;

  const handleClick = (e) => {
    e.stopPropagation(); //makes it so doesn't trigger the modal
    toggleLikedStatus()
  };

  return (
    <div className="recipe-list__fav-icon">
      <div className="recipe-list__fav-icon-svg">
        <FavBadge selected={liked} onClick={handleClick} />
      </div>
    </div>
  );
};

export default RecipeFavButton;

//this is exactly the same as photolabs but the state has to be passed down as a prop in order to make this work
//I changed the instances of "photo" to "recipe" but i may have missed some steps
