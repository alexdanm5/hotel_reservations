
import './options.scss'

const Options = ({ options }) => {

    return (
        
        <div className='options'>
            {options.map((option, index) => (
                <div key={index} className='options__item'>
                    {option}
                </div>
            ))}
        </div>
        
    )
}

export default Options;