# App Translator

![version](https://img.shields.io/npm/v/app-translator)
![size](https://img.shields.io/bundlephobia/min/app-translator)
![download](https://img.shields.io/npm/dm/app-translator)

Define multiple dictionaries for your app and translate strings instantly at runtime.\
This tool does not call external APIs to translate your strings, you must first define yours dictionaries.

## Installation

```cli
npm install app-translator
```

## Compatibility

Compatible with Node >=8.0.0

## Features
- Easy to use
- You can add languages with just putting the dictionary in your lang folder
- Can infer the browser language and search if a related dictionary is defined
- Do not need to reload the app to switch the language
- Extremely small

### Other features
- Static type checking with typescript declaration files
- Exhaustive doc comments
- Tree shakable: exported with ESM modules
- Tested with available coverage report

## API

Index

[Dictionary](#Dictionary)\
[Collection](#Collection)\
[AppTranslatorOptions](#AppTranslatorOptions)\
[initTranslator](#initTranslator)\
[translate](#translate) (alias [t](#translate))\
[tryUseBrowserLanguage](#tryUseBrowserLanguage)\
[getAvailableLanguages](#getAvailableLanguages)\
[setLanguage](#setLanguage)\
[setOptions](#setOptions)

---

#### Dictionary

- _Interface_

Define a single dictionary.

| Property | Type                               | Description                                                                           |
| :------- | :--------------------------------- | :------------------------------------------------------------------------------------ |
| name     | string                             | The language name                                                                     |
| bcp47    | string                             | A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag |
| pairs    | { [ *original*: string ]: string } | Pairs of original-translated strings                                                  |

---

#### Collection

- _interface_

Define the dictionaries collection in an array of dictionaries.

_Array \<[Dictionary](#Dictionary)>_

---

#### AppTranslatorOptions

- _Interface_

Define options for AppTranslator.

| Property        | Type    | Description                                                         |
| :-------------- | :------ | :------------------------------------------------------------------ |
| caseSensitive?  | boolean | Look for the string in dictionary without consider the letters case |
| autoCapitalize? | boolean | Capitalize automatically the first letter                           |
| logs?           | boolean | Emit warns and non-blocking errors to the console                   |

---

#### initTranslator

- _Function ( language: string, collection?: [Collection](#Collection), options?: [AppTranslatorOptions](#AppTranslatorOptions) ): void_

Initialize App Translator with a target language, a collection and custom options. If a collection is not provided, translate() method will bypass your strings.\
⚠ It throws an error if you try to initialize App Translator multiple times.

| Parameter   | Type                                          | Description                                    |
| :---------- | :-------------------------------------------- | :--------------------------------------------- |
| language    | string                                        | The primary dictionary to use for translations |
| collection? | [Collection](#Collection)                     | The collection of dictionaries                 |
| options?    | [AppTranslatorOptions](#AppTranslatorOptions) | Define the behavior of AppTranslator           |

---

#### translate (alias t)

- _Function ( originalStr: string | number, capitalize?: boolean ): string_

Return the translated string in the chosen language or the original string if no translation was found

| Parameter   | Type             | Description                               |
| :---------- | :--------------- | :---------------------------------------- |
| originalStr | string or number | The original string in the code           |
| capitalize  | boolean          | Capitalize the first letter of the output |


---

#### tryUseBrowserLanguage

- _Function(): string | null_

Try to infer the dictionary from the browser. It compares the bcp47 tag in the dictionaries with navigator.language. If a dictionary was found, it returns the found language name and sets it as primary language. Otherwise returns null and does not change the language.

---

#### getAvailableLanguages

- _Function(): Array\<string>_

Return an array of the names of the currently loaded dictionaries.

---

#### setLanguage

- _Function(language: string): void_

Set a new primary language. If not present in the collection will generate a console error but will not change the language.

---

#### setOptions

- _Function(options: [AppTranslatorOptions](#AppTranslatorOptions)): void_

Override the provided new options with the old one.\
⚠ It throws an error if you pass invalid options

---

## Examples

You can import dictionaries as json or js modules. In this example I'll use the ES js modules.

1. Put your dictionaries in `src/languages/`
```js
export const italian = {
    name: 'italian',
    bcp47: 'it-IT',
    pairs: {
        'leave a comment': 'lascia un commento',
    },
}
```

2. Define an index in `src/languages/` with all your exported languages (you can skip this step and import directly in your entry point, but this is more pratical for many dictionaries)
```js
export * from './russian'
export * from './german'
export * from './italian'
export * from './spanish'
```

3. Import them grupped and create your collection
```js
import * as languages from './languages'
const collection = Object.values(languages)
```

4. Initialize App Translator
```js
import { initTranslator } from "app-translator";
initTranslator("italian", collection, { caseSensitive: false, autoCapitalize: true });
```
Now the dictionaries and options are available in window.appTranslator.

5. Translate everywhere! (Example in React)
```js
import { t } from "app-translator";

const App = () => {
  return <h1>{ t("leave a Comment") }</h1>;
};
```

Folder structure:
src/\
--main.js\
--languages/\
----russian.js\
----german.js\
----italian.js\
----spanish.js\
----index.js

You can use App Translator even without a module system or organize your exports as you think is best, there are no specific rules about it.

### Links

- [BCP 47 Language Tags](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers)
- [BCP 47 Specifications](https://tools.ietf.org/html/bcp47)

## Dependencies

No dependencies

### Peer dependencies

No peer dependencies

## License
MIT
