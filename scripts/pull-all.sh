#!/bin/bash

git pull
git checkout gh-pages
git pull
git checkout master

cd ../gh-pages

git pull
git checkout master
git pull
git checkout gh-pages

cd ../master

