# Generated by Django 2.2.3 on 2020-10-15 01:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(default='123456', max_length=16),
        ),
    ]
