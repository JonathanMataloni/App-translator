export interface Vocabulary {
    name: string;
    BCP47: string;
    pairs: {
        [original: string]: string;
    };
}
export interface VocabulariesCollection {
    [bcp47: string]: Vocabulary;
}
export interface AppTranslatorOptions {
    fallbackLanguage?: string;
    caseSensitive?: boolean;
    autoCapitalize?: boolean;
    logs?: boolean;
}
interface AppTranslatorOptionsRequired extends Required<AppTranslatorOptions> {
}
export declare class AppTranslator {
    static options: AppTranslatorOptionsRequired;
    static language: string;
    static collection: VocabulariesCollection | null;
    static _initialized: boolean;
    static initialize: (language: string, collection?: VocabulariesCollection | undefined, options?: AppTranslatorOptions | undefined) => void;
    static setLanguage: (language: string) => void;
    static getBrowserLanguage: () => string;
    static addVocabulary: (tag: string, vocabulary: Vocabulary) => void;
    static removeVocabulary: (tag: string) => void;
    static setOption: (key: string, value: string | boolean) => void;
    static translate: (originalStr: string | number, capitalize?: boolean | undefined) => string;
}
export declare const t: (originalStr: string | number, capitalize?: boolean | undefined) => string;
export {};
