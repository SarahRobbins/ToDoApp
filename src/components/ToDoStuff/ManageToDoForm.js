import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as toDoActions from '../../redux/actions/toDoActions';

class ManageToDoForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      toDo: {description: '', dueDate: '', completed: false},
      hidden: this.props.hidden,
      toDoId: this.props.toDoId
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps){
    let toDo = {description: '', dueDate: '', completed: false};
    console.log(nextProps.toDoId);
    if(nextProps.toDoId) {
      toDo = this.getToDoById(nextProps.toDoId, this.props.toDoList);
    }
    this.setState({
      hidden: nextProps.hidden,
      toDoId: nextProps.toDoId,
      toDo: toDo
    });
  }

  getToDoById(toDoId, toDoList) {
    const toDos = toDoList.filter(toDo => {
      return toDo.id === toDoId;
    });
    return toDos[0];
  }

  onChangeText(event){
    const field = event.target.name;
    const value = event.target.value;
    let toDo = this.state.toDo;
    toDo[field] = value;
    this.setState({
      toDo: toDo
    });
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.saveToDo(this.state.toDo);
    this.setState({
      hidden: false,
      toDo: {description: '', dueDate: '', id: '', completed: false}
    });
  }

  render() {
    return (
      <div className={"well " + this.state.hidden}>
        <input
          type="text"
          name="description"
          className="form-control"
          placeholder="Task description"
          value={this.state.toDo.description}
          onChange={this.onChangeText}/>
        <br />
        <input
          type="text"
          name="dueDate"
          className="form-control"
          placeholder="Due date - mm/dd/yy"
          value={this.state.toDo.dueDate}
          onChange={this.onChangeText}/>
        <br />
        <input
          type="checkbox"
          name="completed"
          checked={this.state.toDo.completed}
          value={this.checked}
          onChange={this.onChangeText}/> Completed
        <br />
        <br />
        <button className="btn btn-warning" onClick={this.onSave} >Add ToDo</button>
      </div>
    );
  }
}

ManageToDoForm.propTypes = {
  toDoId: PropTypes.string,
  toDo: PropTypes.object.isRequired,
  hidden: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  toDoList: PropTypes.array.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    toDoList: state.toDos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(toDoActions, dispatch)
  };
}

export default connect(mapDispatchToProps)(ManageToDoForm);
