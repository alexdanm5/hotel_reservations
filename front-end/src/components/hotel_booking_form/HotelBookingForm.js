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
    const [error, setError] = useState(false);

    const errorMes = <div className='bookingForm__error'>Enter the hotel's location</div>;

    const handleSearch = (e) => {
        e.preventDefault();
        if(!dataForSearch.location === ''){
            const queryString = new URLSearchParams(dataForSearch).toString();
            navigate(`/result?${queryString}`);
        }else {
            setError(true);
        }
        
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
        startDate: format(new Date(), 'MM/dd/yyyy'),
        endDate: format(new Date(), 'MM/dd/yyyy'), 
    });

    return (
        <div className='bookingForm'>
            <form className='bookingForm__form' onSubmit={handleSearch}>
                <input type="text" 
                    placeholder='Place' 
                    className='bookingForm__input' 
                    name='place' value={dataForSearch.location} 
                    onChange={(e) => {
                        setDataForSearch({ ...dataForSearch, location: e.target.value });
                        setError(false);
                        }
                    }
                />
               
                <select className='bookingForm__select' 
                        name='guests' 
                        value={dataForSearch.guests} 
                        onChange={(e) => setDataForSearch({ ...dataForSearch, guests: e.target.value })}
                >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                </select>
                 {error ? errorMes : null}
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
                <div className='bookingForm__btn'><MainBtn text="Search a room" onClick={handleSearch} /></div>
            </form>
        </div>
    )
}

export default HotelBookingForm;