import axios from "axios";
import Swal from "sweetalert2";

//Register Action
export const registerUserAction = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  try {
    const response = await axios.post(
      "http://localhost:4000/api/users/register",
      user
    );
    console.log("Response", response);

    dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });
    window.location.href = "/login";
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
  }
};

//Login Action
export const loginUserAction = (user) => async (dispatch, getState) => {
  // const userOrders = getState().getUsersOrdersReducer.orders;
  dispatch({ type: "USER_LOGIN_REQUEST" });

  try {
    const response = await axios.post(
      "http://localhost:4000/api/users/login",
      user
    );
    console.log("Response", response);

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    // localStorage.setItem("userOrders", JSON.stringify(userOrders));
    //window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};

export const logoutUserAction = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
};

export const getAllUsersAction = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_USERS_REQUEST" });

  try {
    const response = await axios.get(
      "http://localhost:4000/api/users/getAllUsers"
    );
    console.log(response);

    dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_USERS_FAILED", payload: error });
  }
};

export const deleteUserAction = (burgerid) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/burgers/deleteBurger",
      { burgerid }
    );
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Silme İşlemi Başarılı",
      showConfirmButton: false,
      timer: 1500,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
