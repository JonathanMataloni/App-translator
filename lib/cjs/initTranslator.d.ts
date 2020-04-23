import { Collection, AppTranslatorOptions } from './types';
/**
 * Initialize App Translator
 * @param language The name of the primary dictionary
 * @param collection The collection of dictionaries
 * @param options Define App Translator behavior
 */
export declare const initTranslator: (language: string, collection?: Collection | undefined, options?: AppTranslatorOptions | undefined) => void;
