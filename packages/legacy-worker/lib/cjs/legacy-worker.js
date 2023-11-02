'use strict';

var jsxRuntime = require('react/jsx-runtime');
var core = require('@react-pdf-viewer/core');
var PdfJs = require('pdfjs-dist/legacy/build/pdf');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var PdfJs__namespace = /*#__PURE__*/_interopNamespaceDefault(PdfJs);

var LegacyWorker = function (_a) {
    var children = _a.children, workerUrl = _a.workerUrl;
    var apiProvider = PdfJs__namespace;
    apiProvider.GlobalWorkerOptions.workerSrc = workerUrl;
    return jsxRuntime.jsx(core.PdfJsApiContext.Provider, { value: { pdfJsApiProvider: apiProvider }, children: children });
};

exports.LegacyWorker = LegacyWorker;
