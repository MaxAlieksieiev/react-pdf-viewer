'use client';

import { LocalizationContext, MenuItem, type LocalizationMap } from '@max_alieksieiev/react-pdf-viewer-core';
import * as React from 'react';
import { NextIcon } from './NextIcon';
import { type RenderGoToPageProps } from './types/index';

export const GoToNextPageMenuItem: React.FC<RenderGoToPageProps> = ({ isDisabled, onClick }) => {
    const { l10n } = React.useContext(LocalizationContext);
    const label =
        l10n && l10n.pageNavigation ? ((l10n.pageNavigation as LocalizationMap).goToNextPage as string) : 'Next page';

    return (
        <MenuItem icon={<NextIcon />} isDisabled={isDisabled} testId="page-navigation__next-menu" onClick={onClick}>
            {label}
        </MenuItem>
    );
};
