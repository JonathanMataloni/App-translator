"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
/**
 * Translate a string with the provided App Translator setup
 * @param originalString The original string
 * @param capitalize Capitalize the first letter
 * @returns The translated string in the primary language if found, otherwise the original string
 */
exports.translate = function (originalString, capitalize) {
    utils_1._checkInit();
    var _a = window.appTranslator, language = _a.language, _b = _a.options, caseSensitive = _b.caseSensitive, logs = _b.logs, autoCapitalize = _b.autoCapitalize;
    var dictionary = utils_1.getDictionary(language);
    if (typeof originalString == 'number')
        return originalString.toString();
    if (!dictionary) {
        return capitalize || autoCapitalize
            ? originalString[0].toUpperCase() + originalString.slice(1)
            : originalString;
    }
    var translated;
    if (!caseSensitive) {
        // Find a key with the same text
        for (var key in dictionary.pairs) {
            if (key.toLowerCase() === originalString.toLowerCase()) {
                translated = dictionary.pairs[key];
                break;
            }
        }
    }
    else
        translated = dictionary.pairs[originalString];
    if (translated === undefined) {
        translated = originalString;
        if (logs)
            console.warn("The provided string \"" + originalString + "\" doesn't match any translation in \"" + language + "\" dictionary.");
    }
    return capitalize || autoCapitalize ? translated[0].toUpperCase() + translated.slice(1) : translated;
};
/**
 * Translate a string with the provided App Translator setup
 * @param originalString The original string
 * @param capitalize Capitalize the first letter
 * @returns The translated string in the primary language if found, otherwise the original string
 */
exports.t = exports.translate;
