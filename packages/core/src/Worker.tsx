'use client';

import * as React from 'react';

export const Worker: React.FC<{
    children?: React.ReactNode;
    workerUrl: string;
}> = ({ children }) => {
    throw new Error('The Worker component is moved to @react-pdf-viewer/worker or @react-pdf-viewer/legacy-worker');
};
