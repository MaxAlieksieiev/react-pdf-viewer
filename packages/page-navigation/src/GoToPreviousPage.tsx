'use client';

import { type Store } from '@max_alieksieiev/react-pdf-viewer-core';
import * as React from 'react';
import { GoToPreviousPageButton } from './GoToPreviousPageButton';
import { type StoreProps } from './types/StoreProps';
import { type RenderGoToPage, type RenderGoToPageProps } from './types/index';
import { useCurrentPage } from './useCurrentPage';

export const GoToPreviousPage: React.FC<{
    children?: RenderGoToPage;
    store: Store<StoreProps>;
}> = ({ store, children }) => {
    const { currentPage } = useCurrentPage(store);

    const goToPreviousPage = () => {
        const jumpToPreviousPage = store.get('jumpToPreviousPage');
        if (jumpToPreviousPage) {
            jumpToPreviousPage();
        }
    };

    const defaultChildren = (props: RenderGoToPageProps) => (
        <GoToPreviousPageButton isDisabled={props.isDisabled} onClick={props.onClick} />
    );
    const render = children || defaultChildren;

    return render({
        isDisabled: currentPage <= 0,
        onClick: goToPreviousPage,
    });
};
