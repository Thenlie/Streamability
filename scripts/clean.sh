#!/bin/bash

printf "⚠️ Deleting node modules and package-lock...\n"
rm -rfv node_modules package-lock.json

printf "\n⚠️ Cleaning npm cache...\n"
npm cache clean --force --verbose
