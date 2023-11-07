import { type PdfJs } from '@max_alieksieiev/react-pdf-viewer-core';

export type IsBookmarkExpanded = ({
    bookmark,
    depth,
    doc,
    index,
}: {
    bookmark: PdfJs.Outline;
    depth: number;
    doc: PdfJs.PdfDocument;
    index: number;
}) => boolean;
