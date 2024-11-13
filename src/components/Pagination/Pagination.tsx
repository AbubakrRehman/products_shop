import React from 'react';
import dropdown_icon from "../../icons/dropdown-icon.png";
import "./Pagination.css"

interface PaginationProps {
    page: number;
    totalPageCount: number,
    nextButtonClick: () => void
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const { page, totalPageCount, nextButtonClick } = props;

    return (
        <>
            {
                page < totalPageCount  ? <div className='pagination'>
                    <button className="next-btn" disabled={totalPageCount === 1 || page === totalPageCount} onClick={nextButtonClick}>
                        <span className='next-btn-text'>View More</span>
                        <img src={dropdown_icon} alt="dropdwon-icon" width="20px" height="20px"/>
                    </button>
                </div>
                    : null
            }
        </>
    )
}

export default Pagination