'use client';

import { type PdfJs, type Store, type StoreHandler } from '@max_alieksieiev/react-pdf-viewer-core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';

export const useDocument = (store: Store<StoreProps>): PdfJs.PdfDocument => {
    const [currentDoc, setCurrentDoc] = React.useState(store.get('doc'));

    const handleDocumentChanged: StoreHandler<PdfJs.PdfDocument> = (doc: PdfJs.PdfDocument) => {
        setCurrentDoc(doc);
    };

    React.useEffect(() => {
        store.subscribe('doc', handleDocumentChanged);

        return () => {
            store.unsubscribe('doc', handleDocumentChanged);
        };
    }, []);

    return currentDoc;
};
