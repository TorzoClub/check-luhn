#!/usr/bin/env node

const pkg = require('../package.json')
const luhnCheck = require('../')
const program = require('commander')

program
  .version(pkg.version, '-v --version')
  .usage('number')
  .arguments('<number...>')
  .action(function (number_list) {
    const result = number_list.every(luhnCheck)

    console.log(result)

    process.exit(Number(result))
  })

program.parse(process.argv)
