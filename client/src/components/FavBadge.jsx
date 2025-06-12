import FavIcon from "./FavIcon";

import "../styles/FavBadge.scss";

const FavBadge = (props) => {
  const { selected, onClick } = props;

  return (
    <div
      className={`fav-badge ${selected ? "liked" : "not-liked"}`}
      onClick={onClick}
    >
      <FavIcon selected={selected} />
    </div>
  );
};

export default FavBadge;
