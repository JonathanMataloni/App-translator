"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppTranslator {
}
exports.AppTranslator = AppTranslator;
AppTranslator.options = {
    fallbackLanguage: "bypass",
    autoCapitalize: false,
    caseSensitive: true,
    logs: true
};
AppTranslator.language = "bypass";
AppTranslator.collection = null;
AppTranslator._initialized = false;
AppTranslator.initialize = (language, collection, options) => {
    if (AppTranslator._initialized)
        throw new Error("AppTranslatar it's been already initialized");
    // Override default options if defined
    if (options)
        AppTranslator.options = { ...AppTranslator.options, ...options };
    // Populate vocabularies collection
    if (!collection && AppTranslator.options.logs)
        console.warn("Vocabularies collection should be defined. Nullable collection was created to simplify future integration purpose.");
    if (collection) {
        // If language is not present in the collection, use the fallback language
        if (!collection[language] && AppTranslator.options.logs)
            console.warn(`Choosed language "${language}" is not available in the provided vocabularies collection.`);
        // If the fallback language is defined but not present in the collection generate an error
        if (AppTranslator.options.fallbackLanguage !== "bypass"
            && !collection[AppTranslator.options.fallbackLanguage])
            throw new Error(`Choosed fallback language "${AppTranslator.options.fallbackLanguage}" is not available in the provided vocabularies collection.`);
        AppTranslator.collection = collection;
    }
    AppTranslator.language = language;
    // Lock _initialized and prevent other initializations
    AppTranslator._initialized = true;
    Object.defineProperty(AppTranslator, "initialized", { configurable: false, writable: false });
};
AppTranslator.setLanguage = (language) => {
    if (!AppTranslator._initialized)
        throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
    if (!AppTranslator?.collection?.[language] && AppTranslator.options.logs)
        console.warn(`Choosed language "${language}" is not available in the provided vocabularies collection.`);
    AppTranslator.language = language;
};
AppTranslator.getBrowserLanguage = () => {
    if (!AppTranslator._initialized)
        throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
    const bcp47tag = navigator.language.split("-")[0];
    if (!AppTranslator?.collection?.[bcp47tag] && AppTranslator.options.logs)
        console.warn(`Choosed language "${bcp47tag}" (from browser navigator) is not available in the provided vocabularies collection.`);
    AppTranslator.language = bcp47tag;
    return bcp47tag;
};
AppTranslator.addVocabulary = (tag, vocabulary) => {
    AppTranslator.collection = { ...AppTranslator.collection, [tag]: vocabulary };
};
AppTranslator.removeVocabulary = (tag) => {
    if (!AppTranslator?.collection?.[tag]) {
        if (AppTranslator.options.logs)
            console.warn(`Vocabulary "${tag}" you are tried to remove from collection doesn't exists.`);
    }
    else if (AppTranslator.collection)
        delete AppTranslator.collection[tag];
};
AppTranslator.setOption = (key, value) => {
    switch (key) {
        case "fallbackLanguage":
            if (typeof value != "string")
                throw new Error('"fallbackLanguage" property can be only of type string');
            if (!AppTranslator.collection?.[value])
                throw new Error(`Choosed fallback language  "${value}"  is not available in the provided vocabularies collection.`);
            AppTranslator.options.fallbackLanguage = value;
            break;
        case "autoCapitalize":
            if (typeof value != "boolean")
                throw new Error('"autoCapitalize" property can be only of type boolean');
            AppTranslator.options.autoCapitalize = value;
            break;
        case "caseSensitive":
            if (typeof value != "boolean")
                throw new Error('"caseSensitive" property can be only of type boolean');
            AppTranslator.options.autoCapitalize = value;
            break;
        case "logs":
            if (typeof value != "boolean")
                throw new Error('"logs" property can be only of type boolean');
            AppTranslator.options.logs = value;
            break;
        default:
            throw new Error(`The provided key "${key}" cannot exist in AppTranslation options`);
    }
};
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
    // If provided string is a number, just return it as string.
    if (typeof originalStr == "number")
        return originalStr.toString();
    // Avoid translation if the vocabularies collection is not defined or translation is bypassed.
    if (AppTranslator.language == "bypass" || !AppTranslator.collection)
        return capitalizeIfRequested(originalStr);
    // Try to get the translated string 
    let translatedWord = findString(originalStr, AppTranslator.collection[AppTranslator.language].pairs);
    if (!translatedWord) {
        if (AppTranslator.options.logs)
            console.warn(`The provided string "${originalStr}" doesn't match any translation in "${AppTranslator.language}" vocabulary.`);
        // Explicit bypass
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
exports.t = AppTranslator.translate;
