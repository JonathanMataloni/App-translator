import { _checkInit } from './utils';
/**
 * Try to infer the dictionary from the browser.
 * @returns If a dictionary was found, it returns the found language name and sets it as primary language. Otherwise, it returns null.
 */
export const tryUseBrowserLanguage = () => {
    _checkInit();
    const { collection, options: { logs }, } = window.appTranslator;
    if (!collection) {
        console.warn('Cannot use browser language, collection is not defined');
        return null;
    }
    const bcp47tag = navigator.language.split('-');
    const foundDictionary = collection.find((dictionary) => dictionary.bcp47 === bcp47tag[0] || dictionary.bcp47 === `${bcp47tag[0]}-${bcp47tag[1]}`);
    if (!foundDictionary) {
        if (logs)
            console.warn(`Browser language "${bcp47tag}" is not available in the provided dictionaries collection.`);
        return null;
    }
    window.appTranslator.language = foundDictionary.name;
    return foundDictionary.name;
};
