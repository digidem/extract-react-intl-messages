#!/usr/bin/env node
'use strict'
const meow = require('meow')
const fn = require('.')

const cli = meow(
  `
  Usage
  $ extract-react-intl-messages <input>
  $ extract-messages <input>

  Options
  -o, --output          Output directory [require: true]
  -l, --locales         locales [require: true]
  -d, --default-locale  default locale
  --descriptions        include descriptions in output [default: false]
  --module-name         module source name from where components are imported

  Example
  $ extract-messages --locales=ja,en --output app/translations 'app/**/*.js'
`,
  {
    flags: {
      output: {
        type: 'string',
        alias: 'o'
      },
      locales: {
        type: 'string',
        alias: 'l'
      },
      descriptions: {
        type: 'boolean'
      },
      'default-locale': {
        type: 'string',
        alias: 'd'
      },
      'module-name': {
        type: 'string'
      }
    }
  }
)

const { output, locales } = cli.flags

if (!output) {
  console.log('ERROR: required output')
  process.exit(1)
}

if (!locales || typeof locales !== 'string') {
  console.log('ERROR: required locales')
  process.exit(1)
}

const localesMap = locales.split(',')

fn(localesMap, cli.input[0], output, cli.flags)
