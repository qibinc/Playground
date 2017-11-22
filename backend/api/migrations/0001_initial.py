# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-22 11:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AMap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(default='', max_length=100)),
                ('level', models.CharField(default='', max_length=2)),
                ('stars', models.CharField(default='', max_length=1)),
                ('unlock', models.BooleanField(default=False)),
                ('solution', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='DIYMaps',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(default='', max_length=100)),
                ('mapinfo', models.CharField(default='', max_length=100)),
                ('mapname', models.CharField(default='', max_length=100)),
                ('solution', models.TextField(default='', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ImmanentMaps',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.CharField(default='', max_length=3)),
                ('immanentmap', models.CharField(default='', max_length=200)),
                ('standard', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='ToolBox',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.CharField(default='', max_length=2)),
                ('toolbox', models.TextField(default='')),
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
                ('is_active', models.BooleanField(default=False)),
                ('auth_code', models.CharField(default='', max_length=50)),
            ],
        ),
    ]
