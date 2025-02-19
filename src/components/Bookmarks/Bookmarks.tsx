import axios, { AxiosResponse } from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import "./Bookmarks.css"
import Pagination from '../Pagination/Pagination';
import FilterSort from '../FilterSort/FilterSort';
import { filterItems, sortByItems } from '../constants/constants';
import SingleSelectDropdown from '../SingleSelectDropdown/SingleSelectDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProductsRedux, setSelected } from '../../store/productSlice';
import { fetchBookmarksRedux, fetchBookmarksWithDetailsRedux } from '../../store/bookmarkSlice';
import outline_heart from "../../icons/outline-heart.png";
import Sidebar from '../Sidebar/Sidebar';
import Select from 'react-select/dist/declarations/src/Select';
import Filters from '../Filters/Filters';

interface ProductRating {
    rate: number;
    count: number
}

interface ProductPrice {
    amount: number;
    currency: string
}

export interface ProductColor {
    colorCode: string;
    colorName: string
}

interface ProductSize {
    sizeCode: string;
    sizeName: string;
    stockStatus: string;
}


export interface Product {
    id: number;
    title: string;
    price: ProductPrice;
    description: string;
    category: string;
    image: string;
    rating: ProductRating;
    availableColors: ProductColor[];
    availableSizes: ProductSize[]
}

export interface ProductPage {
    products: Product[],
    totalPageCount: number,
    totalItems: number,
    page: number
}

type Selected = Record<string, string[]>

function Bookmarks() {

    const { bookmarksWithDetails, page, totalPageCount, totalItemsCount, selected, sortBy } = useSelector((state: RootState) => state.bookmark);
    const dispatch = useDispatch<AppDispatch>();

    const nextButtonClick = () => {
        dispatch(fetchBookmarksWithDetailsRedux({ page: page + 1, selected, sortBy }))
    }

    useEffect(() => {
        dispatch(fetchBookmarksWithDetailsRedux({ page, selected, sortBy }))
    }, [])


    const handleSelectChange = (key: string, selectedOption: string) => {
        dispatch(fetchBookmarksWithDetailsRedux({ page: 1, selected, sortBy: selectedOption }))
    }


    function handleFilterChange(selected: Selected) {
        dispatch(fetchBookmarksWithDetailsRedux({ page: 1, selected, sortBy }))
    }

    const handleApply = (selectedFilters: Selected) => {
        dispatch(fetchBookmarksWithDetailsRedux({ page: 1, selected: selectedFilters, sortBy }))
    }

    return (
        <div className='products-page'>
            <div className="product-page-header">
                <div className="filter-wrapper">
                    <Sidebar selected={selected} onApply={handleApply} />
                    <FilterSort filterItems={filterItems} onChange={handleFilterChange} defaultSelected={selected} />
                </div>

                <div className='items-count-n-sort-by-dropdown'>
                    <div className='items-count'>
                        {totalItemsCount} Item(s)
                    </div>
                    <div className='sort-by-dropdown'>
                        {sortByItems.map((sortByItem) => {
                            return <SingleSelectDropdown key={sortByItem.id} label={sortByItem.label} sortByKey={sortByItem.key} options={sortByItem.values} onOptionSelect={handleSelectChange} />
                        })}
                    </div>
                </div>
            </div>


            <div className="products-page-main">
                <div className='products'>
                    {bookmarksWithDetails?.map((bookmarkDetailsItem) => {
                        return <div className='product-item' key={bookmarkDetailsItem.id}>
                            <ProductCard productItem={bookmarkDetailsItem} toggle={false}/>
                        </div>
                    })}
                </div>
                <Pagination page={page} totalPageCount={totalPageCount} nextButtonClick={nextButtonClick} />
            </div>
        </div>
    )
}

export default Bookmarks