#!/bin/sh

find ${PWD} -type f -iname "*.webp" -delete
find ${PWD} -type f -iname "*.psd" -execdir sh -c 'magick "${0%}[0]" -resize 1920x1080 -define webp:lossless=true "${0%.*}.webp"' {} ';'
