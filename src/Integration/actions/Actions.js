export const SAVE_GENERAL_REDUCER = 'SAVE_GENERAL_REDUCER';
export const CLEAR_GENERAL_REDUCER = 'CLEAR_GENERAL_REDUCER';
export const SAVE_PRESIST_REDUCER = 'SAVE_PRESIST_REDUCER';
export const CLEAR_PRESIST_REDUCER = 'CLEAR_PRESIST_REDUCER';
export const ENABLE_LOADER = 'ENABLE_LOADER';
export const DISABLE_LOADER = 'DISABLE_LOADER';
export const SAVE_ERORR = "SAVE_ERORR"
export const CLEAR_ERORR = 'CLEAR_ERORR';



export const saveResponseGeneral = (payload, reducerVariable) => {
  return {
    type: SAVE_GENERAL_REDUCER,
    payload: payload,
    reducerVariable: reducerVariable
  }

}

export const saveResponsePresist = (payload, reducerVariable) => {
  return {
    type: SAVE_PRESIST_REDUCER,
    payload: payload,
    reducerVariable: reducerVariable
  };
}

export const saveError = (name, payload) => {
  return {
    type: SAVE_ERORR,
    Error: payload,
    Name: name
  };
}

export const clearError = () => {
  return {
    type: CLEAR_ERORR,
  };
}


export const clearGeneral = () => ({
  type: CLEAR_GENERAL_REDUCER
})

export const clearPresist = () => ({
  type: CLEAR_PRESIST_REDUCER
})

export const enableLoader = (apiType) => {
  return {
    type: ENABLE_LOADER,
    apiType,
  };
}

export const disableLoader = (apiType) => {
  return {
    type: DISABLE_LOADER,
    apiType,
  };
}


