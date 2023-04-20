import i18n from "../../i18n/configs";
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from './languageActions';

export interface LanguageState {
    language: 'en' | 'zh';
    languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
    language: "zh",
    languageList: [
        { name: '中文', code: 'zh' },
        { name: 'English', code: 'en' }
    ]
}


const languageReducer = (state = defaultState, action: LanguageActionTypes) => {
    // console.log(state, action);

    // state只读，不能直接修改，需要创建新的state
    switch (action.type) {
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload); //存在副作用
            return { ...state, language: action.payload };
        case ADD_LANGUAGE:
            return {
                ...state, languageList: [...state.languageList, action.payload]
            };
        default:
            return state;
    }
};

export default languageReducer;