const chalk = require('chalk')

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite
const fast_suite = new Benchmark.Suite

const check_luhn = require('../')
check_luhn.fast_toNumberArray.init([15, 16, 17, 18, 19, 20])

const correct_card = '6225365271562822'
const incorrect_card = '6225365271562823'

fast_suite
.add(`check-luhn#${chalk.cyan('CorrectCard')} with ${chalk.green('fast_toNumberArray')}`, () => {
  check_luhn(correct_card)
})
.add(`check-luhn#${chalk.yellow('IncorrectCard')} with ${chalk.green('fast_toNumberArray')}`, () => {
  check_luhn(incorrect_card)
})
.on('cycle', function(event) {
  console.log(String(event.target))
})
.on('complete', function() {
  console.log('\nFastest is ' + this.filter('fastest').map('name'))
})
.run()
