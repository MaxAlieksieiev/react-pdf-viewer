import * as React from 'react';

export interface WorkerProps {
    children?: React.ReactNode;
    workerUrl: string;
}
export class Worker extends React.Component<WorkerProps> {}
