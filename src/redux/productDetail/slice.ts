import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null
};

// createAsyncThunk异步处理
export const getProductDetail = createAsyncThunk(
    'productDetail/getProductDetail',
    async (touristRouteId: string, thunkAPI) => {
        const { data } = await axios.get(`https://www.fastmock.site/mock/1ea9f73780777794e8f3e0cbd9113fbc/react_tour/api/detail/${touristRouteId}`);
        return data.data;
    }
)

export const ProductDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    // reducer与action捆绑
    reducers: {
        // fetchStart: (state) => {
        //     // immer
        //     state.loading = true;
        // },
        // fetchSuccess: (state, action) => {
        //     state.data = action.payload;
        //     state.loading = false;
        //     state.error = null;
        // },
        // fetchFail: (state, action: PayloadAction<string | null>) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // }
    },
    extraReducers: {
        [getProductDetail.pending.type]: (state) => {
            state.loading = true;
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})