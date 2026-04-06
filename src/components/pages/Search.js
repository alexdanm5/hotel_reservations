import SearchBar from "../searchBar/SearchBar";
import Recommended from '../recommend/Recommend';
import Deals from '../deals/Deals';
import SideBarPanel from '../side_bar_panel/SideBarPanel';

const Search = () => {
    return (
        <div style={{padding: "40px 0 100px 0", position: "relative"}}>
            <div style={{padding: "0 19px 0 18px"}}>
                <SearchBar />
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