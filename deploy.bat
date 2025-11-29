@echo off
REM Quick Deployment Script for Render (Windows)

echo 🚀 Preparing deployment fixes...

REM Stage all changes
git add requirements.txt Procfile server.py render.yaml DEPLOYMENT_FIXES.md

REM Commit changes
git commit -m "fix: Update rembg to 2.0.68 for Python 3.13 compatibility + production config"

REM Push to main branch
git push origin main

echo.
echo ✅ Changes pushed! Render will auto-deploy if connected.
echo 🔍 Check your Render dashboard for build status.
pause
