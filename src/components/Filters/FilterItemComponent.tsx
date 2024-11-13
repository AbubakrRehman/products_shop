import React, { useEffect, useState } from 'react';
import type { FilterItem } from '../constants/constants';
import FilterItemOption from './FilterItemOption';
import "./Filters.css"

type SelectedOptions = string[]

interface FilterItemComponentProps {
  filterItem: FilterItem,
  onChange: (filterKey: string, selectedOptions: SelectedOptions) => void,
  defaultSelectedOptions: SelectedOptions
}



const FilterItemComponent: React.FC<FilterItemComponentProps> = (props) => {
  const { filterItem, onChange, defaultSelectedOptions } = props;
  const [isFilterItemExpanded, setIsFilterItemExpanded] = useState(true);

  const handleOptionSelect = (value: string) => {
    let newSelectedOptions: string[];

    if (defaultSelectedOptions?.includes(value)) {
      newSelectedOptions = defaultSelectedOptions.filter((selectedOption) => selectedOption !== value);
    } else {
      newSelectedOptions = [...defaultSelectedOptions, value]
    }

    onChange(filterItem.key, newSelectedOptions)
  }

  const toggleFilterItemComponent = () => {
    setIsFilterItemExpanded((prev) => !prev)
  }


  return (
    <div className='filter-item'>
      <label  htmlFor={`filter-item-${filterItem.id}`} className='filter-toggle-section'>
          <div className={`filter-toggle-label ${isFilterItemExpanded ? 'active' : ''}`}>{filterItem.label}</div>
          <input type="button" id={`filter-item-${filterItem.id}`}  onClick={toggleFilterItemComponent} className='filter-toggle-btn'  value={isFilterItemExpanded ? '-' : '+'}/>
      </label>
      {
        isFilterItemExpanded ? <div className='options'>
          {filterItem.values.map((option) => {
            return <FilterItemOption key={option.value} option={option} onOptionSelect={handleOptionSelect} defaultSelected={defaultSelectedOptions?.includes(option.value)} />
          })}
        </div> : null
      }
    </div>
  )
}

export default FilterItemComponent