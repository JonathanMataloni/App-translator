/**
 * Define a single dictionary Object with a name, a valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag and the string pairs
 */
export interface Dictionary {
    /** The name of the dictionary */
    name: string;
    /** A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag */
    bcp47: string;
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
 * Define a dictionaries collection from dictionaries
 */
export declare type Collection = Array<Dictionary>;
/**
 * Define options for AppTranslator.
 */
export interface AppTranslatorOptions {
    /** Look for the string in dictionary without consider the letters case */
    caseSensitive?: boolean;
    /** Capitalize automatically the first letter */
    autoCapitalize?: boolean;
    /** Emit logs to the console */
    logs?: boolean;
}
