# Generated by Django 3.1.1 on 2020-11-16 08:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0010_auto_20201115_1513'),
    ]

    operations = [
        migrations.RenameField(
            model_name='member',
            old_name='localtion',
            new_name='location',
        ),
    ]
