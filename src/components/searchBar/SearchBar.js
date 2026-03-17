import Search from '../../assets/searchBar_icon/Search';
import Cansel from '../../assets/searchBar_icon/Cancel';
import './searchBar.scss';

const SearchBar = () => {

    return (
        <form className="searchBar">
            <div className='searchBar__wrapper'>
                <span className='searchBar__spn'><Search /></span>
                <input className='searchBar__input' type="text" placeholder="Search for a city, area, or a hotel" />
                <button className='searchBar__btn' type="button"><Cansel /></button>
            </div>
            
        </form>
    )
}

export default SearchBar;