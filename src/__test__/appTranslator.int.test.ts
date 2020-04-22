import { setLanguage, setOptions, initTranslator, t, Collection } from '../';
import isEqual from 'lodash.isequal';

const collection: Collection = [
    {
        name: 'italian',
        bcp47: 'it-IT',
        pairs: {
            'leave a comment': 'lascia un commento',
        },
    },
    {
        name: 'english',
        bcp47: 'en-GB',
        pairs: {
            'submit button': 'Send',
        },
    },
];

describe('App Translator integration test', () => {
    it('initialized successfully', () => {
        initTranslator('english', collection);

        expect(
            isEqual(window.appTranslator, {
                language: 'english',
                collection,
                options: {
                    autoCapitalize: false,
                    caseSensitive: true,
                    logs: true,
                },
            }),
        ).toBeTruthy();

        expect(window.appTranslator._initialized).toBe(true);
    });

    it('sets correctly a new language', () => {
        setLanguage('italian');

        expect(window.appTranslator.language).toBe('italian');
    });

    it('sets correctly new options', () => {
        setOptions({ autoCapitalize: true });

        expect(window.appTranslator.options.autoCapitalize).toBe(true);
    });

    it('translates strings properly', () => {
        expect(t('leave a comment')).toBe('Lascia un commento');
    });
});
