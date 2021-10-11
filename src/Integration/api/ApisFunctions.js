import axios from 'axios';
import {
  saveResponseGeneral,
  saveResponsePresist,
  clearGeneral,
  clearPresist,
  enableLoader,
  disableLoader,
  saveError,
  clearError,
  saveSuccess,
  clearSuccess
} from '../actions/Actions';


const colors = {
  bg: {
    Black: "\x1b[40m",
    Red: "\x1b[41m",
    Green: "\x1b[42m",
    Yellow: "\x1b[43m",
    Blue: "\x1b[44m",
    Magenta: "\x1b[45m",
    Cyan: "\x1b[46m",
    White: "\x1b[47m",
  }
};

export const FilterTasks = (tasks) => {
  console.log("taskssssssss==>", tasks)
  let temp = [...tasks]
  let Completed = temp.filter(function (item) {
    return item.isDone == true;
  });
  let unComleted = temp.filter(function (item) {
    return item.isDone == false;
  });
  console.log("afteeer==>", Completed, unComleted)

  return async dispatch => {
    dispatch(saveResponseGeneral(Completed, "Completed"));
    dispatch(saveResponseGeneral(unComleted, "UnComleted"));
    dispatch(saveResponsePresist(Completed, "Completed"));
    dispatch(saveResponsePresist(unComleted, "UnComleted"));
  }


}

export const GetAllTasks = () => {

  const request = axios({
    method: 'GET',
    url: `https://api.fake.rest/9205aabd-3ffa-4b36-8225-5a39528185fa/task/list`,
  });

  return async dispatch => {
    dispatch(enableLoader("GetAllTasks"))
    request.then(
      response => {
        if (response) {

          console.log(colors.bg.Green + 'GetDataFrom GetAllTasks API !', response.data.data);
          // let temp = [...response.data.data]
          dispatch(saveResponseGeneral(response.data.data, "GetAllTasks"));
          dispatch(disableLoader("GetAllTasks"))
          dispatch(FilterTasks(response.data.data))
          dispatch(saveResponsePresist(response.data.data, "GetAllTasks"));

          // let Completed = temp.filter(function (item) {
          //   return item.isDone == true;
          // });
          // let unComleted = temp.filter(function (item) {
          //   return item.isDone == false;
          // });
          // dispatch(saveResponseGeneral(Completed, "Completed"));
          // dispatch(saveResponseGeneral(unComleted, "UnComleted"));
        }
      }
      ,
      err => {
        console.log(colors.bg.Red + 'Unable to fetch data from GetAllTasks API !', err);
        dispatch(disableLoader("GetAllTasks"))
        dispatch(saveError("GetAllTasks", "an error occurred"))
      },
    );
  }
};


export const AddNewTask = (body) => {

  const request = axios({
    method: 'POST',
    url: `https://api.fake.rest/9205aabd-3ffa-4b36-8225-5a39528185fa/task/add`,
    data: body,
  });

  return async dispatch => {
    dispatch(enableLoader("AddNewTask"))
    request.then(
      response => {
        if (response) {
          console.log(colors.bg.Green + 'GetDataFrom AddNewTask API !', response.data.data);
          dispatch(saveSuccess("AddNewTask", " Task added successfully"))
          dispatch(clearGeneral())
          dispatch(GetAllTasks())
        }
      }
      ,
      err => {
        console.log(colors.bg.Red + 'Unable to fetch data from AddNewTask API !', err);
        dispatch(disableLoader("AddNewTask"))
        dispatch(saveError("AddNewTask", "an error occurred"))
      },
    );
  }
};

export const UpdateTask = (body) => {

  const request = axios({
    method: 'PUT',
    url: `https://api.fake.rest/9205aabd-3ffa-4b36-8225-5a39528185fa/task/update`,
    data: body,
  });

  return async dispatch => {
    dispatch(enableLoader("UpdateTask"))
    request.then(
      response => {
        if (response) {
          console.log(colors.bg.Green + 'GetDataFrom UpdateTask API !', response.data.data);
          dispatch(saveSuccess("UpdateTask", " Task Updated successfully"))
          dispatch(clearGeneral())
          dispatch(GetAllTasks())
        }
      }
      ,
      err => {
        console.log(colors.bg.Red + 'Unable to fetch data from UpdateTask API !', err);
        dispatch(disableLoader("UpdateTask"))
        dispatch(saveError("UpdateTask", "an error occurred"))
      },
    );
  }
};

export const DeleteTask = (body) => {

  const request = axios({
    method: 'DELETE',
    url: `https://api.fake.rest/9205aabd-3ffa-4b36-8225-5a39528185fa/task/delete`,
    data: body,
  });

  return async dispatch => {
    dispatch(enableLoader("deleteTask"))
    request.then(
      response => {
        if (response) {
          console.log(colors.bg.Green + 'GetDataFrom deleteTask API !', response.data.data);
          dispatch(saveSuccess("deleteTask", " Task Deleted successfully"))
          dispatch(clearGeneral())
          dispatch(GetAllTasks())
        }
      }
      ,
      err => {
        console.log(colors.bg.Red + 'Unable to fetch data from deleteTask API !', err);
        dispatch(disableLoader("deleteTask"))
        dispatch(saveError("deleteTask", "an error occurred"))
      },
    );
  }
};


export const clearErrors = () => {
  return async dispatch => {
    dispatch(clearError())

  }
};

export const clearSuccessMessages = () => {
  return async dispatch => {
    dispatch(clearSuccess())

  }
};


