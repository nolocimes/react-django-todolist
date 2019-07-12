from django.http import JsonResponse
from rest_framework import generics

from .models import Task
from .serializers import TaskSerializer

# GET POST
# Create one and Get all tasks
class TaskListCreate(generics.ListCreateAPIView):
    queryset = Task.objects.exclude(is_done=True)
    serializer_class = TaskSerializer

# GET POST
# Create one and Get all tasks
class TaskListCreateDone(generics.ListCreateAPIView):
    queryset = Task.objects.exclude(is_done=False)
    serializer_class = TaskSerializer

# PUT PATCH DELETE
# Edit and Delete one task
class TaskListUpdate(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    lookup_url_kwarg = 'task_id'
    lookup_field = 'id'

    def get_queryset(self):
        return Task.objects.all()

# Get complete and all task count
def TaskListCount(request):
    response = {}
    response['count_all'] = Task.objects.count()
    response['count_done'] = Task.objects.exclude(is_done=False).count()
    return JsonResponse(response)
