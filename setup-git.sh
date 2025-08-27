#!/bin/bash

# Setup Git repository for BookStats project
echo "Setting up Git repository for BookStats..."

# Initialize Git repository
git init

# Add all files to Git
git add .

# Make initial commit
git commit -m "Initial commit: BookStats - Reading Analytics Dashboard

Features:
- Dashboard with reading statistics and charts
- TBR (To-Be-Read) book management
- DNF (Did Not Finish) tracking with percentage completion
- Remind links between books
- Next.js 14 with TypeScript and Tailwind CSS
- SQLite database with Prisma ORM
- Recharts for data visualization"

# Rename branch to main
git branch -M main

# Add remote origin
git remote add origin https://github.com/lyndseymodesitt-dev/trove.git

# Push to GitHub
git push -u origin main

echo "Git repository setup complete!"
echo "Your BookStats project is now available at: https://github.com/lyndseymodesitt-dev/trove"
