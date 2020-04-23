import { Dictionary, AppTranslatorOptions } from './types';
export declare const _checkInit: () => void;
/**
 * Get a currently loaded dictionary
 * @param language The name of the dictionary to ger
 * @return The requested dictionary or undefined if not found
 */
export declare const getDictionary: (language: string) => Dictionary | undefined;
/**
 * Get the dictionaries names
 * @return An array of the names of the currently loaded dictionaries.
 */
export declare const getAvailableLanguages: () => string[] | undefined;
/**
 * Change the primary language
 * @param language The new primary language
 */
export declare const setLanguage: (language: string) => void;
/**
 * Change the App Translator options
 * @param options An object with the new options
 */
export declare const setOptions: (options: Partial<AppTranslatorOptions>) => void;
