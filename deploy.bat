@echo off
echo Building the project...
call npm run build

echo Initializing git if not already done...
if not exist .git (
    git init
    git add .
    git commit -m "Initial commit"
)

echo Checking for gh-pages branch...
git show-ref --verify --quiet refs/heads/gh-pages
if %errorlevel% equ 0 (
    git checkout gh-pages
) else (
    git checkout --orphan gh-pages
)

echo Removing existing files...
git rm -rf .

echo Copying build files...
xcopy /E /I build\* .
rmdir /S /Q build

echo Creating CNAME file...
echo irisannationalhighschool.github.io > CNAME

echo Adding files to git...
git add .

echo Committing changes...
git commit -m "Deploy to GitHub Pages"

echo Pushing to GitHub...
git push origin gh-pages --force

echo Switching back to main branch...
git checkout main

echo Deployment complete! Your site should be available at https://irisannationalhighschool.github.io
pause
