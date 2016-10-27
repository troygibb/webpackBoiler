const intitialState = {
	message: 'Hello World!',
};

const actionHandler = {
	'CHANGE-HELLO': (previousState, action) => Object.assign({}, previousState, { message: action.message }),
};

const reducer = (state = intitialState, action) => {
  if (actionHandler[action.type]) {
    return actionHandler[action.type](state, action);
  }
  return state;
};

export default reducer;