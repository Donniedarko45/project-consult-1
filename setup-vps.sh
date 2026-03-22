#!/bin/bash
# ============================================================
# Hostinger VPS Initial Setup Script
# Run this ONCE on your fresh VPS as root
#
# Usage: curl -sSL <raw-github-url>/setup-vps.sh | bash
#   OR:  bash setup-vps.sh
# ============================================================

set -euo pipefail

DOMAIN="${1:-yourdomain.com}"
APP_DIR="/opt/app"
REPO_URL="${2:-https://github.com/Donniedarko45/project-consult-1.git}"

echo "============================================"
echo "  VPS Setup for: $DOMAIN"
echo "============================================"

# --- 1. System Update ---
echo "[1/7] Updating system packages..."
apt-get update && apt-get upgrade -y

# --- 2. Install Docker ---
echo "[2/7] Installing Docker..."
if ! command -v docker &>/dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
    echo "Docker installed successfully."
else
    echo "Docker already installed."
fi

# --- 3. Install Docker Compose (plugin) ---
echo "[3/7] Checking Docker Compose..."
if docker compose version &>/dev/null; then
    echo "Docker Compose plugin already available."
else
    apt-get install -y docker-compose-plugin
    echo "Docker Compose plugin installed."
fi

# --- 4. Install essential tools ---
echo "[4/7] Installing essential tools..."
apt-get install -y git curl wget ufw fail2ban

# --- 5. Configure Firewall ---
echo "[5/7] Configuring firewall..."
ufw --force enable
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp     # SSH
ufw allow 80/tcp     # HTTP
ufw allow 443/tcp    # HTTPS
ufw reload
echo "Firewall configured."

# --- 6. Clone Repository ---
echo "[6/7] Cloning repository..."
if [ -d "$APP_DIR" ]; then
    echo "App directory already exists. Pulling latest..."
    cd $APP_DIR
    git fetch origin main
    git reset --hard origin/main
else
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
fi

# Create necessary directories
mkdir -p certbot/www certbot/conf

# --- 7. Initial SSL Setup ---
echo "[7/7] Setting up SSL certificates..."

# First, start nginx with HTTP only (for Let's Encrypt challenge)
# Create a temporary nginx config for initial cert generation
mkdir -p nginx-init

cat > nginx-init/default.conf << EOF
server {
    listen 80;
    server_name $DOMAIN api.$DOMAIN;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'Server is being configured...';
        add_header Content-Type text/plain;
    }
}
EOF

# Run a temporary nginx for cert generation
docker run -d --name nginx-init \
    -p 80:80 \
    -v $(pwd)/nginx-init/default.conf:/etc/nginx/conf.d/default.conf:ro \
    -v $(pwd)/certbot/www:/var/www/certbot:ro \
    nginx:alpine

sleep 3

# Get SSL certificate
docker run --rm \
    -v $(pwd)/certbot/www:/var/www/certbot \
    -v $(pwd)/certbot/conf:/etc/letsencrypt \
    certbot/certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email admin@$DOMAIN \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d api.$DOMAIN

# Stop and remove temporary nginx
docker stop nginx-init && docker rm nginx-init
rm -rf nginx-init

echo ""
echo "============================================"
echo "  VPS SETUP COMPLETE!"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Create backend/.env with your secrets"
echo "  2. Update DOMAIN in nginx/conf.d/default.conf"
echo "  3. Set NEXT_PUBLIC_API_URL in your environment"
echo "  4. Run: docker compose up -d --build"
echo ""
echo "  OR set up GitHub Secrets and let CI/CD handle it."
echo ""
echo "GitHub Secrets needed:"
echo "  - VPS_HOST         (your VPS IP address)"
echo "  - VPS_USERNAME     (usually 'root')"
echo "  - VPS_SSH_KEY      (your SSH private key)"
echo "  - VPS_PORT         (SSH port, default 22)"
echo "  - DATABASE_URL     (your Neon PostgreSQL URL)"
echo "  - JWT_SECRET"
echo "  - TWILIO_ACCOUNT_SID"
echo "  - TWILIO_AUTH_TOKEN"
echo "  - TWILIO_PHONE_NUMBER"
echo "  - CASHFREE_CLIENT_ID"
echo "  - CASHFREE_CLIENT_SECRET"
echo "  - CASHFREE_ENV"
echo "  - DIGIO_CLIENT_ID"
echo "  - DIGIO_CLIENT_SECRET"
echo "  - DIGIO_ENV"
echo "  - NEXT_PUBLIC_API_URL  (e.g., https://api.$DOMAIN)"
echo "============================================"
