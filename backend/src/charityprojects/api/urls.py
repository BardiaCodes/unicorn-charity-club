from .views import charity_project_details, all_project_list, project_category
from rest_framework.routers import DefaultRouter
from django.urls import path

urlpatterns = [
    path('<int:project_id>', charity_project_details),
    path('', all_project_list),
    path('category',project_category)

]