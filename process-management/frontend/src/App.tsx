import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props: any) {
    super(props);
  }

  state = {
    apiResponse: ""
  }

  testAPIcall = () => {
    console.log('API Call started...');
    return axios.get('https://backend-xt-fsd.herokuapp.com/api/test')
    // return axios.get('http://localhost:3000/api/test')
      .then((res) => {
        console.log('after api call backend-', res.data);
        this.setState({
          apiResponse: res.data.message
        });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome...</h1>
        <button onClick={this.testAPIcall.bind(this)}>Test app</button>
        <div>API responce: {this.state.apiResponse}</div>
      </div>
    );
  }
}

export default App;
