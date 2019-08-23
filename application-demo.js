const _ = require('lodash')
const fp = require('lodash/fp')
const fetch = require('node-fetch')

const getJson  = _.curry((token, callback, url) => {
  fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer'}).then(resp => resp.json()).then(callback).catch(callback)
})

const trace = _.curry((tag, x) => {
  console.log(tag, x)
  return x
})

const map = _.curry((f, ex) => {
  return _.map(ex, f)
})

const getJsonUseToken = getJson(token)

const carApiUrl = (car) => `http://localhost:3000?car=${car}`

const propOfm = _.property('m')
const reduce = _.curry((f, v, ex) => ex.reduce(f, v))
const many = _.curry((prop) => fp.compose(map(_.property(prop)), reduce((acc, cur) => acc.concat(cur), [])))
const join = _.curry((delimiters, ex) => ex.join(delimiters))


const carInfoOfItems = fp.compose(many('m'), map(_.property('items')))

const html = (m) => `<img src='${m}' />`
const display = fp.compose(trace('DISPLAY: '), join(' '), map(html), carInfoOfItems)


const procDef = fp.compose(getJsonUseToken(display), carApiUrl)
procDef('Ferrari FF')