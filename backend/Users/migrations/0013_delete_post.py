# Generated by Django 2.2.3 on 2020-11-21 10:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0012_remove_post_post_id'),
    ]

    operations = [
        migrations.DeleteModel(
            name='post',
        ),
    ]
