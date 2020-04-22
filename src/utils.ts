import { Dictionary, AppTranslatorOptions } from './types';
export const _checkInit = (): void => {
    if (!window.appTranslator._initialized)
        throw new Error('AppTranslator not initialized. Call initTranslator() first.');
};

/**
 * Get a currently loaded dictionary
 * @param language The name of the dictionary to ger
 * @return The requested dictionary or undefined if not found
 */
export const getDictionary = (language: string): Dictionary | undefined => {
    _checkInit();
    return window.appTranslator.collection?.find((dictionary) => dictionary.name === language);
};

/**
 * Get the dictionaries names
 * @return An array of the names of the currently loaded dictionaries.
 */
export const getAvailableLanguages = (): Array<string> | undefined => {
    _checkInit();
    return window.appTranslator.collection?.map((dictionary) => dictionary.name);
};

/**
 * Change the primary language
 * @param language The new primary language
 */
export const setLanguage = (language: string): void => {
    _checkInit();

    if (getDictionary(language)) {
        window.appTranslator.language = language;
    } else console.error(`Language "${language}" not exists in the provided collection`);
};

/**
 * Change the App Translator options
 * @param options An object with the new options
 */
export const setOptions = (options: Partial<AppTranslatorOptions>): void => {
    _checkInit();
    const optionsList = Object.keys(window.appTranslator.options);

    Object.keys(options).forEach((key) => {
        if (!optionsList.includes(key)) {
            throw new Error(`Cannot set "${key}". The option "${key}" does not exist`);
        }
    });

    window.appTranslator.options = { ...window.appTranslator.options, ...options };
};
