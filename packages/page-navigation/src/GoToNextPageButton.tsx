'use client';

import { LocalizationContext, MinimalButton, Position, Tooltip, type LocalizationMap } from '@max_alieksieiev/react-pdf-viewer-core';
import * as React from 'react';
import { NextIcon } from './NextIcon';
import { type RenderGoToPageProps } from './types/index';

const TOOLTIP_OFFSET = { left: 0, top: 8 };

export const GoToNextPageButton: React.FC<RenderGoToPageProps> = ({ isDisabled, onClick }) => {
    const { l10n } = React.useContext(LocalizationContext);
    const label =
        l10n && l10n.pageNavigation ? ((l10n.pageNavigation as LocalizationMap).goToNextPage as string) : 'Next page';

    return (
        <Tooltip
            ariaControlsSuffix="page-navigation-next"
            position={Position.BottomCenter}
            target={
                <MinimalButton
                    ariaLabel={label}
                    isDisabled={isDisabled}
                    testId="page-navigation__next-button"
                    onClick={onClick}
                >
                    <NextIcon />
                </MinimalButton>
            }
            content={() => label}
            offset={TOOLTIP_OFFSET}
        />
    );
};
