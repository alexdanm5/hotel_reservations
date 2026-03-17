

import  './hotelBookingForm.scss';

const  HotelBookingForm = () => {
    return (
        <div className='bookingForm'>
            <form className='bookingForm__form'>
                <input type="text" placeholder='Place' className='bookingForm__input' name='place'/>
                <select className='bookingForm__select' name='guests'>
                    <option value="">Guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                </select>
                <input type="text" placeholder='Date' className='bookingForm__input' name='date'/>
                <select className='bookingForm__select' name='nights'>
                    <option value="">Nights</option>
                    <option value="1">1 Night</option>
                    <option value="2">2 Nights</option>
                    <option value="3">3 Nights</option>
                    <option value="4">4 Nights</option>
                </select>
                <button className='bookingForm__btn'>Search a room</button>
            </form>
        </div>
    )
}

export default HotelBookingForm;