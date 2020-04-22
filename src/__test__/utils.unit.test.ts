import { initTranslator } from '../initTranslator';
import { setOptions } from '../utils';
import { Collection } from '../types';

const collection: Collection = [
    {
        name: 'italian',
        bcp47: 'it-IT',
        pairs: {
            'leave a comment': 'lascia un commento',
        },
    },
];

beforeEach(() => {
    // Clear appTranslator property in window each test
    Object.defineProperty(window, 'appTranslator', {
        value: undefined,
        writable: true,
    });
});

describe('setOptions', () => {
    it('merges the old options with the new provided ones', () => {
        initTranslator('italian', collection, {
            autoCapitalize: false,
        });

        expect(window.appTranslator.options.autoCapitalize).toBe(false);
        expect(window.appTranslator.options.caseSensitive).toBe(true);
        expect(window.appTranslator.options.logs).toBe(true);

        setOptions({
            caseSensitive: false,
        });

        expect(window.appTranslator.options.autoCapitalize).toBe(false);
        expect(window.appTranslator.options.caseSensitive).toBe(false);
        expect(window.appTranslator.options.logs).toBe(true);
    });

    it('prevents setting of invalid options', () => {
        expect(() => {
            initTranslator('italian', collection, {
                capitalize: false,
            });
        }).toThrowError();
    });
});

// describe.skip('setLanguage', () => {});
// describe.skip('getAvailableLanguages', () => {});
// describe.skip('getDictionary', () => {});
