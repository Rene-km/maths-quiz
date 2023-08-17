from django.db import models
from django.utils.translation import gettext as _

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name

class Quizzes(models.Model):
    class Meta: 
        verbose_name = _("Quiz")
        verbose_name_plural = _("Quizzes")
        ordering = ["id"]

    title = models.CharField(max_length=255, default=_("New Quiz"), verbose_name=_("Quiz Title"))
    category = models.ForeignKey(
        Category, default=1, on_delete=models.DO_NOTHING)
    date_created = models.DateTimeField(auto_now_add=True)
    image = models.TextField(_("Image"), default="https://drive.google.com/file/d/1Mk6E-qj8Z_lJCPgdUEXbjgj3wsxvSJNH/view?usp=sharing")

    def __str__(self) -> str:
        return self.title


class Updated(models.Model):
    date_updated = models.DateTimeField(
        verbose_name=_("Last Updated"), auto_now=True)    
    
    class Meta:
        abstract = True

class Question(Updated):

    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")
        ordering = ["id"]

    SCALE = (
        (0, _("Fundamental")),
        (1, _("Beginner")),
        (2, _("Intermediate")),
        (3, _("Advanced")),
        (4, _("Expert"))
    )

    TYPE = (
        (0, _("Multiple Choice")),
    )

    quiz = models.ForeignKey(
        Quizzes, related_name='question', on_delete=models.DO_NOTHING)
    title = models.CharField(
        max_length=255, verbose_name=_("Title"), default=_("New Question"))
    technique = models.IntegerField(
        choices=TYPE, default=0, verbose_name=_("Type of question"))
    difficulty = models.IntegerField(
        choices=SCALE, default=0, verbose_name=_("Difficulty"))
    date_created = models.DateTimeField(
        verbose_name=_("Date Created"), auto_now_add=True)
    is_active = models.BooleanField(
        default=False, verbose_name=_("Active Status"))
    
    def __str__(self) -> str:
        return self.title

class Answer(Updated ):

    class Meta:
        verbose_name = _("Answer")
        verbose_name_plural = _("Answers")
        ordering = ["id"]



    question = models.ForeignKey(
        Question, related_name='answer', on_delete=models.DO_NOTHING
    )
    answer_text = models.CharField(
        max_length=255, verbose_name=_("Answer Text"))
    is_right = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.answer_text