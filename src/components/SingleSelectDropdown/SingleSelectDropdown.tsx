import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import "./SingleSelectDropdown.css";
import down_icon from "../../icons/dropdown-icon.png";
import tick_icon from "../../icons/tick-icon.png"
import useClickOutside1 from '../../hooks/useClickOutside1';

interface Option {
    value: string;
    label: string
}

type SelectedOption = Record<string, boolean>

interface DropdownProps {
    label: string;
    options: Option[];
    sortByKey: string;
    onOptionSelect: (key: string, selectedOption: string) => void
}

const SingleSelectDropdown: React.FC<DropdownProps> = (props) => {

    const { options, onOptionSelect, sortByKey, label } = props
    const optionsRef = useRef(null);
    const firstRender = useRef(true);
    const [isDropdowOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectedOption>(options.reduce((acc, curr) => ({ ...acc, [curr.value]: false }), {}))

    const handleOptionSelection = (e: React.ChangeEvent<HTMLInputElement>, option: Option) => {
        setSelectedOption((prev) => ({ ...options.reduce((acc, curr) => ({ ...acc, [curr.value]: false }), {}), [option.value]: e.target.checked }))
    }

    useEffect(() => {

        if(firstRender.current) {
            firstRender.current = false;
            return 
        }
        const selectedOptionValue = Object.keys(selectedOption).filter((selectedOptionKey) => selectedOption[selectedOptionKey])[0]
        onOptionSelect(sortByKey, selectedOptionValue)
    }, [selectedOption])



    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            if (!(e.target instanceof HTMLElement)) return;
            // if (e.target !== optionsRef.current && !e.target.dataset['sortbtn']) setIsDropdownOpen(false)
            if (e.target !== optionsRef.current) setIsDropdownOpen(false)
        }

        document.addEventListener("click", clickHandler, false)
        return () => document.removeEventListener("click", clickHandler, false)

    }, [])


    return (
        <div className='single-select dropdown' ref={optionsRef}>
            <div data-sortbtn className="dropdown-btn" onClick={(e) => {
                setIsDropdownOpen((prev) => !prev)
                e.stopPropagation()
            }}>
                <div className='btn-label' data-sortbtn>{label}</div>
                <img data-sortbtn src={down_icon} alt="down_icon" width="15px" height="15px" />

            </div>

            {isDropdowOpen ?
                <div className='options' onClick={(e) => e.stopPropagation()}>
                    {
                        options.map((option) => {
                            return <div className={`option ${selectedOption[option.value] ? 'active' : ''}`} key={option.value} >
                                <input className="option-checkbox" onChange={(e) => handleOptionSelection(e, option)} type="checkbox" id={`option_item_${option.value}`} checked={selectedOption[option.value]} />
                                <label htmlFor={`option_item_${option.value}`}>{option.label}</label>
                                {selectedOption[option.value] ? <img src={tick_icon} alt="tick_icon" height="20px" /> : null}
                            </div>
                        })
                    }

                </div>
                : null
            }
        </div>
    )
}

export default SingleSelectDropdown