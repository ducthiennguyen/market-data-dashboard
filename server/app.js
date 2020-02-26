const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

var update = require('./update');
var chart1_parse_data = require('./chart1_parse_data');
var chart2_parse_data = require('./chart2_parse_data');

var apikey = '4ZHSS420ZVOBWM4I';

const USDJPY = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=JPY&apikey=${apikey}`;
const EURJPY = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=JPY&apikey=${apikey}`;
const GBPJPY = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=GBP&to_symbol=JPY&apikey=${apikey}`;
const Dow = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DOW&apikey=${apikey}`;
const Nikkei = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NTETF&apikey=${apikey}`;
const Shanghai = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SGHIF&apikey=${apikey}`;
const Nomura = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NMR&apikey=${apikey}`;

app = express();
app.use(cors());

async function chart1Fetch() {
  try {
    var data = await Promise.all([
      fetch(USDJPY).then(results => results.json()),
      fetch(EURJPY).then(results => results.json()),
      fetch(GBPJPY).then(results => results.json())
    ]);

    var currencyData = {};

    currencyData['USDJPY'] = chart1_parse_data(data[0]);
    currencyData['EURJPY'] = chart1_parse_data(data[1]);
    currencyData['GBPJPY'] = chart1_parse_data(data[2]);
    // console.log(currencyData);

    app.get('/chart1', (req, res) => {
      res.send(currencyData);
    });

    return currencyData;
  } catch (err) {
    console.log(err);
  }
}

async function chart2Fetch() {
  try {
    var data = await Promise.all([
      fetch(Dow).then(results => results.json()),
      fetch(Nikkei).then(results => results.json()),
      fetch(Shanghai).then(results => results.json()),
      fetch(Nomura).then(results => results.json())
    ]);

    var stockData = {};

    stockData['Dow'] = chart2_parse_data(data[0]);
    stockData['Nikkei'] = chart2_parse_data(data[1]);
    stockData['Shanghai'] = chart2_parse_data(data[2]);
    stockData['Nomura'] = chart2_parse_data(data[3]);
    // console.log(stockData);

    app.get('/chart2', (req, res) => {
      res.send(stockData);
    });

    return stockData;
  } catch (err) {
    console.log(err);
  }
}

chart1Fetch()
  .then(data => {
    // console.log('Data: ', data);
    update(data['USDJPY'], 'USDJPY');
    update(data['EURJPY'], 'EURJPY');
    update(data['GBPJPY'], 'GBPJPY');
  });

chart2Fetch()
  .then(data => {
    // console.log('Data: ', data);
    update(data['Dow'], 'Dow');
    update(data['Nikkei'], 'Nikkei');
    update(data['Shanghai'], 'Shanghai');
    update(data['Nomura'], 'Nomura');
  });

var port = 12321;

app.listen(port, (err) => {
  if (err) { console.log(err); }
  console.log(`Listening on port ${port}`);
});
