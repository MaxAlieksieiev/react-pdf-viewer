import { ViewMode } from "@react-pdf-viewer/core";
import { type RenderSwitchViewModeProps } from './RenderSwitchViewModeProps';

type RenderSwitchViewMode = (props: RenderSwitchViewModeProps) => React.ReactElement;

export interface SwitchViewModeProps {
    children?: RenderSwitchViewMode;
    mode: ViewMode;
}