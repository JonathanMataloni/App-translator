import { AppTranslator, Vocabulary, VocabulariesCollection, AppTranslatorOptions, t } from "../../lib"

/**
 * Define some Vocabulary objects
 */

const vocabularies: Array<Vocabulary> = [
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
            "First capital letter": "Pierwsza wielka litera",
            "string not present in the Italian vocabulary": "ciąg nieobecny w słownictwie włoskim"
        }
    }
]

/**
 * Combine them in a collection
 */
let collection: VocabulariesCollection = Object.fromEntries(vocabularies.map(vocabulary => [vocabulary.BCP47, vocabulary]))


/**
 * Define custom options for AppTranslator
 */

const options: AppTranslatorOptions = {
    autoCapitalize: false,
    caseSensitive: false
}

/**
 * Inizialize AppTransaltor with your default language and custom options
 */
AppTranslator.initialize("it", collection, options)

/**
 * Verify if collection provides a vocabulary for the current browser language.
 * If it doesn't have a vocabulary, keep the initializated language
 * You can force the set of the not-supported language
 */
AppTranslator.getBrowserLanguage(true)
// browser language is pl


/**
 * Translate your strings with manually capitalized output
 */
console.log(t("original text in the code", true))
// Expected output: "Oryginalny tekst w kodzie"



/**
 * Add and remove a vocabulary at runtime
 */
const franch: Vocabulary = {
    BCP47: "fr",
    name: "Française",
    pairs: {
        "Import": "Importer",
        "Deleted": "Supprimé",
    }
}
AppTranslator.addVocabulary("fr", franch)

// Set the new language as default
AppTranslator.setLanguage("fr")

console.log(t("Deleted"))
// Expected output: "Supprimé"

// Remove polish vocabulary
AppTranslator.removeVocabulary("pl")

AppTranslator.setLanguage("pl")
// Warn generated: Choosed language "pl" is not available in the provided vocabularies collection.



/**
 * Change settings 
 */

AppTranslator.setOption("logs", false)
AppTranslator.setOption("autoCapitalize", true)
AppTranslator.setOption("fallbackLanguage", "it")

