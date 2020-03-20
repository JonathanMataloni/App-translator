# App Translator

Define translation resources for your app and manage translations at runtime

## Description

This package provides a bunch of methods to manage the translations in your app or website.

**Can app-translator translate automatically any string?**
No, that's not the purpose of this package. You must provide a vocabulary of original and translated strings pairs to app-translator to replace the original strings in your code.

**Will the strings be translated at build or runtime?**
At runtime only, app-translator replaces your hard-coded strings with translated strings. You can use app-translator without a bundler.

## Supported languages

- Typescript
- Javascript ES2017

## Installation

```cli
npm install app-translator
```

## Reference index

### Interfaces

[Vocabulary](#Vocabulary)  
[VocabulariesCollection](#VocabulariesCollection)  
[AppTranslatorOptions](#AppTranslatorOptions-interface)  

### Classes

[AppTranslator](#AppTranslator)  

### Properties

[AppTranslator.language](#AppTranslatorlanguage)  
[AppTranslator.options](#AppTranslatoroptions)  
[AppTranslator.collection](#AppTranslatorcollection)  

### Methods

[AppTranslator.initialize](#AppTranslatorinitialize)  
[AppTranslator.setLanguage](#AppTranslatorsetLanguage)  
[AppTranslator.getBrowserLanguage](#AppTranslatorgetBrowserLanguage)  
[AppTranslator.addVocabulary](#AppTranslatoraddVocabulary)  
[AppTranslator.removeVocabulary](#AppTranslatorremoveVocabulary)  
[AppTranslator.setOption](#AppTranslatorsetOption)  
[AppTranslator.translate](#AppTranslatortranslate)  

### Aliases

t() - call [AppTranslator.translate](#AppTranslatortranslate)  

## Reference

### Vocabulary

- _Interface_

Define a single vocabulary.

| Property | Type                               | Description                                                                           |
| :------- | :--------------------------------- | :------------------------------------------------------------------------------------ |
| name     | string                             | The name of the language                                                              |
| BCP47    | string                             | A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag |
| pairs    | { [ *original*: string ]: string } | Mapped pairs of strings ex. { "original string": "translated string" }                |

---

### VocabulariesCollection

- _Interface_

Define the vocabularies collection.

| Property    | Type                             | Description         |
| :---------- | :------------------------------- | :------------------ |
| [ *bcp47* ] | [ *bcp47*: string ] : Vocabulary | A single vocabulary |

---

### AppTranslatorOptions (interface)

- _Interface_

Define options for AppTranslator.

| Property          | Type    | Description                                                                                                                                                      |
| :---------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fallbackLanguage? | string  | A language to use if AppTranslator doesn't find a translated string in the main language. If you want use the original string from source, use "bypass" as value |
| caseSensitive?    | boolean | Find the original string in vocabulary without consider the case                                                                                                 |
| autoCapitalize?   | boolean | Capitalize automatically the first letter of each translated output, even if return the original string                                                          |
| logs?             | boolean | Emit warns to the console                                                                                                                                        |

---

### AppTranslator

- _Class_

To initializate AppTranslator use [AppTranslator.initializate](#AppTranslatorinitializate)
It's useless create AppTranslator instances. AppTranslator uses a bunch of static methods and propery to work.

---

### AppTranslator.language

- _string_

The main vocabulary used by [AppTranslator.translate](#apptranslatortranslate). Change it with [AppTranslator.setLanguage](#apptranslatorsetlanguage)

---

### AppTranslator.options

- _Required<[AppTranslatorOptions](#AppTranslatorOptions-interface)>_

Define the behavior of AppTranslator.

| Property         | Type    | Default  | Description                                                                                                                                                                                                                                                |
| :--------------- | :------ | :------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fallbackLanguage | string  | "bypass" | A language to use if AppTranslator doesn't find a translated string in the main language. If you want use the original string from your source code, use "bypass" as value. ⚠ Can generate an error if original string doesn't match a related translation |
| caseSensitive    | boolean | false    | Find the original string in vocabulary without consider the case                                                                                                                                                                                           |
| autoCapitalize   | boolean | true     | Automatically capitalize the first letter of each translated output, even if it returns the original string                                                                                                                                                |
| logs             | boolean | true     | Emit warns to the console                                                                                                                                                                                                                                  |

---

### AppTranslator.collection

- _[VocabularyCollection](#VocabularyCollection)_

The provided collection of vocabularies.

---

### AppTranslator.initialize

- _Function ( language: string, collection?: [VocabulariesCollection](#VocabulariesCollection), options?: [AppTranslatorOptions](#AppTranslatorOptions-interface) ): void_

Initialize AppTranslator. It's required to use AppTranslator, otherwise it will generate an error. It cannot be initialized multiple times. To modify its properties, use the related methods.

| Parameter   | Type                                         | Description                                           |
| :---------- | :------------------------------------------- | :---------------------------------------------------- |
| language    | string                                       | The main vocabulary used by AppTranslator.translate |
| collection? | [VocabularyCollection](#VocabularyCollection) | The collection of vocabularies                        |
| options?    | [AppTranslatorOptions](#AppTranslatorOptions-interface) | Define the behavior of AppTranslator                  |

---

### AppTranslator.setLanguage

- _Function ( language: string ): void_

Set a new language as main vocabulary used by AppTranslator.translate

| Parameter | Type   | Description                                           |
| :-------- | :----- | :---------------------------------------------------- |
| language  | string | The main vocabulary used by AppTranslator.translate |

---

### AppTranslator.getBrowserLanguage

- _Function ( force?: boolean ): boolean_
- _Return: True if a related vocabulary is available in current collection_

Use the browser language as primary if provided by vocabularies collection, otherwise use the main language. You can force this behavior ([AppTranslator.translate](#AppTranslator.translate) will use the fallback language or the original provided strings).

| Parameter | Type   | Description                                                                          |
| :-------- | :----- | :----------------------------------------------------------------------------------- |
| language  | string | The main vocabulary used by [AppTranslator.translate](#AppTranslator.translate) |

---

### AppTranslator.addVocabulary

- _Function ( tag: string, vocabulary: Vocabulary ): void_

Add a vocabulary to the current vocabulary collection

| Parameter  | Type                     | Description                                                                           |
| :--------- | :----------------------- | :------------------------------------------------------------------------------------ |
| tag        | string                   | A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag |
| vocabulary | [Vocabulary](#Vocabulary) | The related [Vocabulary](#Vocabulary)                                            |

---

### AppTranslator.removeVocabulary

- _Function ( tag: string ): void_

Remove a vocabulary to the current vocabulary collection

| Parameter | Type   | Description                                                                                                                           |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------ |
| tag       | string | A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag, currently present in the vocabulary collection |

---

### AppTranslator.setOption

- _Function ( key: keyof [AppTranslatorOptions](#AppTranslatorOptions-interface), value: string | boolean ): void_

Override a single option in AppTranslator.options

| Parameter | Type                     | Description                            |
| :-------- | :----------------------- | :------------------------------------- |
| key       | string                   | The key name of the option to override |
| value     | [Vocabulary](#Vocabulary) | The new value of the option            |

---

### AppTranslator.translate()

- _Function ( originalStr: string | number, capitalize?: boolean ): string_
- _Return: The translated string in the chosen main language, the fallback language or the original code, in upper case if required_

Translate a string

| Parameter   | Type             | Description                                                                        |
| :---------- | :--------------- | :--------------------------------------------------------------------------------- |
| originalStr | string \| number | The original string in the source code                                             |
| capitalize  | boolean          | Capitalize the first letter of the output (even if it returns the original string) |

> You can also invoke AppTranslator.translate() importing "t" from "app-translator"
>
> ```ts
> import { t } from "app-translator"
> t("original string", true);
> // Expected output: "Translated capitalized string"
> ```

---

## Examples

- Basic usage

```ts
import { AppTranslator, Vocabulary, VocabulariesCollection, t } from "app-translator";

// Define some vocabularies
const italian: Vocabulary = {
  BCP47: "it",
  name: "Italiano",
  pairs: {
    "original text in the code": "testo originale nel codice",
    "First capital letter": "Prima lettera maiuscola"
  }
};

const polish: Vocabulary = {
  BCP47: "pl",
  name: "Polskie",
  pairs: {
    "original text in the code": "oryginalny tekst w kodzie",
    "First capital letter": "Pierwsza wielka litera"
  }
};

// Combine them in a collection
const collection: VocabulariesCollection = {
  it: italian,
  pl: polish
};

// Inizialize AppTransaltor with your default language
AppTranslator.initialize("it", collection);

// Translate your strings!
// You can use AppTranslator.translate("string") or import "t" and use it as that

console.log(t("original text in the code"));
// Expected output: "testo originale nel codice"
```

- Import automatically vocabularies from a path

```ts
import { AppTranslator, VocabulariesCollection } from "app-translator";
import * as importedVocabularies from "/vocabularies";

// Type checking
const vocabularies: VocabulariesCollection = importedVocabularies;

// Initialize AppTranslator
AppTranslator.initialize("it", collection);
```

- Create a collection from a vocabulary array

```ts
import { AppTranslator, VocabulariesCollection } from "app-translator";

// Define vocabularies in an array
const collection: VocabulariesCollection = [
  {
    BCP47: "it",
    name: "Italiano",
    pairs: {
      "original text in the code": "testo originale nel codice",
      "First capital letter": "Prima lettera maiuscola"
    }
  },
  {
    BCP47: "pl",
    name: "Polskie",
    pairs: {
      "original text in the code": "oryginalny tekst w kodzie",
      "First capital letter": "Pierwsza wielka litera"
    }
  }
];

// Combine them in a collection
let collection: VocabulariesCollection = Object.fromEntries(vocabularies.map(vocabulary => [vocabulary.BCP47, vocabulary]));

// Initialize AppTranslator
AppTranslator.initialize("it", collection);
```

- Initialize AppTranslator with custom options

```ts
import { AppTranslator, VocabulariesCollection, AppTranslatorOptions } from "app-translator";
import * as importedVocabularies from "/vocabularies";

// Type checking
const vocabularies: VocabulariesCollection = importedVocabularies;

// Define custom options for AppTranslator
const options: AppTranslatorOptions = {
    fallbackLanguage: "en"
    autoCapitalize: false,
    caseSensitive: true
    log: false
}

// Initialize AppTranslator
AppTranslator.initialize("it", collection, options);
```

- Add vocabularies at runtime

```ts
// Define or import the vocabulary
const franch: Vocabulary = {
  BCP47: "fr",
  name: "Française",
  pairs: {
    Import: "Importer",
    Deleted: "Supprimé"
  }
};

// Add the vocabulary to the current collection
AppTranslator.addVocabulary("fr", franch);

// Set the new language as default
AppTranslator.setLanguage("fr");

console.log(t("Deleted"));
// Expected output: "Supprimé"
```

- Change options after initialization

```ts
console.log(AppTranslator.options);
// Expected output:
// { fallbackLanguage: "bypass", autoCapitalize: false, caseSensitive: true, logs: true }

AppTranslator.setOption("fallbackLanguage", "it");
AppTranslator.setOption("autoCapitalize", true);
AppTranslator.setOption("logs", false);

console.log(AppTranslator.options);
// Expected output:
// { fallbackLanguage: "it", autoCapitalize: true, caseSensitive: true, logs: false }
```

- Translate!

```ts
// Long boring method
console.log(AppTranslator.translate("original string"));
// Expected output: "stringa originale"

// Faster way (you need to import "t" from app-translator)
console.log(t("original string"));
// Expected output: "stringa originale"

// Force upper case
console.log(t("original string", true));
// Expected output: "Stringa originale"
```

### Links

- [BCP 47 Language Tags](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers)
- [BCP 47 Specifications](https://tools.ietf.org/html/bcp47)

### License

app-translator package released under MIT License. See LICENSE for details.
