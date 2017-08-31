#!/bin/sh

rm -f AutoUpdateProject.zip
rm -rf AutoUpdateProject
mkdir AutoUpdateProject

cp config.xml AutoUpdateProject/
cp www/index.html AutoUpdateProject/
cp www/*.js AutoUpdateProject/

zip -r AutoUpdateProject.zip AutoUpdateProject
rm -rf AutoUpdateProject
