from django.db import models

class Task(models.Model) :
    name = models.CharField('Name of the task' ,max_length=100)
    description = models.CharField('Detail of the task', max_length=500, null=True)
    is_done = models.BooleanField('Is the task done?', default=False)
    created_at = models.DateTimeField('Create timestamp' ,auto_now_add=True)
    updated_at = models.DateTimeField('Update timestamp', auto_now_add=True)
