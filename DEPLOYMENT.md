# FocusCue Deployment to Production VPS (217.65.145.244)

## ✅ DEPLOYMENT STATUS: COMPLETE AND LIVE!
- **Landing Page**: https://focus-cue.com ✅
- **Free Web App**: https://focus-cue.com/app ✅
- **SSL Certificate**: Auto-renewing HTTPS ✅
- **Last Updated**: September 8, 2025

## ⚠️ IMPORTANT: This won't affect your other websites!

## DNS Setup (Do this first)
Point `focus-cue.com` to `217.65.145.244` in your DNS provider:
- A record: @ → 217.65.145.244
- A record: www → 217.65.145.244

## FileZilla Upload Instructions

### 1. Upload Website Files
**Local:** `C:\Users\bryan\Dropbox\focuscue-app\website\*`
**Remote:** `/var/www/focus-cue/website/`

Files to upload:
- index.html
- (any images you add later)

### 2. Upload React App Files  
**Local:** The entire `focuscue-app` folder (except node_modules)
**Remote:** `/var/www/focus-cue/app-source/`

## SSH Commands to Run (as root)

### Step 1: Create directories
```bash
mkdir -p /var/www/focus-cue/website
mkdir -p /var/www/focus-cue/app-source
```

### Step 2: Set permissions
```bash
chown -R www-data:www-data /var/www/focus-cue
chmod -R 755 /var/www/focus-cue
```

### Step 3: Install Node.js (if not already installed)
```bash
# Check if Node.js is installed
node --version

# If not installed:
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
```

### Step 4: Build the React app on the server
```bash
cd /var/www/focus-cue/app-source
npm install
npm run build
```

### Step 5: Check available ports first
```bash
# Check what ports are in use
netstat -tulpn | grep LISTEN | grep 300

# If 3001-3004 are taken, we'll use 3005
```

### Step 6: Set up PM2 to run the React app
```bash
# Install PM2 globally if not installed
npm install -g pm2

# Start the app on port 3005 (CORRECT WORKING COMMAND)
cd /var/www/focus-cue/app-source
pm2 start "npx vite --port 3005" --name "focuscue-app"
pm2 save
pm2 startup
```

### Step 6: Configure Nginx
```bash
# Copy the nginx config
cp /var/www/focus-cue/website/nginx-focuscue.conf /etc/nginx/sites-available/focus-cue

# Enable the site
ln -s /etc/nginx/sites-available/focus-cue /etc/nginx/sites-enabled/

# Test Nginx configuration (CRITICAL!)
nginx -t

# If test passes, reload Nginx
systemctl reload nginx
```

### Step 7: Set up SSL with Let's Encrypt
```bash
# Install Certbot if not already installed
apt update
apt install certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d focus-cue.com -d www.focus-cue.com

# Follow the prompts, choose option 2 to redirect HTTP to HTTPS
```

### Step 8: Verify everything is working
```bash
# Check PM2 status
pm2 status

# Check Nginx status
systemctl status nginx

# Test the website
curl -I https://focus-cue.com
```

## Troubleshooting

### If React app loads but shows blank page with 404 asset errors:
**CRITICAL**: The Nginx proxy_pass configuration affects asset loading.
- **WRONG**: `proxy_pass http://localhost:3005/;` (with trailing slash - strips path)
- **CORRECT**: `proxy_pass http://localhost:3005;` (no trailing slash - preserves path)

Vite config must also have: `base: '/app/'` in `vite.config.ts`

### If React app won't build on server:
- The app needs some TypeScript fixes
- We can deploy just the landing page first
- Then fix and deploy the React app later

### If port 3001 is in use:
- Change to another port (3002, 3003, etc.)
- Update the Nginx config proxy_pass accordingly

### To check what's using ports:
```bash
netstat -tulpn | grep LISTEN
```

## Rollback if needed
```bash
# Disable the site
rm /etc/nginx/sites-enabled/focus-cue
systemctl reload nginx

# Stop the React app
pm2 stop focuscue-app
pm2 delete focuscue-app
```

## Notes
- Your other sites remain untouched
- Each site has its own Nginx config file
- PM2 manages the Node.js process separately
- Port 3001 is used internally (not exposed to internet)