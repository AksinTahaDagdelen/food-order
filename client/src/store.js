import { applyMiddleware, combineReducers, createStore } from "redux";
import { getAllBurgersReducer } from "./reducers/burgerReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  getAllUsersReducer,
  loginUserReducer,
  registerUserReducer,
} from "./reducers/userReducers";
import {
  checkoutOrderReducer,
  getUsersOrdersReducer,
} from "./reducers/orderReducers";

const finalReducer = combineReducers({
  getAllBurgersReducer: getAllBurgersReducer,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  checkoutOrderReducer: checkoutOrderReducer,
  getUsersOrdersReducer: getUsersOrdersReducer,
  getAllUsersReducer: getAllUsersReducer,
  // deleteBurgerReducer: deleteBurgerReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const userOrders = localStorage.getItem("userOrders")
  ? JSON.parse(localStorage.getItem("userOrders"))
  : [];

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginUserReducer: {
    currentUser: currentUser,
  },
  userOrders: {
    userOrders: userOrders,
  },
};

const compose = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  compose(applyMiddleware(thunk))
);

export default store;
