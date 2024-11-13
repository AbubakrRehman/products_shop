import React, { useState } from 'react';
import "./Sidebar.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProductsRedux, setSelected } from '../../store/productSlice';
import FilterSort from '../FilterSort/FilterSort';
import { filterItems } from '../constants/constants';
import Filters from '../Filters/Filters';
import useClickOutside1 from '../../hooks/useClickOutside1';
import three_dot_icon from "../../icons/three-dot-icon.png"
import { expandSelected } from '../../utils';

type SelectedFilter = Record<string, string[]>

interface SidebarProps {
    selected: SelectedFilter;
    onApply: (selectedFilters: SelectedFilter)=> void
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const { selected, onApply } = props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleClose = () => {
        setIsSidebarOpen(false);
    }

    const toggle = () => {
        setIsSidebarOpen((prev) => !prev)
    }

    const handleApply = (selectedFilters: SelectedFilter) => {
        onApply(selectedFilters);
        handleClose();
    }

    const ref = useClickOutside1(handleClose);

    return (
        <div className='sidebar' ref={ref} onClick={(e) => e.stopPropagation()}>
            <button onClick={toggle} className='three-dot-icon'>
                <img src={three_dot_icon} alt="three_dot_icon" height="28px" width="28px"/>
                <div className='sidebar-btn-count'>{expandSelected(selected).length}</div>
                </button>
            {isSidebarOpen ?
                <Filters selected={selected} onApply={handleApply} onClose={handleClose}/> : null}
        </div>
    )
}

export default Sidebar