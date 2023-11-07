'use client';

import { LocalizationContext, MenuItem, type LocalizationMap } from '@max_alieksieiev/react-pdf-viewer-core';
import * as React from 'react';
import { UpArrowIcon } from './UpArrowIcon';
import { type RenderGoToPageProps } from './types/index';

export const GoToFirstPageMenuItem: React.FC<RenderGoToPageProps> = ({ isDisabled, onClick }) => {
    const { l10n } = React.useContext(LocalizationContext);
    const label =
        l10n && l10n.pageNavigation ? ((l10n.pageNavigation as LocalizationMap).goToFirstPage as string) : 'First page';

    return (
        <MenuItem icon={<UpArrowIcon />} isDisabled={isDisabled} testId="page-navigation__first-menu" onClick={onClick}>
            {label}
        </MenuItem>
    );
};
