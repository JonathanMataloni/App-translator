export interface Vocabulary {
    name: string,
    BCP47: string,
    pairs: {
        [original: string]: string;
    }
}

export interface VocabulariesCollection {
    // Use a valid BCP47 tag
    [bcp47: string]: Vocabulary;
}

export interface AppTranslatorOptions {
    defaultLang: string;
    caseSensitive: boolean,
    autoCapitalize: boolean;
    mode: "development" | "production";
}

export class AppTranslator {
    static language: string = "en";
    static collection: VocabulariesCollection | null = null;
    static _initialized: boolean = false;
    static translationOptions: AppTranslatorOptions = {
        defaultLang: "en",
        autoCapitalize: false,
        caseSensitive: true,
        mode: "development" 
    };

    static initialize = (
        language: string,
        collection?: VocabulariesCollection,
        options?: AppTranslatorOptions
    ): void => {
        if (!collection && AppTranslator.translationOptions.mode === "development")
            console.warn(
                "Vocabularies collection should be defined. Nullable collection was created for future integrations purpose."
            );
        if (collection && !collection[language]) {
            if (AppTranslator.translationOptions.mode === "development")
                console.warn("Choosed language is not available in the provided vocabularies collection.");
            language = "en";
        }
        AppTranslator.language = language;
        if (collection) AppTranslator.collection = collection;
        if (options) AppTranslator.translationOptions = options;
        AppTranslator._initialized = true;
    };

    static setLanguage = (language: string): void | never => {
        if (!AppTranslator._initialized)
            throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");
        AppTranslator.language = language;
    };

    static translate = (originalStr: string | number, capitalize?: boolean): string | never => {
        const capitalizeString = (word: string) => {
            return word[0].toUpperCase() + word.slice(1);
        };

        if (!AppTranslator._initialized)
            throw new Error("AppTranslator not initialized. Call AppTranslator.initialize() first.");

        if (AppTranslator.language === "bypass" || !AppTranslator.collection)
            return typeof originalStr === "string"
                ? capitalize || AppTranslator.translationOptions.autoCapitalize
                    ? capitalizeString(originalStr)
                    : originalStr
                : originalStr.toString();

        const translatedWord = AppTranslator.collection[AppTranslator.language].pairs[originalStr];
        if (!translatedWord) {
            if (AppTranslator.translationOptions.mode === "development")
                console.warn(
                    `The provided string "${originalStr}" doesn't match any translation in the "${AppTranslator.language}" vocabulary.`
                );

            return typeof originalStr === "string"
                ? capitalize || AppTranslator.translationOptions.autoCapitalize
                    ? capitalizeString(originalStr)
                    : originalStr
                : originalStr.toString();
        } else return capitalize ? capitalizeString(translatedWord) : translatedWord;
    };
}

export const t = AppTranslator.translate;
