#!/bin/bash

database_name=$(whoami)_$(basename "$(pwd)")
BASEDIR=$(dirname "$0")

if [ ! -d "$BASEDIR/venv" ]; then
# Set up virtual Python environment
    virtualenv --python=python3 --no-setuptools venv
    echo "Virtualenv created"
# Upgrade to newest version of pip
    venv/bin/pip install pip --upgrade
    venv/bin/pip install setuptools --upgrade

#install pip-tools
    venv/bin/pip install pip-tools --upgrade
    venv/bin/pip-compile --output-file requirements.txt requirements.in
fi

# Install server-side dependencies listed in requirements.pip
venv/bin/pip-sync requirements.txt

# Install npm packages
npm install

#copy config file
if [ ! -f $BASEDIR/config.py ]; then
    cp $BASEDIR/config-example.py config.py
fi

# Build the Frontend files
npm run build-prod
