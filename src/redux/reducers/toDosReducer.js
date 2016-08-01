import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function(state = initialState.toDos, action) {
  switch(action.type) {
    case types.LOAD_TODOS_SUCCESS:
      return action.toDos;

    case types.ADD_TODO_SUCCESS:
      return [...state,
        action.toDo];

    case types.EDIT_TODO_SUCCESS:
      return [...state.filter(toDo => {
        return toDo.id !== action.toDo.id;
      }), action.toDo];

    default:
      return state;
  }
}
