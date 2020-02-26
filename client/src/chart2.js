import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import chart_pts from './chart_pts';

var URL = 'http://localhost:12321/chart2';

class Chart2 extends Component {
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
        close_prices: [chart_pts(data['Dow']), chart_pts(data['Nikkei']), chart_pts(data['Shanghai']), chart_pts(data['Nomura'])]
      });
    })
  }

  render() {
    return (
      <ReactEcharts
        option={{
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            type: 'time'
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Dow',
              type: 'line',
              data: this.state.close_prices[0]
            },
            {
              name: 'Nikkei',
              type: 'line',
              data: this.state.close_prices[1]
            },
            {
              name: 'Shanghai',
              type: 'line',
              data: this.state.close_prices[2]
            },
            {
              name: 'Nomura',
              type: 'line',
              data: this.state.close_prices[3]
            }
          ]
        }}
      />
    );
  }
}

export default Chart2;
