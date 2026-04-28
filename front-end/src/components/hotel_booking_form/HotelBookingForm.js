import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import {useState} from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import MainBtn from '../main_btn/MainBtn';

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

import './hotelBookingForm.scss';

const HotelBookingForm = () => {
    
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/result');
    }

    const [openDate, setOpenDate] = useState(false);

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(), 
            key: 'selection'
        }
    ]);

    const [dataForSearch, setDataForSearch] = useState({
        location: '',
        guests: '',
        nights: '',
        startDate: '',
        endDate: '', 
    });

    return (
        <div className='bookingForm'>
            <form className='bookingForm__form'>
                <input type="text" 
                    placeholder='Place' 
                    className='bookingForm__input' 
                    name='place' value={dataForSearch.location} 
                    onChange={(e) => setDataForSearch({ ...dataForSearch, location: e.target.value })}/>
                <select className='bookingForm__select' 
                        name='guests' 
                        value={dataForSearch.guests} 
                        onChange={(e) => setDataForSearch({ ...dataForSearch, guests: e.target.value })}
                >
                    <option value="">Guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                </select>
                <div className="bookingForm__wrapper">

                    <span 
                        onClick={() => setOpenDate(!openDate)} 
                        className='bookingForm__input bookingForm__input-date' 
                    >
                        {`${format(state[0].startDate, "MM/dd/yyyy")} to ${format(state[0].endDate, "MM/dd/yyyy")}`}
                    </span>
                    {openDate && (
                        <div className='bookingForm__calendar'>
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => {
                                    const selectedStart = item.selection.startDate;
                                    const selectedEnd = item.selection.endDate;
                                    setState([item.selection]);

                                    const formattedStart = format(selectedStart, 'MM/dd/yyyy');
                                    const formattedEnd = format(selectedEnd, 'MM/dd/yyyy');
                                    setDataForSearch({
                                        ...dataForSearch,
                                        startDate: formattedStart,
                                        endDate: formattedEnd,
                                    });
                                }}
                                moveRangeOnFirstSelection={false}
                                ranges={state}
                                locale={enUS}
                            />
                        </div>
                    )}
                </div>
                <select className='bookingForm__select' 
                        name='nights' 
                        value={dataForSearch.nights} 
                        onChange={(e) => setDataForSearch({ ...dataForSearch, nights: e.target.value })}
                >
                    <option value="">Nights</option>
                    <option value="1">1 Night</option>
                    <option value="2">2 Nights</option>
                    <option value="3">3 Nights</option>
                    <option value="4">4 Nights</option>
                </select>
                <div className='bookingForm__btn'><MainBtn text="Search a room" onClick={handleSearch} /></div>
            </form>
        </div>
    )
}

export default HotelBookingForm;