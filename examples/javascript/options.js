import { AppTranslator, t } from "../../src"

/**
 * Define some Vocabulary objects
 */
const italian = {
    BCP47: "it",
    name: "Italiano",
    pairs: {
        "original text in the code": "testo originale nel codice",
        "First capital letter": "Prima lettera maiuscola" 
    }
}

const polish = {
    BCP47: "pl",
    name: "Polskie",
    pairs: {
        "original text in the code": "oryginalny tekst w kodzie",
        "First capital letter": "Pierwsza wielka litera",
        "string not present in the Italian vocabulary": "ciąg nieobecny w słownictwie włoskim"
    }
}

/**
 * Combine them in a collection
 */
const collection = {
    "it": italian,
    "pl": polish
}

/**
 * Define custom options for AppTranslator
 */

const options = {
    autoCapitalize: true,
    caseSensitive: false,
    logs: true,
    fallbackLanguage: "pl"
}

/**
 * Inizialize AppTransaltor with your default language and custom options
 */
AppTranslator.initialize("it", collection, options)


/**
 * Translate your strings
 */

console.log(t("original text in the code"))
// Expected output: "testo originale nel codice"

// "caseSensitive" set false
console.log(t("original TEXT in the CODE"))
// Expected output: "testo originale nel codice"

// Use the fallback vocabulary
console.log(t("string not present in the Italian vocabulary"))
// Warn generated: The provided string "string not present in the Italian vocabulary" doesn't match any translation in "it" vocabulary.
// Expected output: "ciąg nieobecny w słownictwie włoskim"


console.log(t("string not present in any vocabulary"))
/**
 * Execution stops due to an error. The string is not present in the fallback vocabulary.
 * If you are not sure if the provided fallback vocabulary has all the strings to translate in your app,
 * set "bypass" as fallbackLanguage. This keyword do return the original provided string and doesn't generate runtime errors 
 */ 
