import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCarttate {
    loading: boolean;
    error: string | null;
    items: any[];
}

const initialState: ShoppingCarttate = {
    loading: true,
    error: null,
    items: [],
};

export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    // async (jwt: string, thunkAPI) => {
    //     const { data } = await axios.get(
    //         `https://www.fastmock.site/mock/1ea9f73780777794e8f3e0cbd9113fbc/react_tour/api/shoppingCart`,
    //         {
    //             headers: {
    //                 Authorization: `bearer ${jwt}`,
    //             },
    //         }
    //     );
    //     return data.data;
    // }
    async (thunkAPI) => {
        const { data } = await axios.get(
            `https://www.fastmock.site/mock/1ea9f73780777794e8f3e0cbd9113fbc/react_tour/api/shoppingCart`);
        return data.data;
    }
);

// 接口不完善，不实现以下功能

export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: { jwt: string; touristRouteId: string }, thunkAPI) => {
        const { data } = await axios.post(
            `https://www.fastmock.site/mock/1ea9f73780777794e8f3e0cbd9113fbc/react_tour/api/shoppingCart/items`,
            {
                touristRouteId: parameters.touristRouteId,
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                },
            }
        );
        return data.shoppingCartItems;
    }
);


export const checkout = createAsyncThunk(
    "shoppingCart/checkout",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/api/shoppingCart/checkout`,
            null,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                },
            }
        );
        return data;
    }
);

export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters: { jwt: string; itemIds: number[] }, thunkAPI) => {
        return await axios.delete(
            `https://www.fastmock.site/mock/1ea9f73780777794e8f3e0cbd9113fbc/react_tour/api/shoppingCart/items/(${parameters.itemIds.join(
                ","
            )})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                },
            }
        );
    }
);

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: {
        [getShoppingCart.pending.type]: (state) => {
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getShoppingCart.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },

        [addShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        [addShoppingCartItem.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
        [clearShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [clearShoppingCartItem.fulfilled.type]: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        [clearShoppingCartItem.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
        [checkout.pending.type]: (state) => {
            state.loading = true;
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        [checkout.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
