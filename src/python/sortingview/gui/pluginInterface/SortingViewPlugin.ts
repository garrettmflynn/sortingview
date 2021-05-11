import { LabboxViewPlugin } from ".";
import { CalculationPool } from "../labbox";
import { Recording, RecordingInfo } from "./Recording";
import { Sorting, SortingInfo } from "./Sorting";
import { SortingCuration, SortingCurationAction } from './SortingCuration';
import { SortingSelection, SortingSelectionAction } from "./SortingSelection";

export interface SortingViewProps {
    sorting: Sorting
    recording: Recording
    sortingInfo: SortingInfo
    recordingInfo: RecordingInfo
    curation: SortingCuration
    curationDispatch: ((action: SortingCurationAction) => void) | undefined
    selection: SortingSelection
    selectionDispatch: (a: SortingSelectionAction) => void
    readOnly: boolean | null
    calculationPool?: CalculationPool
    width: number
    height: number
}

export interface SortingViewPlugin extends LabboxViewPlugin {
    type: 'SortingView'
    component: React.ComponentType<SortingViewProps>
    notebookCellHeight?: number
    icon?: any
}