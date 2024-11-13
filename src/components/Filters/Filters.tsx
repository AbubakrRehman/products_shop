import React, { useEffect, useState } from 'react'
import { filterItems } from '../constants/constants'
import FilterItemComponent from './FilterItemComponent'
import "./Filters.css";
import Tags from './Tags';

type SelectedFilter = Record<string, string[]>
type SelectedOptions = string[]

interface FilterProps {
    selected: SelectedFilter;
    // onChange: (selected: SelectedFilter) => void;
    onApply: (selected: SelectedFilter) => void;
    onClose: () => void
}

type AppliedFilter = {
    key: string,
    value: string
}

const Filters: React.FC<FilterProps> = (props) => {

    const { onApply , selected, onClose} = props;
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilter>(selected)

    const handleFilterItemChange = (filterKey: string, selectedOptions: SelectedOptions) => {
        let newSelected: SelectedFilter = { ...selectedFilters };

        if (selectedOptions.length > 0) {
            newSelected[filterKey] = selectedOptions
        } else {
            delete newSelected[filterKey]
        }
        setSelectedFilters(newSelected)
    }

    const expandSelected = (selected: Record<string, string[]>) => {

        let selectedKeys = Object.keys(selected);
        let appliedFilters: AppliedFilter[] = []

        selectedKeys.forEach((key) => {
            selected[key].forEach((value) => {
                appliedFilters.push({
                    key, value
                })
            })
        })

        return appliedFilters
    }



    const onClear = (key: string, value: string) => {
        let newSelected: SelectedFilter = { ...selectedFilters };
        let selectedKeys = Object.keys(newSelected);

        if (newSelected[key].length == 1) {
            delete newSelected[key]
        } else {
            newSelected[key] = newSelected[key].filter((val) => val !== value)
        }
        setSelectedFilters(newSelected)
    }

    const onClearAll = () => {
        setSelectedFilters({})
    }






    return (
        <div className='filters-component'>
           
            <div className='filters-main'>
                <div className='filters-header'>
                    <div className="filters-label-n-count">
                        <div className='filters-header-label'>Filters</div>
                        {/* <div className='filters-header-count'>{expandSelected(selected).length} Item(s)</div> */}
                        <div className='filters-header-count'>{expandSelected(selectedFilters).length} Item(s)</div>
                    </div>
                    <button onClick={onClose} className='sidebar-close-btn'>X</button>
                </div>
                <Tags appliedFilters={expandSelected(selectedFilters)} onClear={onClear} onClearAll={onClearAll} />
                <div className='filters'>
                    {
                        filterItems.map((filterItem) => {
                            return <FilterItemComponent key={filterItem.id} filterItem={filterItem} onChange={handleFilterItemChange} defaultSelectedOptions={selectedFilters[filterItem.key] || []} />
                        })
                    }
                </div>
            </div>
            <div className="filters-footer">
                <button className='apply-btn' onClick={() => onApply(selectedFilters)}>Apply</button>
            </div>
        </div>




    )
}

export default Filters