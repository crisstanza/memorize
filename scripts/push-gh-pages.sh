#!/bin/bash
cd ../gh-pages/
git add .
git commit -m "Update GH-Pages."
git checkout master
git pull
git checkout gh-pages
git pull
git push
cd ../master
