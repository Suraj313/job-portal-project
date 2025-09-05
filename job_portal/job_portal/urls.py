from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('jobs.urls')),
    path('api/auth/', include('dj_rest_auth.urls')), # For login, logout
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')), # For registration
]