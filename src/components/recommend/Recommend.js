
import Suggestions from "../suggestions/Suggestions";

import './recommend.scss'; 

const Recommended = (props) => {
    return (
        <div className="recommend">
            <Suggestions title={props.title} />
        </div>
    )
}

export default Recommended;