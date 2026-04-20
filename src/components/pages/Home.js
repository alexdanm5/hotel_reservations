


import Promo from '../promo/Promo';
import Recommended from '../recommend/Recommend';
import Deals from '../deals/Deals';
import SideBarPanel from '../side_bar_panel/SideBarPanel';

const  Home = () => {

    return (
        <div style={{ position: "relative", paddingBottom: "100px" }} className="home">
            <Promo />
            
            <div style={{marginTop: "35px"}}>
                <Recommended title="Recommended" />
            </div>
            
            <Deals title="Deals" />
            <SideBarPanel />
        </div>
    );
}

export default Home;