#!/usr/bin/env bash

# Check if origin is correct
if git remote -v show origin | grep github; then
    echo "You must clone the non-github version for this script to be useful."
    exit 0
fi

# Check if github origin is setup
if git remote -v show github | grep github; then
    echo "Github remote is already setup"
else
    echo "Github remot needs to be setup"
    git remote add -m main github git@github.com:LandRegistry/bg-dev-pack-redesign.git
fi

echo "Pushing to origin"
git push origin
echo "Pushing to github"
git push github
