const intialState = {
  todo: {},
};

function RootReducer(state = intialState, action) {
  switch (action.type) {
    case "ADD":
      console.log(action.payload);
      state.todo[action.payload[0]] = action.payload[1];
      return { todo: state.todo };
    case "DELETE":
      delete state.todo[action.payload[0]];
      return { todo: state.todo };
    default:
      return state;
  }
}

export default RootReducer;
