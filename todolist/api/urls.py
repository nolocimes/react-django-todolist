from django.urls import path

from . import views

urlpatterns = [
    path('api/task/', views.TaskListCreate.as_view()),
    path('api/task/done/', views.TaskListCreateDone.as_view()),
    path('api/task/<int:task_id>/', views.TaskListUpdate.as_view()),
    path('api/task/count/', views.TaskListCount),
]
