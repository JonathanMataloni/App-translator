/**
 * Define a single vocabulary Object with a name, a valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag and the string pairs
 * ```
 * const portuguese = {
 *   name: "Português",
 *   BCP47: "pt",
 *   pairs: {
 *      "base word": "palavra básica";
 *   }
 * }
 * ```
 */
export interface Vocabulary {
    /** The name of the vocabulary */
    name: string;
    /** A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag */
    BCP47: string;
    /** Mapped couples of strings
     * ```
     * { "original string": "translated string" }
     * ```
     */
    pairs: {
        [original: string]: string;
    };
}
/**
 * Define a vocabularies collection Object
 * ```
 * const collection = {
 *  "pt": portugueseVocabulary,
 *  "fr": franchVocabulary
 * }
 * ```
 * Or from an array of vocabularies
 * ```
 * const collection = Object.fromEntries(vocabArr.map(vocab => [vocab.BCP47, vocab]))
 * ```
 */
export interface VocabulariesCollection {
    /** A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag as key name and the relative vocabulary as value */
    [bcp47: string]: Vocabulary;
}
/**
 * Define options for AppTranslator.
 */
export interface AppTranslatorOptions {
    /** A language to use if AppTranslator doesn't find a translated string in the main language. If you want use the original string from source, use "bypass" as value (default: "bypass") */
    fallbackLanguage?: string | "bypass";
    /** Find the original string in vocabulary without consider the case (default: false) */
    caseSensitive?: boolean;
    /** Capitalize automatically the first letter of each translated output, even if return the original string (default: false) */
    autoCapitalize?: boolean;
    /** Emit warns to the console (default: true) */
    logs?: boolean;
}
/** Interface for AppTranslator internal usage. To define options use AppTranslatorOptions interface instead */
interface AppTranslatorOptionsRequired extends Required<AppTranslatorOptions> {
}
/**
 * Define translation resources for your app and translate strings instantly
 * For details and usage see the [documentation](https://github.com/JonathanMataloni/app-translator)
 */
export declare class AppTranslator {
    static options: AppTranslatorOptionsRequired;
    /** The main vocabulary used by AppTranslator.translate() ( aka t() ). Change it with setLanguage() */
    static language: string;
    /** The provided collection of vocabularies. Manage it with addVocabulary() and removeVocabulary() */
    static collection: VocabulariesCollection | null;
    /** The status of AppTranslator. Don't to change it manually */
    static _initialized: boolean;
    /**
     * Initialize AppTranslator
     * @param language The main vocabulary used by AppTranslator.translate() ( aka t() )
     * @param collection (Opt) The collection of vocabularies
     * @param options (Opt) Define AppTranslator behavior
     */
    static initialize: (language: string, collection?: VocabulariesCollection | undefined, options?: AppTranslatorOptions | undefined) => void;
    /**
     * Set a new language as main vocabulary used by AppTranslator.translate() ( aka t() )
     * @param language The main vocabulary tag name
     */
    static setLanguage: (language: string) => void;
    /**
     * Use the browser language if provided by vocabularies collection.
     * @param force (Opt) Set true if you want to use the the browser language as main language even if it not exists in the provided vocabularies collection
     * @returns True if a related vocabulary is available
     */
    static getBrowserLanguage: (force?: boolean | undefined) => boolean;
    /**
     * Add a vocabulary to the current collection
     * @param tag A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag
     * @param vocabulary The related valid vocabulary Object
     */
    static addVocabulary: (tag: string, vocabulary: Vocabulary) => void;
    /**
     * Remove a vocabulary to the current vocabulary collection
     * @param tag A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag, currently present in the vocabulary collection
     */
    static removeVocabulary: (tag: string) => void;
    /**
     * Override a single option to AppTranslator
     * @param key The key name of the option to override
     * @param value The new value of the option
     */
    static setOption: (key: "fallbackLanguage" | "caseSensitive" | "autoCapitalize" | "logs", value: string | boolean) => void;
    /**
     * Translate a string with the provided setup
     * @param originalStr The original string in the source code
     * @param capitalize (Opt) Capitalize the first letter of the output (even if it returns the original string)
     * @returns The translated string in the main language, the fallback language or the original code, capitalized if required
     */
    static translate: (originalStr: string | number, capitalize?: boolean | undefined) => string;
}
/**
 * Translate a string with the provided setup
 * @param originalStr The original string in the source code
 * @param capitalize (Opt) Capitalize the first letter of the output (even if return the original string)
 * @returns The translated string in the main language, the fallback language or the original code, capitalized if required
 */
export declare const t: (originalStr: string | number, capitalize?: boolean | undefined) => string;
export {};
