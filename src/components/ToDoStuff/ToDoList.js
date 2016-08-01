import React, {PropTypes} from 'react';

const ToDoList = ({toDos, editClick}) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Task Description</th>
          <th>Due Date</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {toDos.map(toDo => {
          return (
            <tr key={toDo.id}>
              <td>{toDo.description}</td>
              <td>{toDo.dueDate}</td>
              <td><input type="checkbox" checked={toDo.completed} /></td>
              <td><button className="btn btn-success" onClick={editClick} id={toDo.id}>Edit</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

ToDoList.propTypes = {
  toDos: PropTypes.array.isRequired,
  editClick: PropTypes.func.isRequired
};

export default ToDoList;
