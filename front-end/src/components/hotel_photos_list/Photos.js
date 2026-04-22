import './photos.scss';
    
const Photos = ({ photos = [] }) => {

    return (
        <div className="photos">
            {photos.slice(0, 4).map((photo, index) => (
                <img 
                    key={photo} 
                    src={photo} 
                    alt={`Hotel ${index + 1}`} 
                />
            ))}
        </div>
    )
}
export default Photos;