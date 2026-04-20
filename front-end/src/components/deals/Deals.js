import Suggestions from "../suggestions/Suggestions";

import './deals.scss'; 

const Deals = (props) => {
    return (
        <div className="deals">
            <Suggestions title={props.title} />
        </div>
    )
}

export default Deals;