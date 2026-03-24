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
    ordering = ('-date_joined',)

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
        return obj.date_joined.strftime('%d.%m.%Y %H:%M')
    date_joined_display.short_description = 'Дата регистрации'
    date_joined_display.admin_order_field = 'date_joined'

    def is_new_badge(self, obj):
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
    # Таблица сообщений
    list_display = ('timestamp_display', 'from_user', 'message_preview', 'is_admin_badge', 'recipient')
    list_filter = ('is_admin', 'timestamp')
    search_fields = ('user__username', 'user__email', 'content', 'recipient__username')
    ordering = ('-timestamp',)
    readonly_fields = ('user', 'user_name', 'content', 'timestamp', 'is_admin')

    # Поля при редактировании/ответе
    fields = ('user', 'user_name', 'content', 'timestamp', 'is_admin', 'recipient')

    def timestamp_display(self, obj):
        return obj.timestamp.strftime('%d.%m.%Y %H:%M')
    timestamp_display.short_description = 'Время'
    timestamp_display.admin_order_field = 'timestamp'

    def from_user(self, obj):
        if obj.is_admin:
            return format_html('<span style="color:#c0392b;font-weight:bold;">👤 Admin</span>')
        return format_html('<span style="font-weight:bold;">👤 {}</span>', obj.user_name or '—')
    from_user.short_description = 'От кого'

    def message_preview(self, obj):
        preview = obj.content[:60] + '...' if len(obj.content) > 60 else obj.content
        return preview
    message_preview.short_description = 'Сообщение'

    def is_admin_badge(self, obj):
        if obj.is_admin:
            return format_html(
                '<span style="background:#c0392b;color:white;padding:2px 8px;'
                'border-radius:8px;font-size:11px;">Ответ админа</span>'
            )
        return format_html(
            '<span style="background:#2980b9;color:white;padding:2px 8px;'
            'border-radius:8px;font-size:11px;">Пользователь</span>'
        )
    is_admin_badge.short_description = 'Тип'

    def get_readonly_fields(self, request, obj=None):
        # При создании нового ответа — все поля кроме recipient и content доступны
        if obj is None:
            return ()
        return ('user', 'user_name', 'content', 'timestamp', 'is_admin')

    def save_model(self, request, obj, form, change):
        # При создании нового сообщения из админки — помечаем как ответ админа
        if not obj.pk:
            obj.user = request.user
            obj.user_name = request.user.username
            obj.is_admin = True
        super().save_model(request, obj, form, change)

    def add_view(self, request, form_url='', extra_context=None):
        # Форма добавления нового ответа
        self.fields = ('content', 'recipient')
        return super().add_view(request, form_url, extra_context)

    def change_view(self, request, object_id, form_url='', extra_context=None):
        # Форма просмотра существующего сообщения
        self.fields = ('user', 'user_name', 'content', 'timestamp', 'is_admin', 'recipient')
        return super().change_view(request, object_id, form_url, extra_context)


admin.site.register(Profile)
admin.site.register(Category)
admin.site.register(Cart)