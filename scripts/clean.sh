#!/bin/bash

echo "⚠️ Deleting node modules and package-lock..."
rm -rf node_modules package-lock.json
echo "⚠️ Cleaning npm cache..."
npm cache clean --force
