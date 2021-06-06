import { combineReducers } from 'redux';

const INITIAL_STATE_FORM = {
    name: '',
    preparation_time: undefined,
    type: 'pizza',
    no_of_slices: undefined,
    diameter: undefined,
    spiciness_scale: 1,
    slices_of_bread: undefined
};

const INITIAL_STATE_RESPONSE = [];

const dishReducer = (state = INITIAL_STATE_FORM, action) => {
    switch (action.type) {
        case 'DISH_NAME': return {...state, name: action.text};
        case 'DISH_PREPARATION_TIME': return {...state, preparation_time: action.time};
        case 'DISH_TYPE': return {...state, type: action.option};
        case 'DISH_NO_SLICES': return {...state, no_of_slices: action.number};
        case 'DISH_DIAMETER': return {...state, diameter: action.number};
        case 'DISH_SPICINESS_SCALE': return {...state, spiciness_scale: action.range};
        case 'DISH_NO_BREAD': return {...state, slices_of_bread: action.number};
        default: return state
    };
};

const responseReducer = (state = INITIAL_STATE_RESPONSE, action) => {
    switch (action.type) {
        case 'RESPONSE_SUCCESS': return [...state, action.response];
        case 'RESPONSE_ERROR': return [...state, action.response];
        default: return state
    };
};

export const rootReducer = combineReducers({dishReducer, responseReducer});