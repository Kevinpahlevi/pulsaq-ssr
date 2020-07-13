import store from "../store";

export default {
  addCount: (value) => {
    const action = { type: "ADD_COUNT" };
    store.dispatch(action);
  },
  getCount: (value) => {
    const action = { type: "GET_COUNT" };
    store.dispatch(action);
  },
};
