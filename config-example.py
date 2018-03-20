from getpass import getuser
import os

SYSTEM_USER = getuser()

DEBUG = True
TESTING = True

SECRET_KEY = '<put something secret and random in here>'

STATIC_PATH = os.getcwd() + '/static'
