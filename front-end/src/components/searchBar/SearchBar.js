import { useState } from 'react';

import Search from '../../assets/searchBar_icon/Search';
import Cansel from '../../assets/searchBar_icon/Cancel';
import './searchBar.scss';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handelCansel = () => {
        setSearchTerm('');
        onSearch('');
    }

    const cansel = searchTerm ? <button className='searchBar__btn' type="button" onClick={handelCansel}><Cansel /></button> : null;

   const onSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            onSearch({param: searchTerm});
        }
   }

    return (
        <form className="searchBar" onSubmit={onSubmit}>
            <div className='searchBar__wrapper'>
                <button type='submit' className='searchBar__sub'><Search /></button>
                <input 
                    className='searchBar__input' 
                    type="text" 
                    placeholder="Search for a city, area, or a hotel" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {cansel}
            </div>  
        </form>
    )
}

export default SearchBar;