import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const toDos = [
  {
    id: "clean-room",
    description: "Clean Room",
    dueDate: "8/5/16",
    completed: false
  },
  {
    id: "take-out-trash",
    description: "Take out Trash",
    dueDate: "8/14/16",
    completed: true
  },
  {
    id: "make-supper",
    description: "Make Supper",
    dueDate: "8/7/16",
    completed: false
  },
  {
    id: "buy-groceries",
    description: "Buy Groceries",
    dueDate: "7/27/16",
    completed: false
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (toDo) => {
  return replaceAll(toDo.description, ' ', '-');
};

class ToDoApi {
  static getAllToDos() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], toDos));
      }, delay);
    });
  }

  static saveToDo(toDo) {
    toDo = Object.assign({}, toDo); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minToDoDescLength = 1;
        if (toDo.description.length < minToDoDescLength) {
          reject(`Description must be at least ${minToDoDescLength} characters.`);
        }

        if (toDo.id) {
          const existingToDoIndex = toDos.findIndex(a => a.id == toDo.id);
          toDos.splice(existingToDoIndex, 1, toDo);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          toDo.id = generateId(toDo);
          toDos.push(toDo);
        }

        resolve(toDo);
      }, delay);
    });
  }

  static deleteToDo(toDoId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfToDoToDelete = toDos.findIndex(toDo => {
          toDo.id == toDoId;
        });
        toDos.splice(indexOfToDoToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default ToDoApi;
