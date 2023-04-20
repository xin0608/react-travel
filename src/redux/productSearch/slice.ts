import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface ProductSearchState {
    loading: boolean;
    error: string | null;
    data: any;
    // pagination: any;
}

const initialState: ProductSearchState = {
    loading: true,
    error: null,
    data: null,
    // pagination: null,
};

// createAsyncThunk异步处理
export const searchProduct = createAsyncThunk(
    'productSearch/searchProduct',
    async (parameters: {
        keywords: string;
        // nextPage: number | string;
        // pageSize: number | string;
    }, thunkAPI) => {
        // let url = `https://www.fastmock.site/mock/1ea9f73780777794e8f3e0cbd9113fbc/react_tour/api/search?pageNumber=${parameters.nextPage}&pageSize=${parameters.pageSize}`;
        let url = `https://www.fastmock.site/mock/1ea9f73780777794e8f3e0cbd9113fbc/react_tour/api/search/`;

        if (parameters.keywords) {
            url += `keyword=${parameters.keywords}`;
        }
        const response = await axios.get(url);
        return {
            data: response.data.data,
            // pagination: JSON.parse(response.headers['x-pagination'])
        };

    }
)

export const ProductSearchSlice = createSlice({
    name: 'productSearch',
    initialState,
    // reducer与action捆绑
    reducers: {},
    extraReducers: {
        [searchProduct.pending.type]: (state) => {
            state.loading = true;
        },
        [searchProduct.fulfilled.type]: (state, action) => {
            state.data = action.payload.data;
            // state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
        },
        [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})