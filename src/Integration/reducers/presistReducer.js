/* Login Reducer
 * handles login states in the app
 */
import createReducer from './createReducer';

const initialState = {
  data: [],
};

export const presistReducer = createReducer(initialState, {

  ['SAVE_PRESIST_REDUCER'](state, action) {
    return {
      ...state,
      data: {
        ...state.data,
        [action.reducerVariable]: action.payload,
      }
    };
  },


  ['CLEAR_PRESIST_REDUCER'](state) {
    return {
      ...state,
      data: [],
      OneSignal: null
    };
  },
});
