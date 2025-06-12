import FavIcon from './FavIcon';

import '../styles/FavBadge.scss';

const FavBadge = (props) => {
  const { selected, onClick } = props;

  return (
    <div className='fav-badge' onClick={onClick} >
      <FavIcon displayAlert={selected} selected={selected} />
    </div>
  )
};

export default FavBadge;
