//Register User Reducer
export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return {
        loading: true,
      };
    case "USER_REGISTER_SUCCESS":
      return {
        loading: false,
        success: true,
        registeredUser: action.payload,
      };
    case "USER_REGISTER_FAILED":
      return {
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

//Login User Reducer

export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        loading: true,
        success: false,
      };
    case "USER_LOGIN_SUCCESS":
      return {
        loading: false,
        success: true,
        currentUser: action.payload,
      };
    case "USER_LOGIN_FAILED":
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_USERS_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_ALL_USERS_SUCCESS":
      return {
        loading: false,
        users: action.payload,
      };
    case "GET_ALL_USERS_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
