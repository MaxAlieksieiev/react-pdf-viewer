'use client';

import { type Store } from '@max_alieksieiev/react-pdf-viewer-core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
import { useNumberOfPages } from './useNumberOfPages';

export interface RenderNumberOfPagesProps {
    numberOfPages: number;
}

export type RenderNumberOfPages = (props: RenderNumberOfPagesProps) => React.ReactElement;

export interface NumberOfPagesProps {
    children?: RenderNumberOfPages;
}

export const NumberOfPages: React.FC<{
    children?: RenderNumberOfPages;
    store: Store<StoreProps>;
}> = ({ children, store }) => {
    const { numberOfPages } = useNumberOfPages(store);
    return children ? children({ numberOfPages }) : <>{numberOfPages}</>;
};
