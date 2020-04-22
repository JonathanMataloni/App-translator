import { Collection } from '../types';
import { initTranslator } from '../initTranslator';

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

describe('Initialization', () => {
    it('prevents multiple initializations', () => {
        initTranslator('english');
        expect(() => initTranslator('english')).toThrowError();
    });

    it('makes _initializated not overwritable', () => {
        initTranslator('english');
        expect(() => (window.appTranslator._initialized = false)).toThrowError();
    });

    it('defines default options if not provided', () => {
        initTranslator('english');
        expect(window.appTranslator.options.autoCapitalize).toBeDefined();
        expect(window.appTranslator.options.caseSensitive).toBeDefined();
        expect(window.appTranslator.options.logs).toBeDefined();
    });

    it('emits a warn if a collection is not provided', () => {
        initTranslator('english');
        expect(warn).toBeCalledTimes(1);
    });

    it('emits a warn if the language passed not exists in provided collection', () => {
        initTranslator('spanish', collection);
        expect(error).toBeCalledTimes(1);
    });
});
