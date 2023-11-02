import { ScrollMode } from "@react-pdf-viewer/core";
import { type RenderSwitchScrollModeProps } from './RenderSwitchScrollModeProps';

type RenderSwitchScrollMode = (props: RenderSwitchScrollModeProps) => React.ReactElement;

export interface SwitchScrollModeProps {
    children?: RenderSwitchScrollMode;
    mode: ScrollMode;
}
