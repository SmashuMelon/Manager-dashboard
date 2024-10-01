from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('api/departments', include('department.urls')),
    path('api/employees', include('employee.urls')),
     path('api/tasks/', include('task.urls')),
    path('admin/', admin.site.urls),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]
