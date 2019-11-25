#!/usr/bin/env bash

cd ocpi-2.1.1-bridge
git pull
npm install
npm run build
sudo service bridge restart
