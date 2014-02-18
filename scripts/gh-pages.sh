#!/bin/bash
cd ../gh-pages/
git checkout master
git pull
git checkout gh-pages
git pull
cp -Rf ../master/js/ .
cp -Rf ../master/css/ .
cp -Rf ../master/img/ .
cp -f ../master/index.html .
git add .
git commit -m "Update GH-Pages."
git push
cd ../master
