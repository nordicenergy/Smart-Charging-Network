#!/usr/bin/env bash

cd ocpi-2.1.1-bridge
npm install
npm run build
sudo service bridge restart
