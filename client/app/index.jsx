import React from 'react';
import solarPhone from '../img/solarphone.jpg';
import powerJets from '../img/powerjets.jpg';
import Form from './form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showButton: false };
    this.turnOffButton = this.turnOffButton.bind(this);
  }
  turnOffButton() {
    this.setState({
      showButton: false,
    });
  }
  render() {
    return (
      <div className="container app">
        <div className="page-header header">
          <h1>Get your SolarPhone and PowerJets today!</h1>
          <div className="images">
            <div className="img">
              <img src={solarPhone} />
            </div>
            <div className="img">
              <img src={powerJets} />
            </div>
          </div>
          <div className="order-form">
            { this.state.showButton ? <button className="btn btn-default" onClick={this.turnOffButton}>Order Now!</button> : <Form /> }
          </div>
        </div>
      </div>
    );
  }
}
