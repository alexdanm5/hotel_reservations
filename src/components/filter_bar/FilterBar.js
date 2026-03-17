import Filter from '../../assets/filter_icon/Filter'
import './filterBar.scss';

const FilterBar = () => {
    return (
        <div className='filterBar'>
            <button className='filterBar__settings'>
                <span className='filterBar__icon'><Filter /></span>
                <span className='filterBar__text'>Filter</span>
            </button>
        </div>
    )
}

export default FilterBar;