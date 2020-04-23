"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var utils_1 = require("./utils");
var defaultOptions = {
    autoCapitalize: false,
    caseSensitive: true,
    logs: true,
};
/**
 * Initialize App Translator
 * @param language The name of the primary dictionary
 * @param collection The collection of dictionaries
 * @param options Define App Translator behavior
 */
exports.initTranslator = function (language, collection, options) {
    var _a;
    if (((_a = window.appTranslator) === null || _a === void 0 ? void 0 : _a._initialized) && window.appTranslator.options.logs)
        throw new Error('AppTranslatar has already been initialized.');
    Object.defineProperty(window, 'appTranslator', {
        value: {
            options: __assign({}, defaultOptions),
            language: language,
            collection: collection,
        },
    });
    Object.defineProperty(window.appTranslator, '_initialized', {
        value: true,
        writable: false,
    });
    if (options)
        index_1.setOptions(options);
    if (window.appTranslator.options.logs && !collection)
        console.warn('Dictionaries collection should be defined. Initialization with empty collection is admitted to development purpose only.');
    if (window.appTranslator.options.logs && collection && !utils_1.getDictionary(language))
        console.error("Choosed language \"" + language + "\" is not available in the provided dictionaries collection. Translation functions will be bypassed.");
};
