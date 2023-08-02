from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    username = models.CharField(_("username"), max_length=150, unique=True)
    first_name = models.CharField(_("first name"), max_length=150)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name"]

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email
    
    


