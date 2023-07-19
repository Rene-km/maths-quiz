from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from quiz.serializers import QuizSerializer, RandomQuestionSerializer, QuestionSerializer
from .models import Quizzes, Question



class Quiz(generics.ListAPIView):


    serializer_class = QuizSerializer
    queryset = Quizzes.objects.all()

class RandomQuestion(APIView):
    
    def get(self, request, **kwargs):
        quiz = Quizzes.objects.get(title__iexact=kwargs['topic'])
        question = Question.objects.filter(quiz__title__iexact=kwargs['topic']).order_by('?')
        serializer = RandomQuestionSerializer(question, many=True)
        response_data = {
            'quiz': quiz.title,
            'questions' : serializer.data
        }
        return Response(response_data)

class QuizQuestion(APIView):
    
    def get(self, request, **kwargs):
        quiz = Quizzes.objects.get(title__iexact=kwargs['topic'])
        question = Question.objects.filter(quiz__title__iexact=kwargs['topic'])
        serializer = QuestionSerializer(question, many=True)
        response_data = {
            'quiz': quiz.title,
            'questions' : serializer.data
        }
        return Response(response_data)