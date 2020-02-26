import React, { Component } from 'react';

import Chart1 from './chart1.js';
import Chart2 from './chart2.js';

class App extends Component {

  render() {
    return (
      <div id = 'main'>
        <h1>Exchange Rates Chart</h1>
        <Chart1 />
        <h1>Stock Time Series Chart</h1>
        <Chart2 />
      </div>
    );
  }
}

export default App;
