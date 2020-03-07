#!/usr/bin/env bash

cd scpi-2.1.1-bridge
git pull
npm install
npm run build
sudo service bridge restart
