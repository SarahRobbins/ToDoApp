import {combineReducers} from 'redux';
import toDosReducer from './toDosReducer';

const rootReducer =  combineReducers({
  toDos: toDosReducer
});

export default rootReducer;
