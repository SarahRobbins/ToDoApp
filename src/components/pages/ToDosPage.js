import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as toDoActions from '../../redux/actions/toDoActions';
import ToDoList from '../ToDoStuff/ToDoList';
import * as queryTypes from '../../api/queryTypes';
import ManageToDoForm from '../ToDoStuff/ManageToDoForm';

class ToDosPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      toDos: this.props.toDos,
      hideAddForm: true,
      toDoId: ''
    };

    this.toggleAdd = this.toggleAdd.bind(this);
    this.editClick = this.editClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      toDos: nextProps.toDos,
      todoId: nextProps.toDoId,
      hideAddForm: nextProps.hideAddForm
    });
  }

  toggleAdd(){
    this.setState({
      hideAddForm: !this.state.hideAddForm
    });
  }

  editClick(event){
    event.preventDefault();
    this.setState({
      toDoId: event.target.id,
      hideAddForm: !this.state.hideAddForm
    });
  }

  render() {
    return (
      <div>
        <nav>
          <IndexLink to="/toDos/outstanding" activeClassName="active">Outstanding</IndexLink>
          {" | "}
          <Link to="/toDos/overdue" activeClassName="active">Overdue</Link>
          {" | "}
          <Link to="/toDos/completed" activeClassName="active">Completed</Link>
          {" | "}
          <Link to="/toDos/all" activeClassName="active">All</Link>
        </nav>

        <ToDoList toDos={this.state.toDos} editClick={this.editClick}/>

        <button className="btn btn-primary" onClick={this.toggleAdd}>New Task -></button>
        <ManageToDoForm hidden={this.state.hideAddForm ? "hidden" : ""} todoId={this.state.toDoId}/>
      </div>
    );
  }
}

ToDosPage.propTypes = {
  toDos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function filterToDosByQuery(toDoList, query) {
  switch(query) {
    case queryTypes.OUTSTANDING:
      return toDoList.filter(toDo => {
        return !toDo.completed && Date.parse(toDo.dueDate) > Date.now();
      });
    case queryTypes.COMPLETED:
      return toDoList.filter(toDo => {
        return toDo.completed;
      });
    case queryTypes.OVERDUE:
      return toDoList.filter(toDo => {
        return !toDo.completed && Date.parse(toDo.dueDate) < Date.now();
      });
    default:
      return toDoList;
  }
}

function mapStateToProps(state, ownProps) {
  const query = ownProps.params.query;
  let toDoList = state.toDos;

  if(query && (query != queryTypes.ALL))
  {
    toDoList = filterToDosByQuery(toDoList, query);
  }

  return {
    toDos: toDoList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(toDoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDosPage);
