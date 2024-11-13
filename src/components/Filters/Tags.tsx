import React from 'react';
import "./Tags.css"


type AppliedFilter = {
    key: string,
    value: string
}

interface TagsProps {
    appliedFilters: AppliedFilter[];
    onClear: (key: string, value: string) => void;
    onClearAll: () => void
}

const Tags: React.FC<TagsProps> = (props) => {
    const { appliedFilters, onClear, onClearAll } = props;
    return (
        <>
            {appliedFilters.length > 0 ?
                <div className='active-filters'>
                    <div className="active-filters-title">Active Filters</div>
                    <div className='tags'>
                        {appliedFilters.map((appliedFilter, index) => {
                            return <button className='tag' onClick={() => onClear(appliedFilter.key, appliedFilter.value)} key={index}>
                                <div className="label">{appliedFilter.value}</div>
                                <div className="clear">X</div>
                            </button>
                        })}
                        <button className="clear-all-btn" onClick={onClearAll}>Clear All</button>
                    </div>
                </div>

                : null
            }


        </ >

    )
}

export default Tags