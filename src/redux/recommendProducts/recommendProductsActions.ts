import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START'; //正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'FETCH_RECOMMEND_PRODUCTS_SUCCESS';//推荐信息api调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL'; //推荐信息api调用失败

interface FetchRecommendProductsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}
interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any
}

export type RecommendProductsAction = FetchRecommendProductsFailAction | FetchRecommendProductsStartAction | FetchRecommendProductsSuccessAction;

export const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}

export const fetchRecommendProductsSuccessActionCreator = (data): FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}

export const fetchRecommendProductsFailActionCreator = (error): FetchRecommendProductsFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
}


// thunk 可以返回一个函数，而不一定是js对象
// 在一个thunk action中可以完成一些列连续的action操作
// 并且可以处理异步逻辑
// 业务逻辑可以从ui层面挪到这里，代码分层会更清晰
export const giveMeDataActionCreator = (): ThunkAction<void, RootState, unknown, RecommendProductsAction> => async (dispatch, getState) => {
    dispatch(fetchRecommendProductsStartActionCreator());
    try {
        const { data } = await axios.get('https://www.fastmock.site/mock/1ea9f73780777794e8f3e0cbd9113fbc/react_tour/api/productCollections');

        dispatch(fetchRecommendProductsSuccessActionCreator(data.data));
    } catch (error: any) {
        dispatch(fetchRecommendProductsFailActionCreator(error));
    }
}