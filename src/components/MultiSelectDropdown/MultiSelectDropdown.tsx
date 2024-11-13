import React, {  useState } from 'react';
import "./MultiSelectDropdown.css";
import cross_icon from "../../icons/cross-icon.png";
import down_icon from "../../icons/dropdown-icon.png"
import up_icon from "../../icons/up.png"
import useClickOutside1 from '../../hooks/useClickOutside1';
import {filtersMap} from "../../utils/index"

interface Option {
    value: string;
    label: string
}

type SelectedOptions = string[]

interface DropdownProps {
    label: string;
    options: Option[];
    keyy: string;
    defaultSelectedOptions: string[];
    onOptionSelect: (key: string, selectedOptions: string[]) => void
}

const Dropdown: React.FC<DropdownProps> = (props) => {

    const { options, onOptionSelect, keyy, label, defaultSelectedOptions: selectedOptions = [] } = props
    const [isDropdowOpen, setIsDropdownOpen] = useState(false);

    const handleOptionSelection = (e: React.ChangeEvent<HTMLInputElement>, option: Option) => {
        let newSeletedOptions: string[] = [];
        if (e.target.checked) {
            newSeletedOptions = [...selectedOptions, option.value];
        } else {
            newSeletedOptions = selectedOptions.filter((selectedOption) => {
                return selectedOption !== option.value
            })
        }
        onOptionSelect(keyy, newSeletedOptions)
    }

    const handleClose = () => {
        setIsDropdownOpen(false)
    }

    const ref = useClickOutside1(handleClose);

    const toggle = () => {
        setIsDropdownOpen((prev) => !prev)
    }

    const getSelectedOptions = (selectedOptions: string[]) => {
        return selectedOptions.join(",")
    }

    return (
        <div className='multi-select dropdown' ref={ref}>
            <button className={`dropdown-btn ${isDropdowOpen ? 'active' : ''} ${selectedOptions.length > 0 ? 'active-filters-dropdown active' : ''}`} onClick={toggle} >
                <div data-filterbtn>
                    {selectedOptions.length === 0 ? <div data-filterbtn className='btn-label'>{label} </div>
                       : filtersMap[keyy](selectedOptions)
                    }
                </div>

                {!isDropdowOpen ? <img data-filterbtn src={down_icon} alt="down_icon" width="15px" height="15px" /> :
                <img data-filterbtn src={up_icon} alt="down_icon" width="15px" height="15px" /> }

            </button>

            {isDropdowOpen ?
                <div className='dropdown-board'>
                    <div className='dropdown-label'>{label}</div>
                    <button className="cross-icon" onClick={handleClose}>
                        <img src={cross_icon} alt="cross_icon" width="20px" height="20px" />
                    </button>
                    <div className='options' onClick={(e) => e.stopPropagation()}>
                        {
                            options.map((option) => {
                                return <div className="option" key={option.value} >
                                    <input onChange={(e) => handleOptionSelection(e, option)} type="checkbox" id={`option_item_${option.value}`} checked={selectedOptions.includes(option.value)} />
                                    <label htmlFor={`option_item_${option.value}`}>{option.label}</label>
                                </div>
                            })
                        }

                    </div>
                </div> : null
            }
        </div>
    )
}

export default Dropdown