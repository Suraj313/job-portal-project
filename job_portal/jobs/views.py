from rest_framework import generics
from .models import Job
from .serializers import JobSerializer

class JobListView(generics.ListCreateAPIView):
    queryset = Job.objects.all().order_by('-posted_at')
    serializer_class = JobSerializer

class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer