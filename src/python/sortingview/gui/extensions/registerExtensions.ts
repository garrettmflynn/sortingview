import { LabboxExtensionContext } from '../pluginInterface'

const registerExtensions = async (context: LabboxExtensionContext) => {
  ;(await import('./correlograms/correlograms')).activate(context)
  ;(await import('./unitstable/unitstable')).activate(context)
  ;(await import('./mountainview/mountainview')).activate(context)
}

export default registerExtensions