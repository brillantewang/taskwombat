import React from 'react';
import { TaskCategories } from './task_categories';

class TaskSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.toggleInputCanceler = this.toggleInputCanceler.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState(
      { text: "" },
      this.toggleInputCanceler
    )
  }

  toggleInputCanceler() {
    const inputCanceler = document.getElementById("input-canceler");
    if (this.state.text === "") {
      inputCanceler.classList.add("hidden");
    } else {
      inputCanceler.classList.remove("hidden");
    }
  }

  handleChange(e) {
    this.setState(
      { text: e.target.value },
      this.toggleInputCanceler
    );
  }

  render() {
    return (
      <div className="task-search-container">
        <i className="fa fa-search" aria-hidden="true"></i>
        <input className="task-search search" type="text" value={this.state.text} onChange={this.handleChange} placeholder="Need something different?"/>
        <i onClick={this.resetState} id="input-canceler" className="fa fa-times-circle hidden" aria-hidden="true"></i>
        <TaskCategories text={this.state.text}/>
      </div>
    )
  }
}

export default TaskSearch;
