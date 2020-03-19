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
    name: string,
    /** A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag */
    BCP47: string,
    /** Mapped couples of strings 
     * ```
     * { "original string": "translated string" }
     * ``` 
     */
    pairs: {
        [original: string]: string;
    }
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
    caseSensitive?: boolean,

    /** Capitalize automatically the first letter of each translated output, even if return the original string (default: false) */
    autoCapitalize?: boolean;

    /** Emit warns to the console (default: true) */
    logs?: boolean;
}

/** Interface for AppTranslator internal usage. To define options use AppTranslatorOptions interface instead */
interface AppTranslatorOptionsRequired extends Required<AppTranslatorOptions> { }

/**
 * Define translation resources for your app and translate strings instantly
 * For details and usage see the [documentation](https://github.com/JonathanMataloni/app-translator)
 */
export class AppTranslator {
    static options: AppTranslatorOptionsRequired = {
        fallbackLanguage: "bypass",
        autoCapitalize: false,
        caseSensitive: true,
        logs: true
    };

    /** The main vocabulary used by AppTranslator.translate() ( aka t() ). Change it with setLanguage() */
    static language: string = "bypass"

    /** The provided collection of vocabularies. Manage it with addVocabulary() and removeVocabulary() */
    static collection: VocabulariesCollection | null = null;

    /** The status of AppTranslator. Don't to change it manually */
    static _initialized: boolean = false;

    /**
     * Initialize AppTranslator
     * @param language The main vocabulary used by AppTranslator.translate() ( aka t() )
     * @param collection (Opt) The collection of vocabularies
     * @param options (Opt) Define AppTranslator behavior
     */
    static initialize = (
        language: string,
        collection?: VocabulariesCollection,
        options?: AppTranslatorOptions
    ): void | never => {
        // Avoid re-initializations
        if (AppTranslator._initialized) throw new Error("AppTranslatar has already been initialized");

        // Override default options if defined by user
        if (options) AppTranslator.options = { ...AppTranslator.options, ...options }

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
        Object.defineProperty(AppTranslator, "initialized", { configurable: false, writable: false })
    };

    /**
     * Set a new language as main vocabulary used by AppTranslator.translate() ( aka t() )
     * @param language The main vocabulary tag name
     */
    static setLanguage = (language: string): void | never => {
        if (!AppTranslator._initialized)
            throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");

        if (!AppTranslator?.collection?.[language] && AppTranslator.options.logs)
            console.warn(`Choosed language "${language}" is not available in the provided vocabularies collection.`);

        AppTranslator.language = language;
    };


    /**
     * Use the browser language if provided by vocabularies collection.
     * @param force (Opt) Set true if you want to use the the browser language as main language even if it not exists in the provided vocabularies collection
     * @returns The browser language tag without the regional code
     */
    static getBrowserLanguage = (force?: boolean): string => {
        if (!AppTranslator._initialized)
            throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
        const bcp47tag = navigator.language.split("-")[0];

        if (!AppTranslator?.collection?.[bcp47tag] && AppTranslator.options.logs) {
            console.warn(`Choosed language "${bcp47tag}" (got from browser navigator) is not available in the provided vocabularies collection.`);
        }

        if (!AppTranslator?.collection?.[bcp47tag] && force) AppTranslator.language = bcp47tag
        return bcp47tag
    }

    /**
     * Add a vocabulary to the current collection
     * @param tag A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag
     * @param vocabulary The related valid vocabulary Object
     */
    static addVocabulary = (tag: string, vocabulary: Vocabulary): void => {
        if (!AppTranslator._initialized) throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
        AppTranslator.collection = { ...AppTranslator.collection, [tag]: vocabulary }
    }

    /**
     * Remove a vocabulary to the current vocabulary collection
     * @param tag A valid [BCP47](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers) tag, currently present in the vocabulary collection
     */
    static removeVocabulary = (tag: string): void => {
        if (!AppTranslator._initialized) new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
        if (!AppTranslator?.collection?.[tag]) {
            if (AppTranslator.options.logs) console.warn(`You can't remove the vocabulary "${tag}" because it doesn't exists in the provided vocabulary collection.`)
        } else if (AppTranslator.collection) delete AppTranslator.collection[tag]
    }

    /**
     * Override a single option to AppTranslator
     * @param key The key name of the option to override
     * @param value The new value of the option
     */
    static setOption = (key: keyof AppTranslatorOptions, value: string | boolean): void | never => {
        if (!AppTranslator._initialized) throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
        switch (key) {
            case "fallbackLanguage":
                if (typeof value != "string") throw new Error('"fallbackLanguage" property can only be of type string')
                if (!AppTranslator.collection?.[value]) throw new Error(`Choosed fallback language  "${value}"  is not available in the provided vocabularies collection.`);
                AppTranslator.options.fallbackLanguage = value
                break;

            case "autoCapitalize":
                if (typeof value != "boolean") throw new Error('"autoCapitalize" property can only be of type boolean')
                AppTranslator.options.autoCapitalize = value
                break;

            case "caseSensitive":
                if (typeof value != "boolean") throw new Error('"caseSensitive" property can only be of type boolean')
                AppTranslator.options.autoCapitalize = value
                break;

            case "logs":
                if (typeof value != "boolean") throw new Error('"logs" property can only be of type boolean')
                AppTranslator.options.logs = value
                break;

            default:
                throw new Error(`The provided key name "${key}" cannot exist in AppTranslation options`)
        }
    }

    /**
     * Translate a string with the provided setup
     * @param originalStr The original string in the source code
     * @param capitalize (Opt) Capitalize the first letter of the output (even if return the original string)
     * @returns The translated string in the main language, the fallback language or the original code, capitalized if required
     */
    static translate = (originalStr: string | number, capitalize?: boolean): string | never => {
        const capitalizeIfRequested = (str: string): string => {
            if (capitalize === undefined) {
                return AppTranslator.options.autoCapitalize ? str[0].toUpperCase() + str.slice(1) : str
            } else
                return capitalize ? str[0].toUpperCase() + str.slice(1) : str[0].toLowerCase() + str.slice(1);
        }

        const findString = (originalStr: string, pairs: { [original: string]: string; }): string | null => {

            if (!AppTranslator.options.caseSensitive) {

                // Find a key with the same text
                let key
                Object.keys(pairs).some(originalKey => {
                    if (originalKey.toLowerCase() == originalStr.toLowerCase()) {
                        key = originalKey
                        return true
                    }
                })

                if (key) return pairs[key];
                else return null

            } else
                return pairs[originalStr] || null;

        }

        // Stop execution if AppTranslator is not initializated 
        if (!AppTranslator._initialized) throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");

        // If provided string is a number, just return it as a string.
        if (typeof originalStr == "number")
            return originalStr.toString()

        // Avoid translation if the vocabularies collection is not defined or translation is bypassed.
        if (AppTranslator.language == "bypass" || !AppTranslator.collection)
            return capitalizeIfRequested(originalStr)

        // Try to fetch the translated string 
        let translatedWord = findString(originalStr, AppTranslator.collection[AppTranslator.language].pairs)

        if (!translatedWord) {
            if (AppTranslator.options.logs)
                console.warn(`The provided string "${originalStr}" doesn't match any translation in "${AppTranslator.language}" vocabulary.`);

            // Return the original string if the fallback language is explicitly bypassed
            if (AppTranslator.options.fallbackLanguage == "bypass")
                return capitalizeIfRequested(originalStr)

            // Try to get the translated string in the fallback language
            translatedWord = findString(originalStr, AppTranslator.collection[AppTranslator.options.fallbackLanguage].pairs)
        }

        if (!translatedWord) throw new Error(`The provided string "${originalStr}" doesn't match any translation in "${AppTranslator.options.fallbackLanguage}" vocabulary that is defined as fallback vocabulary.`)
        else return capitalizeIfRequested(translatedWord)
    };

}

/**
 * Translate a string with the provided setup
 * @param originalStr The original string in the source code
 * @param capitalize (Opt) Capitalize the first letter of the output (even if return the original string)
 * @returns The translated string in the main language, the fallback language or the original code, capitalized if required
 */
export const t = AppTranslator.translate;
