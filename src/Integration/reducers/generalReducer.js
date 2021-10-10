/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import createReducer from './createReducer';
const initialState = {
  Loading: [],
  data: [],
  Errors: []
};

export const generalReducer = createReducer(initialState, {

  ['ENABLE_LOADER'](state, action) {
    return {
      ...state,
      Loading: { ...state.Loading, [action.apiType]: true },
    };
  },

  ['DISABLE_LOADER'](state, action) {
    return { ...state, Loading: { ...state.Loading, [action.apiType]: false } };
  },

  ['SAVE_GENERAL_REDUCER'](state, action) {
    return {
      ...state,
      data: {
        ...state.data,
        [action.reducerVariable]: action.payload,
      },
    };
  },
  ['CLEAR_GENERAL_REDUCER'](state, action) {
    return {
      ...state,
      data: [],
      Loading: []
    };
  },
  ['SAVE_ERORR'](state, action) {
    return {
      ...state,
      Errors: {
        ...state.Errors,
        [action.Name]: action.Error
      },
    };
  },
  ['CLEAR_ERORR'](state) {
    return {
      ...state,
      Errors: [],
    };
  },
});
