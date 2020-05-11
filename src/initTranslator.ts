import { setOptions } from './index';
import { getDictionary } from './utils';
import { Collection, AppTranslatorOptions } from './types';

const defaultOptions: Required<AppTranslatorOptions> = {
    autoCapitalize: false,
    caseSensitive: true,
    logs: true,
};

/**
 * Initialize App Translator
 * @param language The name of the primary dictionary
 * @param collection The collection of dictionaries
 * @param options Define App Translator behavior
 */
export const initTranslator = (language: string, collection?: Collection, options?: AppTranslatorOptions): void => {
    if (window.appTranslator?._initialized && window.appTranslator.options.logs)
        throw new Error('AppTranslatar has already been initialized.');

    Object.defineProperty(window, 'appTranslator', {
        value: {
            options: { ...defaultOptions },
            language: language.toLowerCase(),
            collection,
        },
    });

    Object.defineProperty(window.appTranslator, '_initialized', {
        value: true,
        writable: false,
    });

    if (options) setOptions(options);

    if (window.appTranslator.options.logs && !collection)
        console.warn(
            'Dictionaries collection should be defined. Initialization with empty collection is admitted to development purpose only.',
        );

    if (window.appTranslator.options.logs && collection && !getDictionary(language))
        console.error(
            `Choosed language "${language}" is not available in the provided dictionaries collection. Translation functions will be bypassed.`,
        );
};
