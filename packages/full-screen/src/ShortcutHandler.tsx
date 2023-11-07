'use client';

import { isMac, type Store } from '@max_alieksieiev/react-pdf-viewer-core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
import { useEnterFullScreen } from './useEnterFullScreen';

export const ShortcutHandler: React.FC<{
    containerRef: React.RefObject<HTMLDivElement>;
    getFullScreenTarget(pagesContainer: HTMLElement): HTMLElement;
    store: Store<StoreProps>;
}> = ({ containerRef, getFullScreenTarget, store }) => {
    const { enterFullScreen } = useEnterFullScreen(getFullScreenTarget, store);

    const keydownHandler = (e: KeyboardEvent) => {
        if (e.shiftKey || e.altKey) {
            return;
        }
        const areShortcutsPressed = isMac() ? e.metaKey && e.ctrlKey && e.key === 'f' : e.key === 'F11';
        if (!areShortcutsPressed) {
            return;
        }

        const containerEle = containerRef.current;
        if (!containerEle || !document.activeElement || !containerEle.contains(document.activeElement)) {
            return;
        }

        e.preventDefault();
        enterFullScreen();
    };

    React.useEffect(() => {
        const containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }

        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        };
    }, [containerRef.current]);

    return <></>;
};
