import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import chart_pts from './chart_pts';

var URL = 'http://localhost:12321/chart1';

class Chart1 extends Component {
  constructor() {
    super();
    this.state = {
      close_prices: []
    };
  }

  componentDidMount() {
    fetch(URL)
    .then(results => {
      return results.json();
    }).then(data => {
      // for (let item in data) {
      //   console.log(item, data[item]);
      // }
      this.setState({
        close_prices: [chart_pts(data['USDJPY']), chart_pts(data['EURJPY']), chart_pts(data['GBPJPY'])]
      });
    })
  }

  render() {
    return (
      <div>
        <ReactEcharts
          option={{
            tooltip: {
              trigger: 'item'
            },
            xAxis: {
              type: 'time',
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'USDJPY',
                type: 'line',
                data: this.state.close_prices[0]
              },
              {
                name: 'EURJPY',
                type: 'line',
                data: this.state.close_prices[1]
              },
              {
                name: 'GBPJPY',
                type: 'line',
                data: this.state.close_prices[2]
              }
            ]
          }}
        />
      </div>
      );
  }
}

export default Chart1;
