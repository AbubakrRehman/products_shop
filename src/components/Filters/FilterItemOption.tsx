import React, { useEffect } from 'react';


interface FilterOption {
    value: string;
    label: string
}
type Filters = Record<string, string[]>

interface FilterItemOptionProps {
    option: FilterOption;
    onOptionSelect: (filterValue: string) => void;
    defaultSelected: boolean
}

const FilterItemOption: React.FC<FilterItemOptionProps> = (props) => {
    const { option, onOptionSelect, defaultSelected } = props;

    return (
        <label className='option-item' htmlFor={`option_${option.value}`}>
            <input checked={defaultSelected} type="checkbox" id={`option_${option.value}`} onChange={() => onOptionSelect(option.value)} />
            <div >{option.label}</div>
        </label>
    )
}

export default FilterItemOption