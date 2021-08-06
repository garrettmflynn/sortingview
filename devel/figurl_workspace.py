from typing import List
import kachery_client as kc

def figurl_workspace(*, channel: str, workspace_uri: str):
    """
    Generate a sortingview url that shows the average waveforms page
    """
    base_url = 'http://localhost:3000'
    object_uri = kc.store_json({
        'type': 'sortingview.workspace.1',
        'data': {
            'workspaceUri': workspace_uri
        }
    })
    object_hash = object_uri.split('/')[2]
    url = f'{base_url}/fig?channel={channel}&figureObject={object_hash}'
    return url

url = figurl_workspace(
    channel='ccm',
    workspace_uri='workspace://acf9d87b54e5daefbf1a6797bdaf5e1faee4834372e6704bdfdd78ed34353ca3'
)
print(url)