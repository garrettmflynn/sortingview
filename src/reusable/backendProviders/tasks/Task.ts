import { isString, JSONObject, Sha1Hash, JSONValue } from '../kacheryTypes/kacheryTypes'
import { ObjectStorageClient } from '../../objectStorage/createObjectStorageClient'
import checkForTaskReturnValue from './checkForTaskReturnValue'

export type TaskStatus = 'waiting' | 'pending' | 'queued' | 'running' | 'finished' | 'error'
export const isTaskStatus = (x: any): x is TaskStatus => {
    if (!isString(x)) return false
    return ['waiting', 'pending', 'queued', 'running', 'finished', 'error'].includes(x)
} 

export type TaskQueueMessage = {
    type: 'initiateTask'
    task: {
        functionId: string
        kwargs: JSONObject
    }
    taskHash: Sha1Hash
}

class Task<ReturnType> {
    #status: TaskStatus = 'waiting'
    #errorMessage: string = ''
    #returnValue: ReturnType | null = null
    #onStatusChangedCallbacks: ((s: TaskStatus) => void)[] = []
    #timestampInitiated = Number(new Date())
    #timestampCompleted: number | undefined = undefined
    constructor(private onPublishToTaskQueue: (message: TaskQueueMessage) => void, private objectStorageClient: ObjectStorageClient, public taskHash: Sha1Hash, public functionId: string, public kwargs: {[key: string]: any}) {
        ;(async () => {
            const returnValue = await checkForTaskReturnValue(objectStorageClient, taskHash, {deserialize: true})
            if (returnValue) {
                this._setReturnValue(returnValue)
                this._setStatus('finished')
            }
            else {
                console.log('initiating task')
                const t = {functionId, kwargs}
                onPublishToTaskQueue({type: 'initiateTask', 'task': t, taskHash})
                // await axios.post('/api/initiateTask', {task: , taskHash})
            }
        })()
        const timeoutForNoResponse = 10000
        setTimeout(() => {
            if (this.#status === 'waiting') {
                this._setErrorMessage('Timeout while waiting for response from backend provider')
                this._setStatus('error')
            }
        }, timeoutForNoResponse)

    }
    public get status() {
        return this.#status
    }
    public get returnValue() {
        return this.#returnValue
    }
    public get errorMessage() {
        return this.#errorMessage
    }
    public get timestampInitiated() {
        return this.#timestampInitiated
    }
    public get timestampCompleted() {
        return this.#timestampCompleted
    }
    onStatusChanged(cb: (s: TaskStatus) => void) {
        this.#onStatusChangedCallbacks.push(cb)
    }
    _setStatus(s: TaskStatus) {
        if (this.#status === s) return
        this.#status = s
        for (let cb of this.#onStatusChangedCallbacks) cb(this.#status)
        if (['error', 'finished'].includes(s)) this.#timestampCompleted = Number(new Date())
    }
    _setReturnValue(x: JSONValue) {
        this.#returnValue = x as any as ReturnType
    }
    _setErrorMessage(e: string) {
        console.warn(`Error running task (${this.functionId}): ${e}`, this.kwargs)
        this.#errorMessage = e
    }
}

export default Task