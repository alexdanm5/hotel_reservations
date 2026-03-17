import HotelBookingForm from '../hotel_booking_form/HotelBookingForm';
import './promo.scss';

const  Promo = () => {
    return (
        <div className="promo">
            <h1 className="promo__title">Find a perfect place to stay</h1>
            <HotelBookingForm />
        </div>
    );
}

export default Promo;