import React from 'react';
import axios from 'axios';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solarphone: false,
      powerjets: false,
      name: '',
      email: '',
      success: false,
    };
    this.togglePowerJets = this.togglePowerJets.bind(this);
    this.toggleSolarPhone = this.toggleSolarPhone.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.setSuccessState = this.setSuccessState.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  handleFormSubmit(e) {
    e.preventDefault();
    axios.post('/order', {
      solarphone: this.state.solarphone,
      powerjets: this.state.powerjets,
      name: this.state.name,
      email: this.state.email,
    })
    .then((response) => {
      this.setSuccessState();
    });
  }
  setSuccessState() {
    this.setState({
      success: true,
    });
  }
  toggleSolarPhone() {
    this.setState({
      solarphone: !this.state.solarphone,
    });
  }
  togglePowerJets() {
    this.setState({
      powerjets: !this.state.powerjets,
    });
  }
  render() {
    if (!this.state.success) {
      return (
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label >Name:</label>
            <input type="name" className="form-control" value={this.state.name} onChange={this.handleNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.handleEmailChange} />
          </div>
          <div className="checkbox">
            <label><input type="checkbox" value="solarphone" onChange={this.toggleSolarPhone} checked={this.state.solarphone} />SolarPhone</label>
            <div className="form-group">
              <label htmlFor="sel1">Select list:</label>
              <select className="form-control" id="sel1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <label><input type="checkbox" value="powerjets" onChange={this.togglePowerJets} checked={this.state.powerjets} />PowerJet</label>
            <div className="form-group">
              <label htmlFor="sel1">Select list:</label>
              <select className="form-control" id="sel1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>
          <button type="submit" value="submit" className="btn btn-default">Submit</button>
        </form>
      );
    }
    return (
      <h1>
        Success!
      </h1>
    );
  }
}
