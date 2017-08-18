import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers/index';
import App from './app/index';

const finalStore = applyMiddleware(thunk)(createStore);
const store = finalStore(reducer);

class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <App />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('main'));

// Enables HMR.
if (module.hot) {
  module.hot.accept();
}
