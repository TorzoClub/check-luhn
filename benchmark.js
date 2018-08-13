const Benchmark = require('benchmark')
var suite = new Benchmark.Suite

const check_luhn = require('./')
const correct_card = '6225365271562822'
const incorrect_card = '6225365271562823'

// add tests
suite.add('check-luhn#CorrectCard', function() {
  check_luhn(correct_card)
})
.add('check-luhn#IncorrectCard', function () {
  check_luhn(incorrect_card)
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target))
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
// run async
.run({ 'async': true })
