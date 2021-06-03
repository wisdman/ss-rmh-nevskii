#!/bin/sh

BASEDIR=$(dirname "$0")
SRCDIR="$BASEDIR/src"
BUILDDIR="$BASEDIR/build"

rm -rf $BUILDDIR/*
cp -R $SRCDIR/* $BUILDDIR/

cd $BUILDDIR

curl -L --output chrome.zip https://github.com/RobRich999/Chromium_Clang/releases/download/v93.0.4523.0-r886150-win64-avx/chrome.zip
unzip chrome.zip
rm -rf chrome.zip
mv chrome-win32 chrome
mkdir profile

curl -L --output node.zip  https://nodejs.org/dist/v16.2.0/node-v16.2.0-win-x64.zip
unzip node.zip
rm -rf node.zip
mv node-v16.2.0-win-x64 node
