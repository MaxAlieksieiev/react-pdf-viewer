'use client';

import { PdfJsApiContext, type PdfJsApiProvider } from '@max_alieksieiev/react-pdf-viewer-core';
import * as PdfJs from 'pdfjs-dist';
import * as React from 'react';

export const Worker: React.FC<{
    children?: React.ReactNode;
    workerUrl: string;
}> = ({ children, workerUrl }) => {
    const apiProvider = PdfJs as unknown as PdfJsApiProvider;
    apiProvider.GlobalWorkerOptions.workerSrc = workerUrl;

    return <PdfJsApiContext.Provider value={{ pdfJsApiProvider: apiProvider }}>{children}</PdfJsApiContext.Provider>;
};
