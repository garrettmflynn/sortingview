import React, { useMemo, useReducer } from 'react'
import { FunctionComponent } from "react"
import { Recording, RecordingInfo, Sorting, SortingInfo, sortingSelectionReducer, SortingViewProps } from '../python/sortingview/extensions/pluginInterface'
import { sortingCurationReducer } from '../python/sortingview/extensions/pluginInterface/workspaceReducer'
import useTask from '../reusable/backendProviders/tasks/useTask'
import MVSortingViewWithCheck from './MVSortingView/MVSortingView'
import {createCalculationPool} from 'labbox'

type Props = {
    recordingUri: string
    sortingUri: string
    width: number
    height: number
}

const calculationPool = createCalculationPool({maxSimultaneous: 6})

const MountainView: FunctionComponent<Props> = ({recordingUri, sortingUri, width, height}) => {
    const {returnValue: recordingInfo} = useTask<RecordingInfo>('recording_info.3', {recording_uri: recordingUri})
    const {returnValue: sortingInfo} = useTask<SortingInfo>('sorting_info.3', {sorting_uri: sortingUri})
    const [curation, curationDispatch] = useReducer(sortingCurationReducer, {})
    const [selection, selectionDispatch] = useReducer(sortingSelectionReducer, {})
    const props = useMemo((): SortingViewProps | undefined => {
        if ((!recordingInfo) || (!sortingInfo)) return undefined
        const sorting: Sorting = {
            sortingId: 'sorting-id',
            sortingLabel: 'sorting-label',
            sortingPath: sortingUri,
            sortingObject: sortingInfo.sorting_object,
            recordingId: 'recording-id',
            recordingPath: recordingUri,
            recordingObject: recordingInfo.recording_object
        }
        const recording: Recording = {
            recordingId: 'recording-id',
            recordingLabel: 'recording-label',
            recordingPath: recordingUri,
            recordingObject: recordingInfo.recording_object
        }
        return {
            sorting,
            recording,
            sortingInfo,
            recordingInfo,
            curation,
            curationDispatch,
            selection,
            selectionDispatch,
            readOnly: true,
            calculationPool,
            width,
            height
        }
    }, [recordingUri, sortingUri, sortingInfo, recordingInfo, curation, curationDispatch, selection, selectionDispatch, width, height])
    if (!props) return <div>Loading</div>
    return (
        <MVSortingViewWithCheck
            {...props}
        />
    )
}

export default MountainView