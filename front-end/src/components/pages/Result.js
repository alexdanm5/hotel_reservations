import { useGetHotelsBySearchParametersQuery } from '../../store/hotelsApi';
import { useSearchParams } from 'react-router-dom';

import SearchBar from "../searchBar/SearchBar";
import HotelList from "../hotel_list/HotelList"
import SideBarPanel from '../side_bar_panel/SideBarPanel';

import spiner from '../../assets/Spinner.svg';

const Result = () => {

    const [searchParams] = useSearchParams();
    

    const queryObj = Object.fromEntries(searchParams);

    const { data: hotels = [], isUninitialized, isFetching, error } = useGetHotelsBySearchParametersQuery(queryObj, { skip: Object.keys(queryObj).length === 0 });
        
    let status = null;

    if (isUninitialized) {
        status = null; 
    } else if (isFetching) {
        status = <img style={{'margin': '40px auto 0 auto'}} src={spiner} alt='spinner' />;
    } else if (error) {
        status = <div>Error: {error.message || 'Помилка завантаження'}</div>;
    } else if (hotels.length === 0) {
        status = <div>Готелі не знайдено.</div>;
    }
    return (
        <div style={{ position: "relative", paddingBottom: "100px" }}>

            <div style={{marginTop: "20px"}}>
                {status || <HotelList hotels={hotels} />}
            </div>
            
            <SideBarPanel />
        </div>
    )
}

export default Result;