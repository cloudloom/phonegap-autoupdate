#!/bin/sh

rm -f AutoUpdateProject.zip
rm -rf AutoUpdateProject
mkdir AutoUpdateProject

cp config.xml AutoUpdateProject/
cp -rf www/* AutoUpdateProject/

zip -r AutoUpdateProject.zip AutoUpdateProject
rm -rf AutoUpdateProject
