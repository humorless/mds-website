#!/bin/bash

# Build script: Copy resources to public directory
set -e

echo "Building website..."

# Remove existing build directory
if [ -d "public" ]; then
  rm -rf public
fi

# Create public directory
mkdir -p public

# Copy all resources to public
cp -r resources/* public/

echo "Build complete. Output in ./public/"
