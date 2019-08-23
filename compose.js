const _ = require('lodash')
const fp = require('lodash/fp')

const toUpperCase = x => x.toUpperCase()
const reverse = arr => arr.reduce((acc, item) => [item].concat(acc) , [])
const head = arr => arr[0]
const last = fp.compose(head, reverse)
const map = _.curry((f, arr) => arr.map(f))
const trace = _.curry((tag, x) => {
  console.log(tag, x)
  return x
})
const lastUpperCase = fp.compose(trace('toUpperCase: '), toUpperCase,  last)
lastUpperCase(['mysql', 'java'])

var CARS = [
  {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: true}
];
const inStockProp = _.property('in_stock')
const isLastInStock = fp.compose(trace('inStockProp'), inStockProp, last)
isLastInStock(CARS)
const nameOfProp = _.property('name')
const nameOfFirst = fp.compose(trace('nameOfProp'), nameOfProp, head)
nameOfFirst(CARS)
const add = (acc, x) => acc + x
// const reduce = arr => arr.reduce((acc, x) => acc.concat(x), [])
var _avg = arr => arr.reduce(add, 0) / arr.length
const dollarValueProp = _.property('dollar_value')
const avgDollarValue = fp.compose(trace('avgDollarValue'), _avg, map(dollarValueProp))
avgDollarValue(CARS)

const replace = (p, replacement, str) => (str) => str.replace(p, replacement)
const _underscore = replace(/\W+/g, '_')

const toLowerCase = x => x.toLowerCase() + '!'
const sanitizeNames = fp.compose(trace('sanitizeNames: '), map(toUpperCase), map(toLowerCase), map(_underscore))
sanitizeNames(['dotnet core and java'])

const horsepower = car => car.horsepower
const orderBy = _.curry((f, arr) => _.orderBy(arr, f))
const orderByHorsePower = orderBy(horsepower)

const fastestCarName = car => car.name + ' is the fastest!'
const lastCar = fp.compose(trace('lastCar: '), fastestCarName, last, orderByHorsePower)
lastCar(CARS)







