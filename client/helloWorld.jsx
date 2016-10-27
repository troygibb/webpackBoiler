import React from 'react';
import { connect } from 'react-redux';

class HelloWorld extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
  	const { message } = this.props; 
    return <h1>	{ message }!</h1>;
  }
}

const mapStateToProps = (state) => {
	return {
		message: state.message,
	};
};

export default connect(mapStateToProps, {})(HelloWorld)