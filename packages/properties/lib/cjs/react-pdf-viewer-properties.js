'use strict';

var jsxRuntime = require('react/jsx-runtime');
var core = require('@react-pdf-viewer/core');
var React = require('react');

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

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

var InfoIcon = function () { return (jsxRuntime.jsx(core.Icon, { size: 16, children: jsxRuntime.jsx("path", { d: "M12,1.001c6.075,0,11,4.925,11,11s-4.925,11-11,11s-11-4.925-11-11S5.925,1.001,12,1.001z\n            M14.5,17.005H13\n            c-0.552,0-1-0.448-1-1v-6.5c0-0.276-0.224-0.5-0.5-0.5H10\n            M11.745,6.504L11.745,6.504\n            M11.745,6.5c-0.138,0-0.25,0.112-0.25,0.25\n            S11.607,7,11.745,7s0.25-0.112,0.25-0.25S11.883,6.5,11.745,6.5" }) })); };

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var PropertiesLoader = function (_a) {
    var doc = _a.doc, render = _a.render;
    var _b = React__namespace.useState(), data = _b[0], setData = _b[1];
    React__namespace.useEffect(function () {
        doc.getMetadata()
            .then(function (meta) {
            return Promise.resolve(meta);
        })
            .then(function (meta) {
            return doc.getDownloadInfo().then(function (d) {
                return Promise.resolve({
                    fileName: meta.contentDispositionFilename || '',
                    info: meta.info,
                    length: d.length,
                });
            });
        })
            .then(function (response) {
            setData(response);
        });
    }, []);
    return data ? (render(data)) : (jsxRuntime.jsx("div", { className: "rpv-properties__loader", children: jsxRuntime.jsx(core.Spinner, {}) }));
};

var PropertyItem = function (_a) {
    var label = _a.label, value = _a.value;
    var direction = React__namespace.useContext(core.ThemeContext).direction;
    var isRtl = direction === core.TextDirection.RightToLeft;
    return (jsxRuntime.jsxs("dl", { className: core.classNames({
            'rpv-properties__item': true,
            'rpv-properties__item--rtl': isRtl,
        }), children: [jsxRuntime.jsxs("dt", { className: "rpv-properties__item-label", children: [label, ":"] }), jsxRuntime.jsx("dd", { className: "rpv-properties__item-value", children: value || '-' })] }));
};

var dateRegex = new RegExp('^D:' +
    '(\\d{4})' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '([Z|+|-])?' +
    '(\\d{2})?' +
    "'?" +
    '(\\d{2})?' +
    "'?");
var parse = function (value, min, max, defaultValue) {
    var parsed = parseInt(value, 10);
    return parsed >= min && parsed <= max ? parsed : defaultValue;
};
var convertDate = function (input) {
    var matches = dateRegex.exec(input);
    if (!matches) {
        return null;
    }
    var year = parseInt(matches[1], 10);
    var month = parse(matches[2], 1, 12, 1) - 1;
    var day = parse(matches[3], 1, 31, 1);
    var hour = parse(matches[4], 0, 23, 0);
    var minute = parse(matches[5], 0, 59, 0);
    var second = parse(matches[6], 0, 59, 0);
    var universalTimeRelation = matches[7] || 'Z';
    var offsetHour = parse(matches[8], 0, 23, 0);
    var offsetMinute = parse(matches[9], 0, 59, 0);
    switch (universalTimeRelation) {
        case '-':
            hour += offsetHour;
            minute += offsetMinute;
            break;
        case '+':
            hour -= offsetHour;
            minute -= offsetMinute;
            break;
    }
    return new Date(Date.UTC(year, month, day, hour, minute, second));
};

var getFileName = function (url) {
    var str = url.split('/').pop();
    return str ? str.split('#')[0].split('?')[0] : url;
};

var getFileSize = function (bytes) {
    var sufixes = ['B', 'kB', 'MB', 'GB', 'TB'];
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return "".concat((bytes / Math.pow(1024, i)).toFixed(2), " ").concat(sufixes[i]);
};

var PropertiesModal = function (_a) {
    var doc = _a.doc, fileName = _a.fileName, onToggle = _a.onToggle;
    var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
    var formatDate = function (input) {
        var date = convertDate(input);
        return date ? "".concat(date.toLocaleDateString(), ", ").concat(date.toLocaleTimeString()) : '';
    };
    var renderData = function (data) { return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("div", { className: "rpv-properties__modal-section", children: [jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties
                            ? l10n.properties.fileName
                            : 'File name', value: data.fileName || getFileName(fileName) }), jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties
                            ? l10n.properties.fileSize
                            : 'File size', value: getFileSize(data.length) })] }), jsxRuntime.jsx(core.Separator, {}), jsxRuntime.jsxs("div", { className: "rpv-properties__modal-section", children: [jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties ? l10n.properties.title : 'Title', value: data.info.Title }), jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties ? l10n.properties.author : 'Author', value: data.info.Author }), jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties ? l10n.properties.subject : 'Subject', value: data.info.Subject }), jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties ? l10n.properties.keywords : 'Keywords', value: data.info.Keywords }), jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties ? l10n.properties.creator : 'Creator', value: data.info.Creator }), jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties
                            ? l10n.properties.creationDate
                            : 'Creation date', value: formatDate(data.info.CreationDate) }), jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties
                            ? l10n.properties.modificationDate
                            : 'Modification date', value: formatDate(data.info.ModDate) })] }), jsxRuntime.jsx(core.Separator, {}), jsxRuntime.jsxs("div", { className: "rpv-properties__modal-section", children: [jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties
                            ? l10n.properties.pdfProducer
                            : 'PDF producer', value: data.info.Producer }), jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties
                            ? l10n.properties.pdfVersion
                            : 'PDF version', value: data.info.PDFFormatVersion }), jsxRuntime.jsx(PropertyItem, { label: l10n && l10n.properties
                            ? l10n.properties.pageCount
                            : 'Page count', value: "".concat(doc.numPages) })] })] })); };
    return (jsxRuntime.jsxs("div", { className: "rpv-properties__modal", children: [jsxRuntime.jsx(PropertiesLoader, { doc: doc, render: renderData }), jsxRuntime.jsx("div", { className: "rpv-properties__modal-footer", children: jsxRuntime.jsx(core.Button, { onClick: onToggle, children: l10n && l10n.properties ? l10n.properties.close : 'Close' }) })] }));
};

var TOOLTIP_OFFSET = { left: 0, top: 8 };
var ShowPropertiesButton = function (_a) {
    var onClick = _a.onClick;
    var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
    var label = l10n && l10n.properties ? l10n.properties.showProperties : 'Show properties';
    return (jsxRuntime.jsx(core.Tooltip, { ariaControlsSuffix: "properties", position: core.Position.BottomCenter, target: jsxRuntime.jsx(core.MinimalButton, { ariaLabel: label, testId: "properties__button", onClick: onClick, children: jsxRuntime.jsx(InfoIcon, {}) }), content: function () { return label; }, offset: TOOLTIP_OFFSET }));
};

var useDocument = function (store) {
    var _a = React__namespace.useState(store.get('doc')), currentDoc = _a[0], setCurrentDoc = _a[1];
    var handleDocumentChanged = function (doc) {
        setCurrentDoc(doc);
    };
    React__namespace.useEffect(function () {
        store.subscribe('doc', handleDocumentChanged);
        return function () {
            store.unsubscribe('doc', handleDocumentChanged);
        };
    }, []);
    return { currentDoc: currentDoc };
};

var ShowProperties = function (_a) {
    var children = _a.children, store = _a.store;
    var currentDoc = useDocument(store).currentDoc;
    var fileName = store.get('fileName') || '';
    var defaultChildren = function (props) { return jsxRuntime.jsx(ShowPropertiesButton, __assign({}, props)); };
    var render = children || defaultChildren;
    return currentDoc ? (jsxRuntime.jsx(core.Modal, { ariaControlsSuffix: "properties", target: function (toggle) {
            return render({
                onClick: toggle,
            });
        }, content: function (toggle) { return jsxRuntime.jsx(PropertiesModal, { doc: currentDoc, fileName: fileName, onToggle: toggle }); }, closeOnClickOutside: true, closeOnEscape: true })) : (jsxRuntime.jsx(jsxRuntime.Fragment, {}));
};

var ShowPropertiesMenuItem = function (_a) {
    var onClick = _a.onClick;
    var l10n = React__namespace.useContext(core.LocalizationContext).l10n;
    var label = l10n && l10n.properties ? l10n.properties.showProperties : 'Show properties';
    return (jsxRuntime.jsx(core.MenuItem, { icon: jsxRuntime.jsx(InfoIcon, {}), testId: "properties__menu", onClick: onClick, children: label }));
};

var propertiesPlugin = function () {
    var store = React__namespace.useMemo(function () {
        return core.createStore({
            fileName: '',
        });
    }, []);
    var ShowPropertiesDecorator = function (props) { return jsxRuntime.jsx(ShowProperties, __assign({}, props, { store: store })); };
    var ShowPropertiesButtonDecorator = function () { return jsxRuntime.jsx(ShowProperties, { store: store }); };
    var ShowPropertiesMenuItemDecorator = function (props) { return (jsxRuntime.jsx(ShowPropertiesDecorator, { children: function (p) { return jsxRuntime.jsx(ShowPropertiesMenuItem, __assign({}, p)); } })); };
    return {
        onDocumentLoad: function (props) {
            store.update('doc', props.doc);
        },
        onViewerStateChange: function (viewerState) {
            store.update('fileName', viewerState.file.name);
            return viewerState;
        },
        ShowProperties: ShowPropertiesDecorator,
        ShowPropertiesButton: ShowPropertiesButtonDecorator,
        ShowPropertiesMenuItem: ShowPropertiesMenuItemDecorator,
    };
};

exports.InfoIcon = InfoIcon;
exports.propertiesPlugin = propertiesPlugin;
