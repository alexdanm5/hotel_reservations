import SearchBar from "../searchBar/SearchBar";
import HotelList from "../hotel_list/HotelList"
import FilterBar from "../filter_bar/FilterBar";
import SideBarPanel from '../side_bar_panel/SideBarPanel';

const Result = () => {
    return (
        <div style={{ position: "relative", paddingBottom: "100px" }}>
            <div style={{ paddingLeft: "18px", marginTop: "20px" }}><SearchBar /></div>
            <div style={{  
                            borderTop: "1px solid #F5F5F5", 
                            borderBottom: "1px solid #F5F5F5", 
                            marginTop: "34px" 
                        }}>
                            <FilterBar />
            </div>
            
            <div style={{marginTop: "20px"}}><HotelList /></div>
            
            <SideBarPanel />
        </div>
    )
}

export default Result;