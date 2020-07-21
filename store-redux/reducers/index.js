const initState = {
  count: 100,
  name: "init",
  payment: {},
};

const reducer = (state = initState, action) => {
  const { type, value } = action;

  switch (type) {
    case "ADD_COUNT":
      console.log({ ...state, count: state.count + 1 });
      return { ...state, count: state.count + 1 };
    case "CHANGE_NAME":
      return { ...state, name: value };
    case "GET_COUNT":
      return state.count;
    case "ADD_PAYMENT":
      return { ...state, payment: value };
    default:
      return state;
  }
};

export default reducer;
