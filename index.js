'use strict'
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const pick = require('lodash/pick')
const merge = require('lodash/merge')
const { unflatten } = require('flat')
const extractReactIntl = require('@digidem/extract-react-intl')
const sortKeys = require('sort-keys')

function loadJson(path) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'))
}

function writeJson(path, obj) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(obj, null, 2) + '\n', err => {
      if (err) {
        return reject(err)
      }

      resolve()
    })
  })
}

function loadLocaleFiles(locales, buildDir) {
  const oldLocaleMaps = {}

  try {
    mkdirp.sync(buildDir)
  } catch (error) {}

  for (const locale of locales) {
    const file = path.resolve(buildDir, `${locale}.json`)
    // Initialize json file
    try {
      const output = JSON.stringify({})
      fs.writeFileSync(file, output, { flag: 'wx' })
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error
      }
    }

    const messages = loadJson(file)

    oldLocaleMaps[locale] = {}
    for (const messageKey of Object.keys(messages)) {
      const message = messages[messageKey]
      if (message && typeof message.message === 'string' && message !== '') {
        oldLocaleMaps[locale][messageKey] = messages[messageKey]
      }
    }
  }

  return oldLocaleMaps
}

module.exports = async (locales, pattern, buildDir, opts) => {
  if (!Array.isArray(locales)) {
    throw new TypeError(`Expected a Array, got ${typeof locales}`)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof pattern}`)
  }

  if (typeof buildDir !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof buildDir}`)
  }

  const jsonOpts = { format: 'json', flat: true }
  const defautlOpts = jsonOpts

  opts = { defaultLocale: 'en', ...defautlOpts, ...opts }

  const { defaultLocale, descriptions, moduleName } = opts

  const oldLocaleMaps = loadLocaleFiles(locales, buildDir)

  const extractorOptions = { defaultLocale, descriptions }

  if (moduleName) {
    extractorOptions.moduleSourceName = moduleName
  }

  const newLocaleMaps = await extractReactIntl(
    locales,
    pattern,
    extractorOptions
  )

  return Promise.all(
    locales.map(locale => {
      // If the default locale, overwrite the origin file
      let localeMap =
        locale === defaultLocale
          ? // Create a clone so we can use only current valid messages below
            merge(oldLocaleMaps[locale], newLocaleMaps[locale])
          : merge(newLocaleMaps[locale], oldLocaleMaps[locale])
      // Only keep existing keys
      localeMap = pick(localeMap, Object.keys(newLocaleMaps[locale]))

      const fomattedLocaleMap = opts.flat
        ? sortKeys(localeMap, { deep: true })
        : unflatten(sortKeys(localeMap), { object: true })

      return writeJson(
        path.resolve(buildDir, locale) + '.json',
        fomattedLocaleMap
      )
    })
  )
}
