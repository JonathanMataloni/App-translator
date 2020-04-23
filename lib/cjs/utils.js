"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._checkInit = function () {
    if (!window.appTranslator._initialized)
        throw new Error('AppTranslator not initialized. Call initTranslator() first.');
};
/**
 * Get a currently loaded dictionary
 * @param language The name of the dictionary to ger
 * @return The requested dictionary or undefined if not found
 */
exports.getDictionary = function (language) {
    var _a;
    exports._checkInit();
    return (_a = window.appTranslator.collection) === null || _a === void 0 ? void 0 : _a.find(function (dictionary) { return dictionary.name === language; });
};
/**
 * Get the dictionaries names
 * @return An array of the names of the currently loaded dictionaries.
 */
exports.getAvailableLanguages = function () {
    var _a;
    exports._checkInit();
    return (_a = window.appTranslator.collection) === null || _a === void 0 ? void 0 : _a.map(function (dictionary) { return dictionary.name; });
};
/**
 * Change the primary language
 * @param language The new primary language
 */
exports.setLanguage = function (language) {
    exports._checkInit();
    if (exports.getDictionary(language)) {
        window.appTranslator.language = language;
    }
    else
        console.error("Language \"" + language + "\" not exists in the provided collection");
};
/**
 * Change the App Translator options
 * @param options An object with the new options
 */
exports.setOptions = function (options) {
    exports._checkInit();
    var optionsList = Object.keys(window.appTranslator.options);
    Object.keys(options).forEach(function (key) {
        if (!optionsList.includes(key)) {
            throw new Error("Cannot set \"" + key + "\". The option \"" + key + "\" does not exist");
        }
    });
    window.appTranslator.options = __assign(__assign({}, window.appTranslator.options), options);
};
