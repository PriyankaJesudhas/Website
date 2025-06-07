#!/bin/bash
# ====================================================
# deploy.sh - Production-ready deploy script
#
# Usage:
#   scp deploy.sh ec2-user@YOUR_EC2_IP:/home/ec2-user/
#   ssh ec2-user@YOUR_EC2_IP
#   chmod +x deploy.sh
#   ./deploy.sh
# ====================================================

set -e

# --- CONFIGURATION ---

REPO_URL="https://github.com/PriyankaJesudhas/Website.git"
APP_DIR="/home/ec2-user/app"
BRANCH="release"
BACKEND_DIR="my-site/server"
FRONTEND_DIR="my-site"
BACKEND_START_FILE="index.js"    # adjust if your backend entry is different
BACKEND_LOG="$APP_DIR/logs/backend.log"
FRONTEND_LOG="$APP_DIR/logs/frontend.log"

echo "==== DEPLOY SCRIPT START ====================================="
echo "Timestamp: $(date -u +"%Y-%m-%dT%H:%M:%SZ") (UTC)"
echo

# Ensure app directory exists and clone/pull repo
if [ -d "$APP_DIR/.git" ]; then
  echo "--> $APP_DIR exists. Pulling latest $BRANCH..."
  cd "$APP_DIR"
  git fetch origin
  git checkout "$BRANCH"
  git reset --hard "origin/$BRANCH"
  git pull origin "$BRANCH"
else
  echo "--> Cloning $REPO_URL branch $BRANCH into $APP_DIR..."
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "--> Current commit: $(git rev-parse --short HEAD)"
echo

# Create logs directory if missing
mkdir -p "$APP_DIR/logs"

# Install backend dependencies & restart backend with pm2
if [ -d "$APP_DIR/$BACKEND_DIR" ]; then
  echo "--> Installing backend dependencies..."
  cd "$APP_DIR/$BACKEND_DIR"
  npm install

  echo "--> Starting backend with pm2..."
  sudo npm install -g pm2
  pm2 stop backend-app || true
  pm2 delete backend-app || true
  pm2 start "$BACKEND_START_FILE" --name backend-app --output "$BACKEND_LOG" --error "$BACKEND_LOG"
  pm2 save
  pm2 startup
  echo "--> Backend is running under pm2 as 'backend-app'"
else
  echo "!! Backend directory not found: $APP_DIR/$BACKEND_DIR"
fi

echo

# Install frontend dependencies and build React app
if [ -d "$APP_DIR/$FRONTEND_DIR" ]; then
  echo "--> Installing frontend dependencies..."
  cd "$APP_DIR/$FRONTEND_DIR"
  npm install

  echo "--> Building frontend for production..."
  npm run build

  echo "--> Frontend build complete."
else
  echo "!! Frontend directory not found: $APP_DIR/$FRONTEND_DIR"
fi

echo "--> Serving frontend build with pm2..."
sudo npm install -g serve
pm2 stop frontend-app || true
pm2 delete frontend-app || true
pm2 start "serve" --name frontend-app -- -s dist -l 80 --single --log $FRONTEND_LOG
pm2 save
echo "--> Frontend is served on port 80"

echo
echo "==== DEPLOY SCRIPT COMPLETE =================================="
echo "Frontend production build is ready in $APP_DIR/$FRONTEND_DIR/build"
echo "Backend is running with pm2 process manager."
echo "You can check backend logs: tail -f $BACKEND_LOG"
echo "=============================================================="
