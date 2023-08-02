from django.contrib import admin
from .models import CustomUser

# Register your models here.

@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        "email",
        "first_name",
        "username"
    ]
    search_fields = [
        "email",
        "username"
    ]

    ordering = ["date_joined"]

    fieldsets  = (
        (None, {"fields": ("email", "first_name", "username")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser")}),
        ("Personal", {"fields": ("date_joined",)}),
    )