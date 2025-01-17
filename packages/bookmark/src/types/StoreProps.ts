import { type Destination, type PdfJs } from '@max_alieksieiev/react-pdf-viewer-core';

export interface StoreProps {
    // Manage the expanded/collapsed state of each bookmark item
    bookmarkExpandedMap: Map<string, boolean>;
    doc?: PdfJs.PdfDocument;
    jumpToDestination?(destination: Destination): void;
}
