const _ = require('lodash')
const fp = require('lodash/fp')
const moment = require('moment')

function Container(val) {
  this.__val = val
}

Container.of = (val) => new Container(val)

Container.prototype.map = function(f) {
  return new Container(f(this.__val))
}

const match = _.curry((p, str) => {
  return str.match(p)
})

const toUpperCase = (x) => x.toUpperCase()

const matchSpace = match(/(\_)+/gi)
const trace = _.curry((tag, x) => {
  console.log(tag, x)
  return x
})

Container.of('Java_mysql').map(toUpperCase).map(trace('toUpperCase: '))


class Maybe {
  constructor (val) {
    this.__val = val
  }

  isNothing () {
    return this.__val === null || this.__val == undefined
  }

  map (f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__val))
  }

  static of (val) {
    return new Maybe(val)
  }
}

Maybe.of('Dotnet Core').map(match(/c/gi)).map(trace('match: '))
console.log(Maybe.of(null).map(trace('Null value will not be displayed.')))

map = _.curry((f, any_functor_at_all) => {
  console.log('map', any_functor_at_all)
  return any_functor_at_all.map(f)
})

const safeHead = (xs) => {
  return Maybe.of(xs[0])
}

const streetName = fp.compose(trace('safeHead: '), map(_.property('street')), safeHead, _.property('addresses'))

streetName({ 'addresses': []})
streetName({ 'addresses': [{'street': 'beijing'}]})

const withdraw = _.curry((amount, account) => {
  return account.balance > amount ? 
    Maybe.of({balance: account.balance - amount}) : 
    Maybe.of(null)
})

const updateLeger = (account) => account.balance
const remainingBalance = (balance) => `Your balance is \$${balance}`
const finishTransaction = fp.compose(remainingBalance, trace('updateLeger: '), updateLeger, trace('before updateLeger: '))

const getTwenty = fp.compose(trace('finishTransaction: '), map(finishTransaction), trace('withdraw: '), withdraw(20))
getTwenty({balance: 100.00})
getTwenty({balance: 10.00})

const maybe = _.curry((x, f, m) => {
  return m.isNothing() ?
    x :
    f(m.__val)
})

const getTwenty2 = fp.compose(trace('maybe: '), maybe('You are broke.', finishTransaction), withdraw(20))
getTwenty2({balance: 100.00})
getTwenty2({balance: 10.00})


function Left (val) {
  this.__val = val
}

Left.of = (val) => new Left(val)
Left.prototype.map = function () {
  return this
}

function Right (val) {
  this.__val = val
}

Right.of = function(val) {
  return new Right(val)
}

Right.prototype.map = function(f) {
  console.log('right of', f)
  return Right.of(f(this.__val))
}


const getAge = _.curry((now, user) =>{
  const birthday = moment(user.birthday, 'YYYY-MM-DD')
  if(!birthday.isValid()) return Left.of('Birth date could not be parsed.')
  return Right.of(now.diff(birthday, 'years'))
})
fp.compose(trace('getAge: '), getAge(moment()))({birthday: '2000-5-1'})
fp.compose(trace('getAge: '), getAge(moment()))({birthday: 'java'})

const concat = _.curry((x, y) => {
  return `${x} ${y}`
})
const add = _.curry((x, y) => {
  console.log('add type', Object.prototype.toString.call(y))
  return Object.prototype.toString.call(y) === '[object Number]' ? 
    x + y :
    undefined
})


const fortune = fp.compose(concat('If you survive, you will be '), trace('after add: '), add(1), trace('before add: '))


// const zoltar = fp.compose(map(console.log), map(fortune), trace('getAge2: '), getAge(moment()))
// zoltar({birthdate: 'balloons!'});
// zoltar({birthday: '2000-1-1'})

function id(val) {
  this.__val = val
  console.log('id init', val)

  this.map = function(f) {
    return this
  }
}

const either = _.curry((f, g, e) => {
  console.log('either e', e)
  switch(e.constructor) {
    case Left: return f(e.__val)
    case Right: return g(e.__val)
  }
})

fp.compose(trace('either after: '), either(id, fortune), trace('before either '), getAge(moment()))({birthday: '2000-01-01'})

console.error(global)