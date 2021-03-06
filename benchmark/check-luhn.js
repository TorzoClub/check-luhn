const chalk = require('chalk')

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite
const fast_suite = new Benchmark.Suite

const check_luhn = require('../')
check_luhn.fast_toNumberArray.clear()

const correct_card = '6225365271562822'
const incorrect_card = '6225365271562823'

// add tests
suite
.add(`check-luhn#${chalk.cyan('CorrectCard')}`, () => {
  check_luhn(correct_card)
})
.add(`check-luhn#${chalk.yellow('IncorrectCard')}`, () => {
  check_luhn(incorrect_card)
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target))
})
.on('complete', function() {
  console.log('\nFastest is ' + this.filter('fastest').map('name') + '\n')
})
.run()
