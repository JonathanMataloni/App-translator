import { initTranslator } from './../initTranslator';
import { Collection } from '../types';
import { translate } from '../translate';

const collection: Collection = [
    {
        name: 'italian',
        bcp47: 'it-IT',
        pairs: {
            'leave a comment': 'lascia un commento',
        },
    },
];

const error = jest.fn();
Object.defineProperty(console, 'error', {
    get() {
        return error;
    },
});

const warn = jest.fn();
Object.defineProperty(console, 'warn', {
    get() {
        return warn;
    },
});

beforeEach(() => {
    // Clear appTranslator property in window each test
    Object.defineProperty(window, 'appTranslator', {
        value: undefined,
        writable: true,
    });

    error.mockClear();
    warn.mockClear();
});

describe('Translation function', () => {
    it("throws error if App Traslator it's not been initializated first", () => {
        expect(() => translate('something')).toThrowError();
    });

    it('returns always a strigified number if a number is passed', () => {
        initTranslator('italian', collection);
        expect(translate(2)).toBe('2');
    });

    it('returns the passed string if collection is not defined', () => {
        initTranslator('french');
        expect(translate('something')).toBe('something');
    });

    it('returns the passed string if the translation is missing', () => {
        initTranslator('italian', collection);
        expect(translate('spaghetti meatball')).toBe('spaghetti meatball');
    });

    it('returns the translates string if a translation exists', () => {
        initTranslator('italian', collection);
        expect(translate('leave a comment')).toBe('lascia un commento');
    });

    it('returns the capitalized translated string', () => {
        initTranslator('italian', collection);
        expect(translate('leave a comment', true)).toBe('Lascia un commento');
    });

    it('returns the capitalized passed string if the translation is missing', () => {
        initTranslator('italian', collection);
        expect(translate('spaghetti meatball', true)).toBe('Spaghetti meatball');
    });

    it('emits a warn if no dictionaries were found', () => {
        initTranslator('french');
        warn.mockClear();
        translate('something');
        expect(warn).toBeCalledTimes(1);
    });

    it('emits a warn if no translation were found', () => {
        initTranslator('italian', collection);
        warn.mockClear();
        translate('spaghetti meatball');
        expect(warn).toBeCalledTimes(1);
    });
});
