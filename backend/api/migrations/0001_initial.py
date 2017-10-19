# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-19 15:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ImmanentMaps',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.CharField(default='', max_length=3)),
                ('immanentmap', models.CharField(default='', max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(default='', max_length=50)),
                ('password', models.CharField(default='', max_length=50)),
                ('phonenumber', models.CharField(default='', max_length=11)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
    ]
