#!/bin/bash
# Quick Deployment Script for Render

echo "🚀 Preparing deployment fixes..."

# Stage all changes
git add requirements.txt Procfile server.py render.yaml DEPLOYMENT_FIXES.md

# Commit changes
git commit -m "fix: Update rembg to 2.0.68 for Python 3.13 compatibility + production config

- Updated rembg from 2.0.58 to 2.0.68 (supports Python 3.13+)
- Added gunicorn 21.2.0 for production server
- Updated Procfile to use gunicorn instead of Flask dev server
- Made PORT dynamic in server.py for cloud deployment
- Disabled debug mode for production
- Added render.yaml blueprint for easier deployment
- Added comprehensive deployment documentation"

# Push to main branch
git push origin main

echo "✅ Changes pushed! Render will auto-deploy if connected."
echo "🔍 Check your Render dashboard for build status."
