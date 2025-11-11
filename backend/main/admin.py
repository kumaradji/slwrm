# admin.py
from django.contrib import admin
from django.db import models
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Profile, Category, EcoStaff, Cart, EcoStaffImage, Message

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Добавляем get_groups в list_display
    list_display = ('email', 'username', 'get_groups', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'groups')  # Добавляем группы в фильтры
    search_fields = ('email', 'username', 'groups__name')  # Добавляем поиск по группам
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username', 'first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )

    def get_groups(self, obj):
        """Возвращает строку с названиями групп пользователя"""
        groups = obj.groups.all()
        if groups:
            return ", ".join([group.name for group in groups])
        return "Нет групп"

    get_groups.short_description = 'Группы'


class EcoStaffImageInline(admin.TabularInline):
    model = EcoStaffImage
    extra = 1


@admin.register(EcoStaff)
class EcoStaffAdmin(admin.ModelAdmin):
    inlines = [EcoStaffImageInline]
    list_display = ('title', 'category', 'price', 'description')
    search_fields = ('title', 'category__name', 'description')
    list_filter = ('category',)
    exclude = ('images',)
    formfield_overrides = {
        models.JSONField: {'widget': admin.widgets.AdminTextareaWidget},
    }


@admin.register(EcoStaffImage)
class EcoStaffImageAdmin(admin.ModelAdmin):
    list_display = ['image', 'ecostaff']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'timestamp', 'is_admin')
    search_fields = ('user__username', 'content')
    list_filter = ('is_admin', 'timestamp')


admin.site.register(Profile)
admin.site.register(Category)
admin.site.register(Cart)