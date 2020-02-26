module.exports = function chart2_parse_data(data) {
  var parsed = [];
  let values = data['Time Series (Daily)'];
  for (var date in values) {
    var today = new Date();
    if ((today - new Date(date)) / (1000 * 60 * 60 * 24) >= 30) {
      break;
    }
    parsed.unshift([date, parseFloat(values[date]['3. low'])]);
  }
  return parsed;
}
