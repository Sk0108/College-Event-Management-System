from django.contrib import admin  # ✅ make sure this is here
from django.urls import path, include
from users.views import RegisterView, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from django.http import JsonResponse

def root_view(request):
    return JsonResponse({'message': 'Welcome to CEMS API 🎉'})

urlpatterns = [
    path('', root_view),
    path('admin/', admin.site.urls),  # ✅ ADD THIS LINE
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('events.urls')),
]


