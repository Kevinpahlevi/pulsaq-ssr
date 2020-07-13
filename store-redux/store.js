import { createStore, combineReducers } from "redux";
import reducers from "./reducers";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

const store = createStore(reducers);

const initStore = () => {
  return createStore(reducers);
};

const wrapper = createWrapper(initStore);
export default wrapper;
// const wrapper = createWrapper(store);
// export default wrapper;
