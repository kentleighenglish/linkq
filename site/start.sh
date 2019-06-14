#!/bin/bash

source "../source.sh";

mkdir -p logs

node index.js > logs/server.log 2>&1 &
