import Slider from '../slider/Slider';

import './suggestions.scss';

const  Suggestions = (props) => {
    return (
        <div className="suggestions">
            <h2 className="suggestions__title">{props.title}</h2>
            
            <Slider />
        </div>
    );
};

export default Suggestions;