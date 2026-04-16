import photo1 from '../../assets/hotel_photos/photo1.png';
import photo2 from '../../assets/hotel_photos/photo2.png';
import photo3 from '../../assets/hotel_photos/photo3.png';
import photo4 from '../../assets/hotel_photos/photo4.png';

import './photos.scss';

const Photos = () => {

    return (
        <div className="photos">
            <img src={photo1} alt="Photo 1" />
            <img src={photo2} alt="Photo 2" />
            <img src={photo3} alt="Photo 3" />
            <img src={photo4} alt="Photo 4" />
        </div>
    )
}

export default Photos;