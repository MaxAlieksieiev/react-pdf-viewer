'use client';

import { LocalizationContext, type LocalizationMap } from '@max_alieksieiev/react-pdf-viewer-core';
import * as React from 'react';
import { SearchIcon } from './SearchIcon';

interface RenderChildren {
    icon: React.ReactElement;
    label: string;
    onClick(): void;
}

export const ShowSearchPopoverDecorator: React.FC<{
    children(props: RenderChildren): React.ReactElement;
    onClick(): void;
}> = ({ children, onClick }) => {
    const { l10n } = React.useContext(LocalizationContext);
    const label = l10n && l10n.search ? ((l10n.search as LocalizationMap).search as string) : 'Search';
    const icon = <SearchIcon />;

    return children({ icon, label, onClick });
};
