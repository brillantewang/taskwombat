import React from 'react';
import Modal from 'react-modal';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import SessionFormModalContainer from './session_form_modal_container';

class PickTaskerForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      taskers: this.props.availableTaskersByRecommended,
      modalIsOpen: false
    };
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  loading() {
    return this.state.taskers.length === 0
  }

  componentWillReceiveProps(nextProps) {
    if (this.loading()) return;
    if (nextProps.availableTaskers !== this.props.availableTaskers) {
      const sortInput = document.getElementById("sort");
      switch(sortInput.value) {
        case "Highest Rating":
          this.setState({
            taskers: nextProps.availableTaskersByHighestRating
          })
          break;
        case "Price (Lowest To Highest)":
          this.setState({
            taskers: nextProps.availableTaskersByLowestPrice
          })
          break;
        case "Price (Highest To Lowest)":
          this.setState({
            taskers: nextProps.availableTaskersByHighestPrice
          })
          break;
        case "Most Reviews":
          this.setState({
            taskers: nextProps.availableTaskersByMostReviews
          })
          break;
        case "Number Of Tasks":
          this.setState({
            taskers: nextProps.availableTaskersByMostTasks
          })
          break;
        case "Recommended":
          this.setState({
            taskers: nextProps.availableTaskersByRecommended
          })
          break;
        default:
          this.setState({
            taskers: nextProps.availableTaskers
          })
      }
    }
  }

  componentDidMount() {
    this.props.reloadTask();

    this.props.fetchAllUsers().then(() => {
      this.setState({
        taskers: this.sortedTaskers("Recommended")
      })
    })
  }

  onChange(type) {
    return e => {
      if (type === 'date') {
        this.props.handleChange('date')(e);
      } else if (type === 'task_time') {
        this.props.handleChange('task_time')(e);
      } else if (type === 'sort') {
        this.setState({
          taskers: this.sortedTaskers(e.target.value)
        })
      }
    }
  }

  sortedTaskers(sortValue) {
    switch(sortValue) {
      case "Highest Rating":
        return this.props.availableTaskersByHighestRating;
      case "Price (Lowest To Highest)":
        return this.props.availableTaskersByLowestPrice;
      case "Price (Highest To Lowest)":
        return this.props.availableTaskersByHighestPrice;
      case "Most Reviews":
        return this.props.availableTaskersByMostReviews;
      case "Number Of Tasks":
        return this.props.availableTaskersByMostTasks;
      case "Recommended":
        return this.props.availableTaskersByRecommended;
      default:
        return this.props.availableTaskers;
    }
  }

  handleSubmit(taskerId) {
    return e => {
      e.preventDefault();
      this.props.setState({ tasker_id: taskerId }, () => {
        this.props.updateTask(this.props.state);
        if (this.props.state.user_id) {
          this.props.history.push('/task-form/confirm');
        } else {
          Modal.setAppElement(".task-form");
          this.openModal();
        }
      });
    }
  }

  render() {
    if (this.loading() === false) {
      return (
        <div className="pick-tasker-form task-form-subform">
          <h2>Pick a Tasker</h2>
          <h3>After booking, you can chat with your Tasker, agree on an exact time, or go over any requirements or questions, if necessary.</h3>
          <div className="pick-tasker-form-content">
            <div className="date-time-picker-container">
              <div className="date-time-picker">
                <strong>SORTED BY:</strong>
                <select id="sort" onChange={this.onChange('sort')}>
                  <option value="Recommended">Recommended</option>
                  <option value="Price (Lowest To Highest)">Price (Lowest To Highest)</option>
                  <option value="Price (Highest To Lowest)">Price (Highest To Lowest)</option>
                  <option value="Highest Rating">Highest Rating</option>
                  <option value="Most Reviews">Most Reviews</option>
                  <option value="Number Of Tasks">Number Of Tasks</option>
                </select>
                <strong>
                  <i className="fa fa-clock-o" aria-hidden="true"></i>
                  TASK DATE & TIME:
                </strong>
                <input id="datePicker" className="calendar-input" type="date" value={this.props.state.date} onChange={this.onChange('date')}/>
                <select value={this.props.state.task_time} onChange={this.onChange('task_time')}>
                  <option value="I'm Flexible">I'm Flexible</option>
                  <option value="Morning 8AM - 12PM">Morning 8AM - 12PM</option>
                  <option value="Afternoon 12PM - 4PM">Afternoon 12PM - 4PM</option>
                  <option value="Evening 4PM - 8PM">Evening 4PM - 8PM</option>
                </select>
                <p>You can agree later on exact start time with your selected Tasker.</p>
              </div>
            </div>
            <div className="taskers">
              {this.state.taskers.map(tasker => {
                return (
                  <div key={tasker.id} className="tasker">
                    <div className="tasker-profile">
                      <img className="tasker-profile-image" src={tasker.image_url}/>
                      <button onClick={this.handleSubmit(tasker.id)} className="btn-green">Select & Continue</button>
                    </div>
                    <div className="tasker-main">
                      <div className="tasker-header">
                        <h2 id="tasker-name">{tasker.first_name} {tasker.last_name[0]}.</h2>
                        <h3 id="tasker-price">${tasker.price_per_hour}/hr</h3>
                      </div>
                      <div className="tasker-subheader">
                        <strong><i className="fa fa-check" aria-hidden="true"></i> {tasker.num_of_completed_tasks} Completed {this.props.state.task_type} Tasks</strong>
                        <strong><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> {tasker.num_of_reviews} {this.props.state.task_type} Reviews: {tasker.percent_positive}% Positive</strong>
                      </div>
                      <div className="tasker-description">
                        <strong>How I can help:</strong>
                        <p>{tasker.tasker_description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <Modal
            className="modal-container"
            overlayClassName="modal-container-overlay"
            onRequestClose={this.closeModal.bind(this)}
            isOpen={this.state.modalIsOpen}
            >
            <SessionFormModalContainer
              state={this.props.state}
              history={this.props.history}
              setState={this.props.setState}
              updateTask={this.props.updateTask}
            />
          </Modal>
        </div>
      )
    } else {
      return (
        <div className="loader-icon">
          <ClipLoader/>
        </div>
      )
    }
  }
}

export default PickTaskerForm;
