
import './pagination.scss'

const Pagination = () => {
    return (
        <div className='pagination'>
            <div className='pagination__item active'>1</div>
            <span className='pagination__spn'></span>
            <div className='pagination__item'>2</div>
            <span className='pagination__spn'></span>
            <div className='pagination__item'>3</div>
        </div>
    )
}

export default Pagination;