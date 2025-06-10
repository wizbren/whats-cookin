import FavIcon from './FavIcon';

import './styles/FavBadge.scss';

const FavBadge = (props) => {
  const { isFavRecipeExist, selected, onClick } = props;

  return (
    <div className='fav-badge' onClick={onClick} >
      <FavIcon displayAlert={!!isFavRecipeExist} selected={selected} />
    </div>
  )
};

export default FavBadge;
