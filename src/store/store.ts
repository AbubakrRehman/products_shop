import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import bookmarkSlice from './bookmarkSlice'

export const store = configureStore({
    reducer: {
        product: productSlice,
        bookmark: bookmarkSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch