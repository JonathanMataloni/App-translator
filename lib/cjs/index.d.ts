declare global {
    interface Window {
        appTranslator: {
            _initialized: boolean;
            language: string;
            collection?: Array<{
                name: string;
                bcp47: string;
                pairs: {
                    [original: string]: string;
                };
            }>;
            options: {
                autoCapitalize: boolean;
                caseSensitive: boolean;
                logs: boolean;
            };
        };
    }
}
export * from './initTranslator';
export * from './translate';
export * from './tryUseBrowserLanguage';
export * from './types';
export * from './utils';
