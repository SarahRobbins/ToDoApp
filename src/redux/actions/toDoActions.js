import * as types from './actionTypes';
import ToDoApi from '../../api/toDoApi';

function loadToDosSuccess(toDos) {
  return {type: types.LOAD_TODOS_SUCCESS, toDos};
}

function addToDoSuccess(toDo) {
  return {type: types.ADD_TODO_SUCCESS, toDo};
}

function editToDoSuccess(toDo) {
  return {type: types.EDIT_TODO_SUCCESS, toDo};
}

export function loadToDos() {
  return function(dispatch) {
    ToDoApi.getAllToDos().then(toDos => {
      dispatch(loadToDosSuccess(toDos));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveToDo(toDo) {
  return function(dispatch) {
    ToDoApi.saveToDo(toDo).then(savedToDo => {
      toDo.id ? dispatch(addToDoSuccess(savedToDo))
        : dispatch(editToDoSuccess(savedToDo));
    }).catch(error => {
      throw(error);
    });
  };
}
