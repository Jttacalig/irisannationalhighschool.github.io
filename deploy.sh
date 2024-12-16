#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Initialize git if not already done
if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "Initial commit"
fi

# Create or switch to gh-pages branch
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
else
    git checkout --orphan gh-pages
fi

# Remove existing files
git rm -rf .

# Copy build files
cp -r build/* .
rm -rf build

# Add CNAME file if it doesn't exist
if [ ! -f CNAME ]; then
    echo "irisannationalhighschool.github.io" > CNAME
fi

# Add all files
git add .

# Commit changes
git commit -m "Deploy to GitHub Pages"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin gh-pages --force

# Switch back to main branch
git checkout main

echo "Deployment complete! Your site should be available at https://irisannationalhighschool.github.io"
