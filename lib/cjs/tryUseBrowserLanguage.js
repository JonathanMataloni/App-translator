"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
/**
 * Try to infer the dictionary from the browser.
 * @returns If a dictionary was found, it returns the found language name and sets it as primary language. Otherwise, it returns null.
 */
exports.tryUseBrowserLanguage = function () {
    utils_1._checkInit();
    var _a = window.appTranslator, collection = _a.collection, logs = _a.options.logs;
    if (!collection) {
        console.warn('Cannot use browser language, collection is not defined');
        return null;
    }
    var bcp47tag = navigator.language.split('-');
    var foundDictionary = collection.find(function (dictionary) { return dictionary.bcp47 === bcp47tag[0] || dictionary.bcp47 === bcp47tag[0] + "-" + bcp47tag[1]; });
    if (!foundDictionary) {
        if (logs)
            console.warn("Browser language \"" + bcp47tag + "\" is not available in the provided dictionaries collection.");
        return null;
    }
    window.appTranslator.language = foundDictionary.name;
    return foundDictionary.name;
};
