#!/bin/bash

# This script converts all images in the src/assets directory to WebP format
# and updates all references in the codebase

# Exit on error
set -e

# Install required tools if not already installed
if ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Convert all images to WebP
echo "Converting images to WebP format..."
find src/assets -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r img; do
    # Skip if already WebP
    if [[ "$img" == *.webp ]]; then
        continue
    fi
    
    # Get file info
    dir=$(dirname "$img")
    filename=$(basename -- "$img")
    extension="${filename##*.}"
    filename_noext="${filename%.*}"
    
    # Convert to WebP
    webp_path="$dir/${filename_noext}.webp"
    
    # Skip if WebP already exists
    if [ -f "$webp_path" ]; then
        echo "Skipping $img - WebP already exists"
    else
        echo "Converting $img to WebP..."
        convert "$img" -quality 85 "$webp_path"
    fi
    
    # Update references in code
    echo "Updating references to $filename in code..."
    find src -type f -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" | xargs sed -i "s|$filename|${filename_noext}.webp|g"
    
    # Remove original file if conversion was successful
    if [ $? -eq 0 ] && [ -f "$webp_path" ]; then
        echo "Removing original file: $img"
        rm "$img"
    fi
done

echo "Image conversion complete!"
