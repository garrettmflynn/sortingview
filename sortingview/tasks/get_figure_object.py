import kachery_client as kc

# @kc.taskfunction('sortingview.get_figure_object.1', type='pure-calculation')
def task_get_figure_object(figure_object_hash: str):
    return kc.load_json(f'sha1://{figure_object_hash}')