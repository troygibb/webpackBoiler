import React from 'react';
import ReactDOM from 'react-dom';

import Controller from './controller';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1> HELLO world  ! </h1>
        <Controller />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));

// Enables HMR.
if (module.hot) {
  module.hot.accept();
}
