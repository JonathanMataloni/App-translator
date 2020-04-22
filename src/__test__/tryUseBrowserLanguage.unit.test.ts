import { setLanguage } from './../utils';
import { tryUseBrowserLanguage } from './../tryUseBrowserLanguage';
import { initTranslator } from './../initTranslator';
import { Collection } from '../types';

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

const warn = jest.fn();
Object.defineProperty(console, 'warn', {
    get() {
        return warn;
    },
});

// Define a custom language tag for jsdom
Object.defineProperty(navigator, 'language', {
    value: 'it-IT',
    writable: true,
});

beforeEach(() => {
    // Clear appTranslator property in window each test
    Object.defineProperty(window, 'appTranslator', {
        value: undefined,
        writable: true,
    });

    warn.mockClear();
});

describe('tryUseBrowserLanguage', () => {
    it('compares both hypened and simple versions of navigator bcp47 tag with the provided collection', () => {
        initTranslator('english', collection);

        // Use default full "it-IT" tag in collection
        expect(tryUseBrowserLanguage()).toBe('italian');
        expect(window.appTranslator.language).toBe('italian');

        // Set a different language to detect changes for the next tryUseBrowserLanguage call
        setLanguage('english');
        expect(warn).not.toBeCalled();

        // Use short version "it" tag
        collection[0].bcp47 = 'it';
        expect(tryUseBrowserLanguage()).toBe('italian');
        expect(window.appTranslator.language).toBe('italian');
    });

    it('does not change the language if unable to find a dictionary', () => {
        initTranslator('english', collection);

        // Use a language not available in the provided collection
        Object.defineProperty(navigator, 'language', {
            value: 'fr-FR',
            writable: true,
        });

        tryUseBrowserLanguage();
        expect(window.appTranslator.language).toBe('english'); // the first defined language
    });

    it("return null if can't find a dictionary", () => {
        initTranslator('english', collection);
        expect(tryUseBrowserLanguage()).toBe(null);
    });

    it("emits a warn if can't find a dictionary", () => {
        initTranslator('english', collection);
        tryUseBrowserLanguage();
        expect(warn).toBeCalledTimes(1);
    });
});
