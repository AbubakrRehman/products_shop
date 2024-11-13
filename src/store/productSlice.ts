import {  PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

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
    products: Product[];
    totalPageCount: number;
    totalItems: number;
    page: number
}


interface ProductState {
    products: Product[];
    page: number;
    totalItemsCount: number;
    totalPageCount: number;
    selected: Record<string, string[]>;
    sortBy: string;
    isLoading: boolean
}


const initialState: ProductState = {
    products: [],
    isLoading: false,
    page: 1,
    totalItemsCount: 0,
    totalPageCount: 0,
    selected: {},
    sortBy: ''
}

interface SetSelectedPayload {
    selected: Selected
}

interface SetSortByPayload {
    sortBy: string
}

interface IsLoadingPayload {
    isLoading: boolean
}





export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        nextPage: (state, payload) => {
            state.page = state.page + 1
        },
        setSelected: (state, action: PayloadAction<SetSelectedPayload>) => {
            state.selected = action.payload.selected
        },
        setSortBy: (state, action: PayloadAction<SetSortByPayload>) => {
            state.sortBy = action.payload.sortBy
        },
        setStatus: (state, action: PayloadAction<IsLoadingPayload>) => {
            state.isLoading = action.payload.isLoading
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsRedux.fulfilled, (state, action: PayloadAction<ProductPage>) => {
                state.page = action.payload.page;
                // state.products = action.payload.products;
                state.totalItemsCount = action.payload.totalItems;
                state.totalPageCount = action.payload.totalPageCount;
                state.isLoading = false;

                if (action.payload.page > 1) {
                    const tempProducts = action.payload.products;
                    const newProducts = [...state.products, ...tempProducts];
                    state.products = newProducts;
                } else {
                    state.products = action.payload.products;
                }
            })
            .addCase(fetchProductsRedux.pending, (state, action) => {
                state.isLoading = true;
            })
    }
})


const getProductsApi = (queryString?: string) => {

    return queryString ? axios.get<ProductPage>(`http://localhost:8002/api/public/v1/products?${queryString}`) :
        axios.get<ProductPage>(`http://localhost:8002/api/public/v1/products`)
}


type Selected = Record<string, string[]>
type SortBy = string

interface PaginatedAPIRequest {
    page: number;
    selected: Selected,
    sortBy: SortBy
}

const defaultPaginatedAPIRequest = {
    page: 1,
    selected: {},
    sortBy: ''
}

type urlParams = Record<string, number | Selected | SortBy>



export const fetchProductsRedux = createAsyncThunk("products/fetch", async (arg: PaginatedAPIRequest, thunkAPI?: any) => {

    const { page, selected, sortBy } = arg;
    let params: Record<string, string> = {}
    params = selected ? Object.keys(selected).reduce((acc, curr) => ({ ...acc, [curr]: selected[curr].join(",") }), {}) : {};

    let urlParams: Record<string, string> = {
        page: page.toString(),
        ...params
    }

    if (sortBy) {
        urlParams = { ...urlParams, sortBy: sortBy.toString() };
    }

    const queryString = new URLSearchParams(urlParams).toString();
    const products = await getProductsApi(queryString);

    thunkAPI.dispatch(setSelected({ selected: selected }))
    thunkAPI.dispatch(setSortBy({ sortBy: sortBy }))
    return products.data;
})


export const { setSelected, setSortBy } = productSlice.actions

export default productSlice.reducer