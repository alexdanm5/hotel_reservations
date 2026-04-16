
import HotelRating from "../hotel_rating/HotelRating";
import Photos from "../hotel_photos_list/Photos";
import Options from "../options/Options";
import MainBtn from "../main_btn/MainBtn";

import arrow from "../../assets/arrow/chevron-left.png";

const Hotel = () => {

    return (
        <div>
            <div style={{"position": "relative"}}>
                <a style={{"display": "block", "position": "absolute", "top": "20px", "left": "18px", "zIndex": "1000"}} >
                    <img src={arrow} alt="Back"/>
                </a>
                <Photos/>
            </div>
            

            <div style={{
                "display": "flex",
                "justify-content": "space-between",
                "alignItems": "center",
                "padding": "25px 19px 20px 18px",
                "margin-top": "20px"
            }}>
                <div style={{
                    "font-weight": "700",
                    "font-size": "28px",
                    "letter-spacing": "-0.02em",
                    "color": "#393939"
                }}>Beach Resort Lux</div>
                <div style={{
                    "display": "flex",
                    "align-items": "center",
                    "justify-content": "center",
                    "border-radius": "40px",
                    "width": "50px",
                    "height": "23px",
                    "box-shadow": "0 10px 20px 0 rgba(0, 0, 0, 0.1)",
                    "background": "linear-gradient(137deg, #f8a170 0%, #ffcd61 100%)",
                    "font-weight": "800",
                    "font-size": "12px",
                    "letter-spacing": "-0.02em",
                    "color": "#fff",
                    "text-shadow": "0 0 2px 0 rgba(0, 0, 0, 0.25)"
                }}><HotelRating/></div>
            </div>
            <div style={{"fontSize": "16px"}}>
                <Options/>
            </div>

            <div style={{"marginTop": "23px", "padding": "0 19px 30px 18px"}}>
                <MainBtn text={"Select Rooms"}/>
            </div>
        </div>
    )
}

export default Hotel;