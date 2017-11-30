import * as taskFormAPIUtil from '../util/task_form_api_util';

export const RECEIVE_TASK = 'RECEIVE_TASK';
export const RECEIVE_TASK_ERRORS = 'RECEIVE_TASK_ERRORS';
export const RECEIVE_TASK_TYPE = 'RECEIVE_TASK_TYPE';
export const RECEIVE_TASK_TIME = 'RECEIVE_TASK_TIME';
export const RECEIVE_TASK_DATE = 'RECEIVE_TASK_DATE';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';

export const receiveTask = task => ({
  type: RECEIVE_TASK,
  task
})

export const receiveTaskErrors = errors => ({
  type: RECEIVE_TASK_ERRORS,
  errors
})

export const receiveTaskType = taskType => ({
  type: RECEIVE_TASK_TYPE,
  task_type: taskType
})

export const receiveTaskTime = taskTime => ({
  type: RECEIVE_TASK_TIME,
  task_time: taskTime
})

export const receiveTaskDate = taskDate => ({
  type: RECEIVE_TASK_DATE,
  task_date: taskDate
})

export const receiveAllUsers = users => ({
  type: RECEIVE_ALL_USERS,
  users
})

//thunk action creators

export const createTask = task => dispatch => (
  taskFormAPIUtil.createTask(task)
    .then(
      taskRes => dispatch(receiveTask(taskRes)),
      errors => {
        console.log(errors);
        dispatch(receiveTaskErrors(errors.responseJSON))
      }
    )
)

export const fetchAllUsers = task => dispatch => (
  taskFormAPIUtil.fetchAllUsers()
    .then(users => dispatch(receiveAllUsers(users)))
)
