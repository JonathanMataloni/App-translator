import { AppTranslator, Vocabulary, VocabulariesCollection, t } from "../../lib"

/**
 * Define some Vocabulary objects
 */
const italian: Vocabulary = {
    BCP47: "it",
    name: "Italiano",
    pairs: {
        "original text in the code": "testo originale nel codice",
        "First capital letter": "Prima lettera maiuscola"
    }
}

const polish: Vocabulary = {
    BCP47: "pl",
    name: "Polskie",
    pairs: {
        "original text in the code": "oryginalny tekst w kodzie",
        "First capital letter": "Pierwsza wielka litera"
    }
}

/**
 * Combine them in a collection
 */
const collection: VocabulariesCollection = {
    "it": italian,
    "pl": polish
}

/**
 * Inizialize AppTransaltor with your default language
 */

AppTranslator.initialize("it", collection)



/**
 * Translate your strings!
 * You can use AppTranslator.translate("string") or the shortcut t("string")
 */

console.log(t("original text in the code"))
// Expected output: "testo originale nel codice"