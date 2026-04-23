
import { useSearchParams } from 'react-router-dom';
import { useGetHotelsByInputedValueQuery } from '../../store/hotelsApi';


import SearchBar from "../searchBar/SearchBar";
import HotelList from '../hotel_list/HotelList';
import Recommended from '../recommend/Recommend';
import Deals from '../deals/Deals';
import SideBarPanel from '../side_bar_panel/SideBarPanel';

import spiner from '../../assets/Spinner.svg';



const Search = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    const searchTerm = searchParams.get('param') || '';

    const { data: hotels = [], isUninitialized, isFetching, error } = useGetHotelsByInputedValueQuery(searchTerm, { skip: !searchTerm });

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
        <div style={{padding: "40px 0 100px 0", position: "relative"}}>
            <div style={{padding: "0 19px 0 18px"}}>
                <SearchBar onSearch={setSearchParams} />
            </div>

            <div style={{ marginTop: "20px"}}>
                {status || <HotelList hotels={hotels} />}
            </div>

            <div style={{marginTop: "33px", padding: "33px 0  39px 0", background: "linear-gradient(137deg, rgba(255, 199, 167, 0.2) 0%, rgba(255, 213, 121, 0.2) 100%)"}}>
                <Recommended title="Recommended" />
            </div>

            <Deals title="Deals" />
            <SideBarPanel />

        </div>
    )
}

export default Search;