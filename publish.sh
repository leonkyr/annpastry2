#!/bin/bash

git checkout --orphan gh-pages
npm install
npm run build
shopt -s extglob
rm -rf !(build)
mv build/* .
rm -rf build
git add --all
git commit -m '`git log -1 --pretty=%B`'
git push origin gh-pages

# http://leonkyr.github.io/annpastry/