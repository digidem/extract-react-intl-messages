import fs from 'fs'
import path from 'path'
import test from 'ava'
import tempy from 'tempy'
import m from '../..'

test('export json', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.snapshot(en)
  t.snapshot(ja)
})

test('export json with descriptions', async t => {
  const tmp = tempy.directory()
  const opts = { descriptions: true }
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp, opts)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.snapshot(en)
  t.snapshot(ja)
})

test('export json with removed messages', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp)
  const enBefore = JSON.parse(
    fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8')
  )
  const jaBefore = JSON.parse(
    fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8')
  )
  t.snapshot(enBefore)
  t.snapshot(jaBefore)
  await m(['en', 'ja'], 'test/fixtures/removed/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.snapshot(en)
  t.snapshot(ja)
})

test('export json with removed messages with descriptions', async t => {
  const tmp = tempy.directory()
  const opts = { descriptions: true }
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp, opts)
  const enBefore = JSON.parse(
    fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8')
  )
  const jaBefore = JSON.parse(
    fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8')
  )
  t.snapshot(enBefore)
  t.snapshot(jaBefore)
  await m(['en', 'ja'], 'test/fixtures/removed/**/*.js', tmp, opts)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.snapshot(en)
  t.snapshot(ja)
})

test('doesnt overwrite existing translations', async t => {
  const opts = { descriptions: true }
  await m(
    ['en', 'ja'],
    'test/fixtures/default/**/*.js',
    'test/fixtures/messages',
    opts
  )
  const en = JSON.parse(
    fs.readFileSync(path.resolve('test/fixtures/messages', 'en.json'), 'utf8')
  )
  const ja = JSON.parse(
    fs.readFileSync(path.resolve('test/fixtures/messages', 'ja.json'), 'utf8')
  )
  t.snapshot(en)
  t.snapshot(ja)
})

test('sort keys', async t => {
  const tmp = tempy.directory()
  const enPath = path.resolve(tmp, 'en.json')
  const jaPath = path.resolve(tmp, 'ja.json')

  await m(['en', 'ja'], 'test/fixtures/unsorted/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(enPath))
  const ja = JSON.parse(fs.readFileSync(jaPath))

  t.snapshot(Object.keys(en))
  t.snapshot(Object.keys(ja))
})

test('export using custom module', async t => {
  const tmp = tempy.directory()
  const opts = { moduleName: '../i18n' }
  await m(['en', 'ja'], 'test/fixtures/custom/**/*.js', tmp, opts)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.snapshot(en)
  t.snapshot(ja)
})
