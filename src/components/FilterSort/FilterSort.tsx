import React, { useEffect, useState } from 'react'
import MultiSelectDropdown from '../MultiSelectDropdown/MultiSelectDropdown'
import "./FilterSort.css";
import { filterItems } from '../constants/constants';
import type { FilterItem } from '../constants/constants';


type Selected = Record<string, string[]>

interface FilterSortProps {
    filterItems: FilterItem[];
    defaultSelected: Selected;
    // handleFilterChange: (filterKey: string, filterValues: string[]) => void
    onChange: (selected: Selected) => void

}

const FilterSort: React.FC<FilterSortProps> = (props) => {
    const { filterItems, onChange, defaultSelected: selected } = props;
    // const [selected, setSelected] = useState<Selected>(defaultSelected || {});

    const handleFilterChange = (key: string, selectedOptions: string[]) => {
        let newSelected: Selected = { ...selected };
        if (selectedOptions.length > 0) {
             newSelected = { ...selected, [key]: selectedOptions };
        } else if (selectedOptions.length === 0) {
            let newSelectedKeys = Object.keys(selected).filter((keyy)=> keyy !== key);
             newSelected = newSelectedKeys.reduce((acc, curr) => ({...acc, [curr]: selected[curr]}) , {});
        }

         onChange(newSelected)
    }

    return (
        <div className='filters'>
            {
                filterItems.map((filterItem) => {
                    return <div className='filter-item' key={filterItem.id}>
                        <MultiSelectDropdown defaultSelectedOptions={selected[filterItem.key]} label={filterItem.label} keyy={filterItem.key} options={filterItem.values} onOptionSelect={handleFilterChange} />
                    </div>
                })
            }
        </div>
    )
}

export default React.memo(FilterSort)