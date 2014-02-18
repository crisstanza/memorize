#!/bin/bash
cd ../gh-pages/
cp -Rf ../master/js/ .
cp -Rf ../master/css/ .
cp -Rf ../master/img/ .
cp -Rf ../master/php/ .
cp -f ../master/*.html .
cd ../master
