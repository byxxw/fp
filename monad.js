const fs = require('fs')
const R = require('rambda')
const IO = function (value) {
  this.__value = value
}

IO.of = function (value) {
  return new IO(function() {
    return value
  })
}

IO.prototype.map = function (f) {
  return new IO(R.compose(f, this.__value))
}

const readFile = function(filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf8')
  })
}

const print = function(x) {
  return new IO(function () {
    console.log('x', x)
    return x;
  })
}

const trace = R.curry((tag, x) => {
  console.log(tag, x)
  return x
})

const map = R.curry((f, any_functor_at_all) => {
  return any_functor_at_all.map(f)
})

// join :: monad m => m (m a) -> m a
const join = (monad) => monad.join()


const Maybe = function (val) {
  this.__value = val

  this.isNothing = function () {
    return this.__value === null || this.__value === undefined
  }
}

Maybe.of = function (val) {
  return new Maybe(val)
}

Maybe.prototype.join = function () {
  return this.isNothing() ? new Maybe(null) : this.__value
}

Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
}


const cat = R.compose(trace('after print: '), map(print), trace('after readfile: '), readFile);

const firstContent = R.compose(trace('after map:'), map(map(R.head)), cat)
console.log(firstContent('test.sh').__value().__value())

const safeProp = R.curry((x, obj) => {
  return Maybe.of(obj[x])
})

const safeHead = safeProp(0)

const firstAddressStreet = R.compose(
  join,
  map(safeProp('street')),
  join,
  map(safeHead),
  safeProp('addresses')
)

var fas = firstAddressStreet({ addresses: [{
  street: {
    number: '123',
    phone: 'abc'
  }
}]})
console.log('fac',fas)