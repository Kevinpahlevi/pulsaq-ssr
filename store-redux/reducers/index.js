const initState = {
  count: 100,
  name: "init",
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
    default:
      return state;
  }
};

export default reducer;
