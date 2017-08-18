import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../../client/reducers/index';

const finalStore = applyMiddleware(thunk)(createStore);
const store = finalStore(reducer);

export default class CustomProvider extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Provider store={store} >
					{this.props.children}
				</Provider>
			</div>
		)
	}
}