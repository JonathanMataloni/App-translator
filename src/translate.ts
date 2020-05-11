import { _checkInit, getDictionary } from './utils';

/**
 * Translate a string with the provided App Translator setup
 * @param originalString The original string
 * @param capitalize Capitalize the first letter
 * @returns The translated string in the primary language if found, otherwise the original string
 */
export const translate = (originalString: string | number, capitalize?: boolean): string => {
    _checkInit();

    const {
        language,
        options: { caseSensitive, logs, autoCapitalize },
    } = window.appTranslator;

    const dictionary = getDictionary(language);

    if (typeof originalString == 'number') return originalString.toString();

    if (!dictionary) {
        return capitalize || autoCapitalize
            ? originalString[0].toUpperCase() + originalString.slice(1)
            : originalString;
    }

    let translated;

    if (!caseSensitive) {
        // Find a key with the same text
        for (const key in dictionary.pairs) {
            if (key.toLowerCase() === originalString.toLowerCase()) {
                translated = dictionary.pairs[key];
                break;
            }
        }
    } else translated = dictionary.pairs[originalString];

    if (translated === undefined) {
        translated = originalString;
        if (logs)
            console.warn(
                `The provided string "${originalString}" doesn't match any translation in "${language}" dictionary.`,
            );
    }

    return capitalize || autoCapitalize ? translated[0].toUpperCase() + translated.slice(1) : translated;
};

/**
 * Translate a string with the provided App Translator setup
 * @param originalString The original string
 * @param capitalize Capitalize the first letter
 * @returns The translated string in the primary language if found, otherwise the original string
 */
export const t = translate;
