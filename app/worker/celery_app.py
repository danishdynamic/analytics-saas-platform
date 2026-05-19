from celery import Celery

celery_app = Celery(
    "worker",
    broker="pyamqp://guest@localhost//",
    backend="rpc://",
)

@celery_app.task
def process_notification(payload: dict):
    # TODO: implement notification processing
    return payload
