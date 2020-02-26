module.exports = function chart_pts(arr) {
  var data = [];
  for (let i = 0; i < arr.length; i++) {
    let item = {
      name: arr[i][0],
      value: [
        arr[i][0],
        arr[i][1]
      ]
    };
    data.push(item);
  }
  return data;
}
