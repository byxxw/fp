let _ = require('lodash')
let fp = require('lodash/fp')

const arr = [1, 2, 4]

const add = x => x + 1

const newArr = _.map(arr, add)

console.log(newArr)

const match = _.curry(function(p, str) {
  return str.match(p);
})

const hasSpaces = match(/\s+/g)

const strArr = ['a b', 'ms sql server', 'success']
const newStrArry = strArr.filter(hasSpaces);

// const filter = _.curry(function(f, arr) {
//   return arr.filter(f)
// })

const words = _.curry(function(str) {
  return str.split(' ')
})

const lengthEq = _.curry(function(num, str) {
  return str.length == num
})

const lengthEq7 = lengthEq(7)

const filter = _.curry((f, arr) => arr.filter(f))


const strHasSpace = filter(hasSpaces)

const head = arr => arr[0]
const reverse = arr => arr.reduce((acc, x) => [x].concat(acc), [])

const toUpperCase = x => x.toUpperCase()
const last = fp.compose(fp.compose(toUpperCase, head), reverse)
const lastString = last(['java', 'flash', 'mysql'])
const map = _.curry(function(f, arr) {
  return arr.map(f)
})

const test = fp.compose(map(fp.compose(toUpperCase)), filter(lengthEq(4)), words)
console.log(test('mysql java'))


