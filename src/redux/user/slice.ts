import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface userState {
    loading: boolean;
    error: string | null;
    tooken: string | null;
    // 模拟是否登录 tooken
    flag: boolean;

}

const initialState: userState = {
    loading: false,
    error: null,
    tooken: null,
    flag: false
};

// createAsyncThunk异步处理
export const signin = createAsyncThunk(
    'user/signin',
    async (parameters: {
        username: string,
        password: string
    }, thunkAPI) => {
        const { data } = await axios.post(`https://www.fastmock.site/mock/1ea9f73780777794e8f3e0cbd9113fbc/react_tour/api/user/login`, {
            username: parameters.username,
            password: parameters.password
        });

        // return data.data.tooken;
        return data.data;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    // reducer与action捆绑
    reducers: {
        logOut: (state) => {
            state.tooken = null;
            state.flag = false;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: {
        [signin.pending.type]: (state) => {
            state.loading = false;
            state.flag = false;
        },
        [signin.fulfilled.type]: (state, action) => {
            state.tooken = action.payload;
            state.flag = true;
            state.loading = false;
            state.error = null;
        },
        [signin.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.flag = false;
            state.error = action.payload;
        },
    }
})