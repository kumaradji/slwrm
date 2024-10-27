# Generated by Django 5.0.6 on 2024-06-01 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_ecostaff_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ecostaff',
            name='images',
        ),
        migrations.RemoveField(
            model_name='ecostaff',
            name='videos',
        ),
        migrations.AddField(
            model_name='ecostaff',
            name='image_urls',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.DeleteModel(
            name='EcoImage',
        ),
        migrations.DeleteModel(
            name='EcoVideo',
        ),
    ]
