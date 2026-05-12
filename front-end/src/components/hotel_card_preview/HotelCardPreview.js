import { useSelector } from 'react-redux';
import { useAddHotelToFavouritesMutation, 
         useGetUserFavouritesQuery, 
         useRemoveHotelFromFavouritesMutation } from '../../store/userApi';

import HotelRating from '../hotel_rating/HotelRating';

import like from '../../assets/like.png';
import liked from '../../assets/liked.svg';
import './preview.scss';

const HotelCardPreview = ({ hotel }) => {

    const isLog = useSelector(state => state.authorization.trigger)

    const { id, name, photo, rating } = hotel;

    const { data: favourites = [] } = useGetUserFavouritesQuery(undefined, {skip: !isLog});
    
    const [addHotelToFavourites] = useAddHotelToFavouritesMutation();
    const [removeHotelFromFavourites] = useRemoveHotelFromFavouritesMutation();

    const isFavorite = favourites.some(favHotel => favHotel.id === id);
    const currentIcon = isFavorite ? liked : like;


    const handleFavoriteHotel = async (e) => {
        e.preventDefault();   
        e.stopPropagation();
        if(!isFavorite) {
            await addHotelToFavourites(hotel).unwrap();
        }else {
            await removeHotelFromFavourites(hotel).unwrap();
        }
    }
    

    return (
        <div className='preview'>    
            <img className='preview__img' src={photo[0]} alt='hotel'/>
            <div className='preview__like' onClick={(e) => handleFavoriteHotel(e)}>
                <img  src={currentIcon} alt='like'/>
            </div>
            
            <div className='preview__info'>
                <h3 className='preview__name'>{name}</h3>
                <div className='preview__rating'> <HotelRating rating={rating}/> </div>
            </div>
        </div>
    )
}

export default HotelCardPreview;
