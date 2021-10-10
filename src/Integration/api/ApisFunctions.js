import axios from 'axios';
import {
  saveResponseGeneral,
  saveResponsePresist,
  clearGeneral,
  clearPresist,
  enableLoader,
  disableLoader,
  saveError,
  clearError
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



export const GetAllMovies = (data, page) => {
  let temp = []
  if (data != null) {
    temp = [...data]
  }
  const request = axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=cba44dd2c0de45b4d46c7a43c9f81259`,
  });

  return async dispatch => {
    dispatch(enableLoader("GetAllMovies"))
    request.then(
      response => {
        if (response) {
          console.log(colors.bg.Green + 'GetDataFrom GetAllMovies API !', response.data)
          if (temp.length != 0) {
            let combinedArray = temp.concat(response.data.results)
            dispatch(saveResponseGeneral(combinedArray, "GetAllMovies"));
          }
          else {
            dispatch(saveResponseGeneral(response.data.results, "GetAllMovies"));
          }
          dispatch(disableLoader("GetAllMovies"))
        }
      }
      ,
      err => {
        console.log(colors.bg.Red + 'Unable to fetch data from GetAllMovies API !', err);
        dispatch(disableLoader("GetAllMovies"))
        dispatch(saveError("GetAllMovies", "an error occurred"))
      },
    );
  }
};


export const AddNewMoive = (movie, navigation) => {
  // if (movie.title != "" || movie.overview != "") {
  return async dispatch => {
    dispatch(saveResponsePresist(movie, "MyMovies"))
    navigation.replace("Home")
  }
  // }
  // else {
  //   return async dispatch => {
  //     dispatch(saveError("AddNewMoive", "Please fill all fields"))
  //   }
  // }

};

export const clearErrors = () => {
  return async dispatch => {
    dispatch(clearError())

  }
};


