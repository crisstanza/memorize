#!/bin/bash
cd ../gh-pages/
git add .
git commit -m "Update GH-Pages."
git pull
git push
cd ../master
