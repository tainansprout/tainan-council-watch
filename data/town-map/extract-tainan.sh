#!/bin/bash

if [ $# -ne 1 ]; then
  echo Usage: $0 '<twtown geojson>'
  exit 1
fi

twtown=$1

gron $twtown | fgrep -v features > map.fragment

gron $twtown | fgrep 臺南市 | cut -d'.' -f 2 > tainan.pattern
gron $twtown | fgrep -f tainan.pattern >> map.fragment
gron -u map.fragment | jq 'del(.features[] | nulls)' > tainan-town.json


