/*
 * combines all th existing reducers
 */
import * as presistReducer from './presistReducer';
import * as generalReducer from './generalReducer';
export default Object.assign(presistReducer, generalReducer);
