import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useGetHotelByIdQuery } from "../../store/hotelsApi";

import HotelRating from "../hotel_rating/HotelRating";
import Photos from "../hotel_photos_list/Photos";
import Options from "../options/Options";
import MainBtn from "../main_btn/MainBtn";

import spiner from '../../assets/Spinner.svg';
import arrow from "../../assets/arrow/chevron-left.png";

const Hotel = () => {
    const { id } = useParams();
    const { data: hotel = {}, error, isLoading } = useGetHotelByIdQuery(id);
    
    const location = useLocation();
    const navigateBack = useNavigate();
    const navigateToRoomsList = useNavigate();

    const handleSelectRooms = () => {
        navigateToRoomsList(`/hotel/${id}/rooms_list`, { 
            state: { from: location.pathname + location.search }
        });
    }

    if (isLoading) {
        return <img src={spiner} alt='spinner' style={{"display": "block", "margin": "50px auto"}} />
    }

    if (error) {
        return <div style={{"textAlign": "center", "marginTop": "50px", "color": "#393939"}}>Error: {error.message || 'Помилка завантаження'}</div>
    }


    const { name, rating, photo, options } = hotel;

    return (
        <div>
            <div style={{"position": "relative"}}>
                <div to={`/result`} 
                style={{"position": "absolute", "top": "20px", "left": "18px", "zIndex": "1000"}}
                onClick={() => navigateBack(-1)}
                >
                    <img src={arrow} alt="Back"/>
                </div>
                <Photos photos={photo} />
            </div>
            

            <div style={{
                "display": "flex",
                "justifyContent": "space-between",
                "alignItems": "center",
                "padding": "25px 19px 20px 18px",
                "marginTop": "20px"
            }}>
                <div style={{
                    "fontWeight": "700",
                    "fontSize": "28px",
                    "letterSpacing": "-0.02em",
                    "color": "#393939"
                }}>{name}</div>
                <div style={{
                    "display": "flex",
                    "alignItems": "center",
                    "justifyContent": "center",
                    "borderRadius": "40px",
                    "width": "50px",
                    "height": "23px",
                    "boxShadow": "0 10px 20px 0 rgba(0, 0, 0, 0.1)",
                    "background": "linear-gradient(137deg, #f8a170 0%, #ffcd61 100%)",
                    "fontWeight": "800",
                    "fontSize": "12px",
                    "letterSpacing": "-0.02em",
                    "color": "#fff",
                    "textShadow": "0 0 2px 0 rgba(0, 0, 0, 0.25)"
                }}><HotelRating rating={rating}/></div>
            </div>
            <div style={{"fontSize": "16px"}}>
                <Options options={options} />
            </div>

            <div style={{"marginTop": "23px", "padding": "0 19px 30px 18px"}}>
                <MainBtn text={"Select Rooms"} onClick={handleSelectRooms}/>
            </div>
        </div>
    )
}

export default Hotel;