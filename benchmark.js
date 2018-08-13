const chalk = require('chalk')

const Benchmark = require('benchmark')
var suite = new Benchmark.Suite

const fast_check_luhn = require('./')
const check_luhn = fast_check_luhn.factory()
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
.add(`check-luhn#${chalk.cyan('CorrectCard')} with ${chalk.green('fast_toNumberArray')}`, () => {
  fast_check_luhn(correct_card)
})
.add(`check-luhn#${chalk.yellow('IncorrectCard')} with ${chalk.green('fast_toNumberArray')}`, () => {
  fast_check_luhn(incorrect_card)
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target))
})
.on('complete', function() {
  console.log('\nFastest is ' + this.filter('fastest').map('name'))
})
// run async
.run({ 'async': true })
