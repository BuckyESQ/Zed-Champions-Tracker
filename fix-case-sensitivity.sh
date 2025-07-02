#!/bin/bash

# Case sensitivity fix script for StableFields ZED Champions Tracker

echo "=== StableFields Case Sensitivity Fix Tool ==="
echo "This script will create a new package with corrected folder case sensitivity"
echo ""

# Check if we're in the right directory
if [ ! -d "public" ] && [ ! -d "Public" ]; then
    echo "Error: Neither 'public' nor 'Public' directory found."
    echo "Please run this script from the root of your StableFields project."
    exit 1
fi

# Create a new folder for the fixed content
echo "Creating directory structure..."
mkdir -p stablefields-fixed/public

# First copy any files in the root
echo "Copying root files..."
for file in *.html *.js *.md LICENSE; do
    if [ -f "$file" ]; then
        cp "$file" stablefields-fixed/
    fi
done

# Copy the public directory content, ensuring lowercase name
if [ -d "public" ]; then
    echo "Copying from lowercase 'public' directory..."
    cp -r public/* stablefields-fixed/public/
elif [ -d "Public" ]; then
    echo "Copying from uppercase 'Public' directory..."
    cp -r Public/* stablefields-fixed/public/
fi

# Check and fix index.html redirects
if [ -f "stablefields-fixed/index.html" ]; then
    echo "Checking index.html for redirects..."
    sed -i 's/Public\//public\//g' stablefields-fixed/index.html
    sed -i 's/"Public\//"public\//g' stablefields-fixed/index.html
    sed -i "s/'Public\//'public\//g" stablefields-fixed/index.html
fi

echo ""
echo "=== Fixed package created in stablefields-fixed/ ==="
echo "Upload the content of this folder to your web server."
echo "Make sure to maintain the lowercase 'public' folder name."
