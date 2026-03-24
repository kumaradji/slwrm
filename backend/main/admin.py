# admin.py
from django.contrib import admin
from django.db import models
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from django.utils import timezone
from datetime import timedelta
from .models import CustomUser, Profile, Category, EcoStaff, Cart, EcoStaffImage, Message


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'get_groups', 'is_staff', 'is_active', 'date_joined_display', 'is_new_badge')
    list_filter = ('is_staff', 'is_active', 'groups', 'date_joined')
    search_fields = ('email', 'username', 'groups__name')
    ordering = ('-date_joined',)  # Новые пользователи вверху

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
        groups = obj.groups.all()
        if groups:
            return ", ".join([group.name for group in groups])
        return "—"
    get_groups.short_description = 'Группы'

    def date_joined_display(self, obj):
        """Дата и время регистрации в читаемом формате"""
        return obj.date_joined.strftime('%d.%m.%Y %H:%M')
    date_joined_display.short_description = 'Дата регистрации'
    date_joined_display.admin_order_field = 'date_joined'

    def is_new_badge(self, obj):
        """Зелёный бейдж если пользователь зарегистрировался за последние 7 дней"""
        if obj.date_joined >= timezone.now() - timedelta(days=7):
            return format_html(
                '<span style="'
                'background: #27ae60;'
                'color: white;'
                'padding: 2px 10px;'
                'border-radius: 10px;'
                'font-size: 11px;'
                'font-weight: bold;'
                '">Новый</span>'
            )
        return '—'
    is_new_badge.short_description = 'Статус'


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