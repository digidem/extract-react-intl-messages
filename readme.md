# extract-react-intl-messages

[![Build Status](https://travis-ci.org/akameco/extract-react-intl-messages.svg?branch=master)](https://travis-ci.org/akameco/extract-react-intl-messages)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![MIT License](https://img.shields.io/npm/l/nps.svg?style=flat-square)](./license)
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors)

This is forked from
[extract-react-intl-messages](https://github.com/akameco/extract-react-intl-messages).
It removes un-used options (custom delimiter, exporting nested files, and yaml
export), and adds an option to export messages in the same format that [Chrome
Apps use](https://developer.chrome.com/webstore/i18n). We use this because the
translation service we use, crowdin.com, accepts this format of file, and will
include the description as context for the translator.

This package will generate json from a glob. It will generate one file per
locale, with the ids of each message defined by the
[`defineMessages`](https://github.com/yahoo/react-intl/wiki/API#definemessages)
function of [react-intl](https://github.com/yahoo/react-intl). The value of each
of these keys will be an empty string, or an object with the property `message`
an empty string, except for your `defaultLocale` which will be populated with
the
[`defaultMessage`](https://github.com/yahoo/react-intl/wiki/API#message-descriptor).

## Dependencies

### Babel

- 2.x works with Babel 7
- 1.x works with Babel 7
- 0.x works with Babel 6

## Install

```sh
$ npm install --save-dev @digidem/extract-react-intl-messages
```

## Usage

app/components/App/messages.js

```js
import { defineMessages } from 'react-intl'

export default defineMessages({
  hello: {
    id: 'a.hello',
    defaultMessage: 'hello'
  },
  world: {
    id: 'a.world',
    defaultMessage: 'world'
  }
})
```

### Run Script

```
$ extract-messages -l=en,ja -o app/translations -d en 'app/**/!(*.test).js'
```

### Output

app/translations/en.json

```json
{
  "a.hello": "hello",
  "a.world": "world",
  "b.hello": "hello",
  "b.world": "world"
  }
}
```

app/translations/ja.json

```json
{
  "a.hello": "",
  "a.world": "",
  "b.hello": "",
  "b.world": ""
  }
}
```

## Recommend

Use with [babel-plugin-react-intl-auto: i18n for the component age. Auto management react-intl ID.](https://github.com/akameco/babel-plugin-react-intl-auto)

## CLI

```console
$ extract-messages --help

  Extract react-intl messages

  Usage
  $ extract-react-intl-messages <input>
  $ extract-messages <input>

  Options
  -o, --output       Output directory [require: true]
  -l, --locales      locales [require: true]
  --descriptions     include descriptions in output [default: false]
  --default-locale   default locale [default: en]
  --module-name      module source name from where components are imported [default: react-intl]

  Example
  $ extract-messages --locales=ja,en --output app/translations 'app/**/*.js'
  $ extract-messages -l=ja,en -o i18n 'src/**/*.js'
```

### create-react-app user

create `.babelrc` like this.

```json
{
  "presets": ["react-app"]
}
```

Run with `NODE_ENV=development`.

```
$ NODE_ENV=development extract-messages ...
```

## API

### extractReactIntlMessages(locales, input, buildDir, [options])

#### locales

Type: `Array<string>`

Example: `['en', 'ja']`

#### input

Type: `Array<string>`

Target files.
glob.

#### buildDir

Type: `string`

Export directory.

#### options

##### defaultLocale

Type: `string`<br>
Default: `en`

##### moduleName

Type: `string`<br>
Default: `react-intl`

Set from where _defineMessages_, `<FormatterMessage />` and `<FormattedHTML />` are imported.

#### descriptions

Type: `boolean`<br> Default: `false`

Includes message descriptions in the returned object. Each message id property
will be an object with properties `message` and `description` instead of a
message string e.g.

```js
{
  en: {
    'components/App/hello': {
      message: 'hello',
      description: 'hello message description'
    },
    'components/App/welcome': {
      message: 'welcome to extract-react-intl',
      description: 'welcome message description
    }
  },
  ja: {
    'components/App/hello': {
      message: '',
      description: 'hello message description'
    },
    'components/App/welcome': {
      message: '',
      description: 'welcome message description
    }
  }
}
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="http://akameco.github.io"><img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;" alt="akameco"/><br /><sub><b>akameco</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=akameco" title="Code">💻</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=akameco" title="Tests">⚠️</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=akameco" title="Documentation">📖</a> <a href="#infra-akameco" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://hoantran.info"><img src="https://avatars3.githubusercontent.com/u/13161875?v=4" width="100px;" alt="Hoan Tran"/><br /><sub><b>Hoan Tran</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=hoantran-it" title="Code">💻</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=hoantran-it" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/giantpinkwalrus"><img src="https://avatars1.githubusercontent.com/u/3383240?v=4" width="100px;" alt="giantpinkwalrus"/><br /><sub><b>giantpinkwalrus</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=giantpinkwalrus" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/enrique-ramirez"><img src="https://avatars3.githubusercontent.com/u/1190640?v=4" width="100px;" alt="enrique-ramirez"/><br /><sub><b>enrique-ramirez</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=enrique-ramirez" title="Documentation">📖</a></td>
    <td align="center"><a href="http://stefan-gojan.de"><img src="https://avatars2.githubusercontent.com/u/163128?v=4" width="100px;" alt="Stefan Gojan"/><br /><sub><b>Stefan Gojan</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/issues?q=author%3Ahoschi" title="Bug reports">🐛</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=hoschi" title="Code">💻</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=hoschi" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://lithe.net"><img src="https://avatars1.githubusercontent.com/u/857744?v=4" width="100px;" alt="Solomon English"/><br /><sub><b>Solomon English</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=solomon23" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Filson14"><img src="https://avatars1.githubusercontent.com/u/4540538?v=4" width="100px;" alt="Filip "Filson" Pasternak"/><br /><sub><b>Filip "Filson" Pasternak</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=Filson14" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://ddem.us/"><img src="https://avatars1.githubusercontent.com/u/290457?v=4" width="100px;" alt="Gregor MacLennan"/><br /><sub><b>Gregor MacLennan</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=gmaclennan" title="Code">💻</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=gmaclennan" title="Documentation">📖</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=gmaclennan" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)
