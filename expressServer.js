const express = require('express')
const app = express()


var CARS = [
  {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true, items: [{m: 'A'}]},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false ,items: [{m: 'B'}]},
  {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false, items: [{m: 'C'}]},
  {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false, items: [{m: 'D'}]},
  {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true, items: [{m: 'F'}]},
  {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: true, items: [{m: 'E'}]}
];

app.get('/', (req, res) => {
  res.json(CARS)
})

app.listen(3000, () => {
  console.log('server listen at 3000')
})

