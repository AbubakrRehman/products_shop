import React, { useEffect, useState } from 'react';
import type { Product, ProductColor } from '../Products/Products';
import "./ProductCard.css";
import ColorList from '../ColorList/ColorList';
import { getCurrencyFromCode, getSizeFromCode } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import filled_heart from "../../icons/filled-heart.png";
import outline_heart from "../../icons/outline-heart.png";
import { addBookmarkRedux, removeBookmarkRedux } from '../../store/bookmarkSlice';


type ProductCardProps = {
    productItem: Product;
    toggle: boolean
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const { productItem, toggle = true } = props;
    const { bookmarks } = useSelector((state: RootState) => state.bookmark);
    const dispatch = useDispatch<AppDispatch>();


    const addToBookmark = (id: number) => {
        dispatch(addBookmarkRedux({bookmarkId : id}))
    }

    const removeFromBookmark = (id: number) => {
        dispatch(removeBookmarkRedux({bookmarkId : id}))
    }


    return (
        <div className="product-card">
            <div className="product-image">
                <img src={productItem.image} alt="product_image" loading='lazy'/>
            </div>
            <div className="product-details">
                <div className="color-and-heart">
                    <div className="colors">
                        <ColorList productColorList={productItem.availableColors} />
                    </div>
                    <div className={`heart ${!toggle ? 'invisible' : ''}`}>
                        {
                            bookmarks.indexOf(productItem.id) !== -1 ?
                                <button className="filled-heart-btn" onClick={() => removeFromBookmark(productItem.id)}>
                                    <img width="30px" height="30px" src={filled_heart} alt="filled_heart" />
                                </button>
                                : <button className='outline-heart-btn' onClick={() => addToBookmark(productItem.id)}>
                                    <img width="30px" height="30px" src={outline_heart} alt="outline_heart" />
                                </button>

                        }
                    </div>
                </div>

                <div className="category-and-size">
                    <div className="category">{productItem.category}</div>
                    <div className="size">
                        {productItem.availableSizes.length == 1 ? getSizeFromCode(productItem.availableSizes[0].sizeCode) :
                            (getSizeFromCode(productItem.availableSizes[0].sizeCode) + "-" + getSizeFromCode(productItem.availableSizes[productItem.availableSizes.length - 1].sizeCode))}
                    </div>
                </div>
                <div className="product-title">{productItem.title}</div>
                <div className="product-price">{getCurrencyFromCode(productItem.price.currency)} {productItem.price.amount}</div>
                <div className="product-rating">
                    <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/star--v1.png" alt="star--v1" />
                    <div className="rating-value">{productItem.rating.rate}</div>
                    {productItem?.rating?.count ? <div className="rating-count"> ({productItem.rating.count})</div> : null}
                </div>
            </div>

        </div>
    )
}

export default ProductCard