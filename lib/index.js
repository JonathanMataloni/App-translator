"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define translation resources for your app and translate strings instantly
 * For details and usage see the [documentation](https://github.com/JonathanMataloni/app-translator)
 */
class AppTranslator {
}
exports.AppTranslator = AppTranslator;
AppTranslator.options = {
    fallbackLanguage: "bypass",
    autoCapitalize: false,
    caseSensitive: true,
    logs: true
};
/** The main vocabulary used by AppTranslator.translate() ( aka t() ). Change it with setLanguage() */
AppTranslator.language = "bypass";
/** The provided collection of vocabularies. Manage it with addVocabulary() and removeVocabulary() */
AppTranslator.collection = null;
/** The status of AppTranslator. Don't to change it manually */
AppTranslator._initialized = false;
/**
 * Initialize AppTranslator
 * @param language The main vocabulary used by AppTranslator.translate() ( aka t() )
 * @param collection (Opt) The collection of vocabularies
 * @param options (Opt) Define AppTranslator behavior
 */
AppTranslator.initialize = (language, collection, options) => {
    // Avoid re-initializations
    if (AppTranslator._initialized)
        throw new Error("AppTranslatar has already been initialized");
    // Override default options if defined by user
    if (options)
        AppTranslator.options = Object.assign(Object.assign({}, AppTranslator.options), options);
    // Populate vocabularies collection
    if (!collection && AppTranslator.options.logs)
        console.warn("Vocabularies collection should be defined. Nullable collection was created to development purpose only.");
    if (collection) {
        // If language not exists in the collection, use the fallback language
        if (!collection[language] && AppTranslator.options.logs)
            console.warn(`Choosed language "${language}" is not available in the provided vocabularies collection.`);
        // If the fallback language is defined but not present in the collection generate an error
        if (AppTranslator.options.fallbackLanguage !== "bypass"
            && !collection[AppTranslator.options.fallbackLanguage])
            throw new Error(`Choosed fallback language "${AppTranslator.options.fallbackLanguage}" is not available in the provided vocabularies collection.`);
        AppTranslator.collection = collection;
    }
    AppTranslator.language = language;
    // Lock "_initialized" to prevent other initializations
    AppTranslator._initialized = true;
    Object.defineProperty(AppTranslator, "initialized", { configurable: false, writable: false });
};
/**
 * Set a new language as main vocabulary used by AppTranslator.translate() ( aka t() )
 * @param language The main vocabulary tag name
 */
AppTranslator.setLanguage = (language) => {
    var _a;
    if (!AppTranslator._initialized)
        throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
    if (!((_a = AppTranslator === null || AppTranslator === void 0 ? void 0 : AppTranslator.collection) === null || _a === void 0 ? void 0 : _a[language]) && AppTranslator.options.logs)
        console.warn(`Choosed language "${language}" is not available in the provided vocabularies collection.`);
    AppTranslator.language = language;
};
/**
 * Use the browser language if provided by vocabularies collection.
 * @param force (Opt) Set true if you want to use the the browser language as main language even if it not exists in the provided vocabularies collection
 * @returns True if a related vocabulary is available
 */
AppTranslator.getBrowserLanguage = (force) => {
    var _a, _b, _c;
    if (!AppTranslator._initialized)
        throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
    const bcp47tag = navigator.language.split("-")[0];
    if (!((_a = AppTranslator === null || AppTranslator === void 0 ? void 0 : AppTranslator.collection) === null || _a === void 0 ? void 0 : _a[bcp47tag]) && AppTranslator.options.logs) {
        console.warn(`Choosed language "${bcp47tag}" (got from browser navigator) is not available in the provided vocabularies collection.`);
    }
    if (!((_b = AppTranslator === null || AppTranslator === void 0 ? void 0 : AppTranslator.collection) === null || _b === void 0 ? void 0 : _b[bcp47tag]) && force)
        AppTranslator.language = bcp47tag;
    return !!((_c = AppTranslator === null || AppTranslator === void 0 ? void 0 : AppTranslator.collection) === null || _c === void 0 ? void 0 : _c[bcp47tag]);
};
/**
 * Add a vocabulary to the current collection
 * @param tag A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag
 * @param vocabulary The related valid vocabulary Object
 */
AppTranslator.addVocabulary = (tag, vocabulary) => {
    if (!AppTranslator._initialized)
        throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
    AppTranslator.collection = Object.assign(Object.assign({}, AppTranslator.collection), { [tag]: vocabulary });
};
/**
 * Remove a vocabulary to the current vocabulary collection
 * @param tag A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag, currently present in the vocabulary collection
 */
AppTranslator.removeVocabulary = (tag) => {
    var _a;
    if (!AppTranslator._initialized)
        new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
    if (!((_a = AppTranslator === null || AppTranslator === void 0 ? void 0 : AppTranslator.collection) === null || _a === void 0 ? void 0 : _a[tag])) {
        if (AppTranslator.options.logs)
            console.warn(`You can't remove the vocabulary "${tag}" because it doesn't exists in the provided vocabulary collection.`);
    }
    else if (AppTranslator.collection)
        delete AppTranslator.collection[tag];
};
/**
 * Override a single option to AppTranslator
 * @param key The key name of the option to override
 * @param value The new value of the option
 */
AppTranslator.setOption = (key, value) => {
    var _a;
    if (!AppTranslator._initialized)
        throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
    switch (key) {
        case "fallbackLanguage":
            if (typeof value != "string")
                throw new Error('"fallbackLanguage" property can only be of type string');
            if (!((_a = AppTranslator.collection) === null || _a === void 0 ? void 0 : _a[value]))
                throw new Error(`Choosed fallback language  "${value}"  is not available in the provided vocabularies collection.`);
            AppTranslator.options.fallbackLanguage = value;
            break;
        case "autoCapitalize":
            if (typeof value != "boolean")
                throw new Error('"autoCapitalize" property can only be of type boolean');
            AppTranslator.options.autoCapitalize = value;
            break;
        case "caseSensitive":
            if (typeof value != "boolean")
                throw new Error('"caseSensitive" property can only be of type boolean');
            AppTranslator.options.autoCapitalize = value;
            break;
        case "logs":
            if (typeof value != "boolean")
                throw new Error('"logs" property can only be of type boolean');
            AppTranslator.options.logs = value;
            break;
        default:
            throw new Error(`The provided key name "${key}" cannot exist in AppTranslation options`);
    }
};
/**
 * Translate a string with the provided setup
 * @param originalStr The original string in the source code
 * @param capitalize (Opt) Capitalize the first letter of the output (even if it returns the original string)
 * @returns The translated string in the main language, the fallback language or the original code, capitalized if required
 */
AppTranslator.translate = (originalStr, capitalize) => {
    const capitalizeIfRequested = (str) => {
        if (capitalize === undefined) {
            return AppTranslator.options.autoCapitalize ? str[0].toUpperCase() + str.slice(1) : str;
        }
        else
            return capitalize ? str[0].toUpperCase() + str.slice(1) : str[0].toLowerCase() + str.slice(1);
    };
    const findString = (originalStr, pairs) => {
        if (!AppTranslator.options.caseSensitive) {
            // Find a key with the same text
            let key;
            Object.keys(pairs).some(originalKey => {
                if (originalKey.toLowerCase() == originalStr.toLowerCase()) {
                    key = originalKey;
                    return true;
                }
            });
            if (key)
                return pairs[key];
            else
                return null;
        }
        else
            return pairs[originalStr] || null;
    };
    // Stop execution if AppTranslator is not initializated 
    if (!AppTranslator._initialized)
        throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
    // If provided string is a number, just return it as a string.
    if (typeof originalStr == "number")
        return originalStr.toString();
    // Avoid translation if the vocabularies collection is not defined or translation is bypassed.
    if (AppTranslator.language == "bypass" || !AppTranslator.collection)
        return capitalizeIfRequested(originalStr);
    // Try to fetch the translated string 
    let translatedWord = findString(originalStr, AppTranslator.collection[AppTranslator.language].pairs);
    if (!translatedWord) {
        if (AppTranslator.options.logs)
            console.warn(`The provided string "${originalStr}" doesn't match any translation in "${AppTranslator.language}" vocabulary.`);
        // Return the original string if the fallback language is explicitly bypassed
        if (AppTranslator.options.fallbackLanguage == "bypass")
            return capitalizeIfRequested(originalStr);
        // Try to get the translated string in the fallback language
        translatedWord = findString(originalStr, AppTranslator.collection[AppTranslator.options.fallbackLanguage].pairs);
    }
    if (!translatedWord)
        throw new Error(`The provided string "${originalStr}" doesn't match any translation in "${AppTranslator.options.fallbackLanguage}" vocabulary that is defined as fallback vocabulary.`);
    else
        return capitalizeIfRequested(translatedWord);
};
/**
 * Translate a string with the provided setup
 * @param originalStr The original string in the source code
 * @param capitalize (Opt) Capitalize the first letter of the output (even if return the original string)
 * @returns The translated string in the main language, the fallback language or the original code, capitalized if required
 */
exports.t = AppTranslator.translate;
