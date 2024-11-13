import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
interface AddBookmarkPayload {
    bookmarkId: number
}

interface RemoveBookmarkPayload {
    bookmarkId: number
}


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

interface BookmarkState {
    bookmarksWithDetails: Product[];
    page: number;
    totalItemsCount: number;
    totalPageCount: number;
    selected: Record<string, string[]>;
    sortBy: string;
    bookmarks: number[]
}

interface BookmarkItem {
    bookmarkId: number
}

const initialState: BookmarkState = {
    bookmarks: [],
    bookmarksWithDetails: [],
    page: 1,
    totalItemsCount: 0,
    totalPageCount: 0,
    selected: {},
    sortBy: ''
}

export interface BookmarkPage {
    bookmarksWithDetails: Product[];
    totalPageCount: number;
    totalItems: number;
    page: number
}

type Selected = Record<string, string[]>

interface SetSelectedPayload {
    selected: Selected
}

interface SetSortByPayload {
    sortBy: string
}

export const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {
        setBookmarks: (state, action) => {
            state.bookmarks = action.payload.bookmarks
        },
        addToBookmark: (state, action) => {
            state.bookmarks.push(action.payload.bookmarkId)
        },
        removeFromBookmark: (state, action) => {
            state.bookmarks = state.bookmarks.filter((item) => item !== action.payload.bookmarkId)
        },
        setSelected: (state, action: PayloadAction<SetSelectedPayload>) => {
            state.selected = action.payload.selected
        },
        setSortBy: (state, action: PayloadAction<SetSortByPayload>) => {
            state.sortBy = action.payload.sortBy
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookmarksRedux.fulfilled, (state, action: PayloadAction<BookmarkState>) => {
                state.bookmarks = action.payload.bookmarks;
            })
            .addCase(fetchBookmarksRedux.pending, (state, action) => {
                // console.log("action product, pending state");
            }).addCase(fetchBookmarksRedux.rejected, (state, action) => {
                
            })
        builder
            .addCase(addBookmarkRedux.fulfilled, (state, action: PayloadAction<AddBookmarkPayload>) => {
                state.bookmarks.push(action.payload.bookmarkId);
            })
            .addCase(addBookmarkRedux.pending, (state, action) => {
                // console.log("action product, pending state");
            })
        builder
            .addCase(removeBookmarkRedux.fulfilled, (state, action: PayloadAction<RemoveBookmarkPayload>) => {
                state.bookmarks = state.bookmarks.filter((item) => item !== action.payload.bookmarkId)
            })
            .addCase(removeBookmarkRedux.pending, (state, action) => {
                // console.log("action product, pending state");
            })
        builder
            .addCase(fetchBookmarksWithDetailsRedux.fulfilled, (state, action: PayloadAction<BookmarkPage>) => {
                state.page = action.payload.page;
                state.totalItemsCount = action.payload.totalItems;
                state.totalPageCount = action.payload.totalPageCount;
                
                if (action.payload.page > 1) {
                    const tempBookmarksWithDetails = action.payload.bookmarksWithDetails;
                    const newBookmarksWithDetails = [...state.bookmarksWithDetails, ...tempBookmarksWithDetails];
                    state.bookmarksWithDetails = newBookmarksWithDetails;
                } else {
                    state.bookmarksWithDetails = action.payload.bookmarksWithDetails;
                }
            })
            .addCase(fetchBookmarksWithDetailsRedux.pending, (state, action) => {
            })
    }
})



const getBookmarksWithDetailsApi = (queryString?: string) => {
    return queryString ? axios.get<BookmarkPage>(`http://localhost:8002/api/public/v1/bookmarks/with-details?${queryString}`) :
        axios.get<BookmarkPage>(`http://localhost:8002/api/public/v1/bookmarks/with-details`)
}

const getBookmarksApi = () => {
    return axios.get<BookmarkState>(`http://localhost:8002/api/public/v1/bookmarks`)
}

const addBookmarkApi = (id: number) => {
    return axios.post<BookmarkItem>(`http://localhost:8002/api/public/v1/bookmarks/${id}`)
}

const removeBookmarkApi = (id: number) => {
    return axios.delete<BookmarkItem>(`http://localhost:8002/api/public/v1/bookmarks/${id}`)
}

interface AddBookmarkRequest {
    bookmarkId: number
}
type SortBy = string

interface PaginatedAPIRequest {
    page: number;
    selected: Selected,
    sortBy: SortBy
}

export const fetchBookmarksWithDetailsRedux = createAsyncThunk("bookmarks/fetchWithDetails", async (arg: PaginatedAPIRequest, thunkAPI?: any) => {
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
    const bookmarksWithDetail = await getBookmarksWithDetailsApi(queryString);
    thunkAPI.dispatch(setSelected({ selected: selected }))
    thunkAPI.dispatch(setSortBy({ sortBy: sortBy }))
    return bookmarksWithDetail.data;
})

export const fetchBookmarksRedux = createAsyncThunk("bookmarks/fetch", async () => {
    const result = await getBookmarksApi();
    return result.data;
})

export const addBookmarkRedux = createAsyncThunk("bookmarks/add", async (arg: AddBookmarkRequest) => {
    const { bookmarkId } = arg;
    const result = await addBookmarkApi(bookmarkId);
    return result.data;
})

export const removeBookmarkRedux = createAsyncThunk("bookmarks/remove", async (arg: AddBookmarkRequest) => {
    const { bookmarkId } = arg;
    const result = await removeBookmarkApi(bookmarkId);
    return result.data;
})


export const { addToBookmark, setBookmarks, removeFromBookmark, setSelected, setSortBy } = bookmarkSlice.actions

export default bookmarkSlice.reducer