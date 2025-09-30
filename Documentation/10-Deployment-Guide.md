# Deployment Guide

## 🚀 Production Deployment

### **System Requirements**

#### **Server Specifications**
- **OS**: Ubuntu 20.04+ / CentOS 8+ / Windows Server 2019+
- **CPU**: 2+ cores
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 20GB+ available space
- **Network**: Stable internet connection for AI APIs

#### **Software Dependencies**
```bash
# Python Environment
Python 3.8+
pip 21.0+
virtualenv or conda

# Database
MySQL 8.0+ or MariaDB 10.5+

# Web Server (Production)
nginx 1.18+
gunicorn 20.0+

# Process Management
systemd (Linux) or Windows Service
```

---

## 📦 Installation Steps

### **1. Environment Setup**

#### **Create Virtual Environment**
```bash
# Using virtualenv
python -m venv event_management_env
source event_management_env/bin/activate  # Linux/Mac
# or
event_management_env\Scripts\activate     # Windows

# Using conda
conda create -n event_management python=3.9
conda activate event_management
```

#### **Install Dependencies**
```bash
# Clone repository
git clone https://github.com/your-repo/event-management-system.git
cd event-management-system

# Install Python packages
pip install -r Backend/requirements.txt

# Verify installation
python -c "import flask, mysql.connector; print('Dependencies OK')"
```

### **2. Database Configuration**

#### **MySQL Setup**
```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create database
CREATE DATABASE event_management_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create application user
CREATE USER 'event_user'@'localhost' IDENTIFIED BY 'secure_password_here';

-- Grant permissions
GRANT ALL PRIVILEGES ON event_management_system.* TO 'event_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

#### **Database Schema Creation**
```bash
# Run database initialization
cd Backend
python -c "
from database import get_db_connection, ensure_database_and_tables
ensure_database_and_tables()
print('Database initialized successfully')
"
```

### **3. Environment Variables**

#### **Create .env File**
```bash
# Backend/.env
FLASK_APP=app.py
FLASK_ENV=production
SECRET_KEY=your-very-secure-secret-key-here

# Database Configuration
DB_HOST=localhost
DB_USER=event_user
DB_PASSWORD=secure_password_here
DB_NAME=event_management_system

# AI API Keys
GEMINI_API_KEY=your_gemini_api_key
COHERE_API_KEY=your_cohere_api_key
GROQ_API_KEY=your_groq_api_key

# Security Settings
SESSION_TIMEOUT=3600
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
```

#### **Load Environment Variables**
```bash
# Install python-dotenv if not included
pip install python-dotenv

# Verify environment loading
python -c "
import os
from dotenv import load_dotenv
load_dotenv()
print('Environment loaded:', bool(os.getenv('SECRET_KEY')))
"
```

---

## 🌐 Production Configuration

### **1. Gunicorn Setup**

#### **Install Gunicorn**
```bash
pip install gunicorn
```

#### **Gunicorn Configuration (gunicorn.conf.py)**
```python
# Backend/gunicorn.conf.py
import multiprocessing

# Server socket
bind = "127.0.0.1:8000"
backlog = 2048

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2

# Restart workers after requests (prevent memory leaks)
max_requests = 1000
max_requests_jitter = 50

# Logging
accesslog = "/var/log/event_management/access.log"
errorlog = "/var/log/event_management/error.log"
loglevel = "info"

# Process naming
proc_name = "event_management_system"

# Server mechanics
daemon = False
pidfile = "/var/run/event_management.pid"
user = "www-data"
group = "www-data"
tmp_upload_dir = None

# SSL (if using HTTPS directly)
# keyfile = "/path/to/ssl/private.key"
# certfile = "/path/to/ssl/certificate.crt"
```

#### **Start Gunicorn**
```bash
cd Backend
gunicorn --config gunicorn.conf.py app:app
```

### **2. Nginx Configuration**

#### **Install Nginx**
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### **Nginx Site Configuration**
```nginx
# /etc/nginx/sites-available/event-management
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL Configuration
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Root directory for static files
    root /path/to/event-management-system;
    
    # Static files (CSS, JS, images)
    location /static/ {
        alias /path/to/event-management-system/Backend/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Frontend HTML files
    location ~* \.(html)$ {
        expires 1h;
        add_header Cache-Control "public";
    }
    
    # API and dynamic content
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffer settings
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Access and error logs
    access_log /var/log/nginx/event_management_access.log;
    error_log /var/log/nginx/event_management_error.log;
}
```

#### **Enable Site**
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/event-management /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### **3. Systemd Service**

#### **Create Service File**
```ini
# /etc/systemd/system/event-management.service
[Unit]
Description=Event Management System
After=network.target mysql.service
Requires=mysql.service

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/path/to/event-management-system/Backend
Environment=PATH=/path/to/event_management_env/bin
ExecStart=/path/to/event_management_env/bin/gunicorn --config gunicorn.conf.py app:app
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true

# Restart policy
Restart=always
RestartSec=10

# Resource limits
LimitNOFILE=65536
LimitCORE=0

[Install]
WantedBy=multi-user.target
```

#### **Enable and Start Service**
```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service
sudo systemctl enable event-management

# Start service
sudo systemctl start event-management

# Check status
sudo systemctl status event-management
```

---

## 🔒 Security Configuration

### **1. Firewall Setup**
```bash
# Ubuntu UFW
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw --force enable

# CentOS firewalld
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### **2. SSL Certificate (Let's Encrypt)**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run

# Setup auto-renewal cron job
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

### **3. Database Security**
```sql
-- Connect to MySQL as root
mysql -u root -p

-- Remove anonymous users
DELETE FROM mysql.user WHERE User='';

-- Remove remote root access
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');

-- Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

-- Reload privileges
FLUSH PRIVILEGES;
```

---

## 📊 Monitoring & Logging

### **1. Log Configuration**

#### **Create Log Directories**
```bash
sudo mkdir -p /var/log/event_management
sudo chown www-data:www-data /var/log/event_management
sudo mkdir -p /var/log/nginx
```

#### **Logrotate Configuration**
```bash
# /etc/logrotate.d/event-management
/var/log/event_management/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        /bin/kill -USR1 `cat /var/run/event_management.pid 2> /dev/null` 2> /dev/null || true
    endscript
}
```

### **2. Health Check Script**
```python
#!/usr/bin/env python3
# /usr/local/bin/event_management_healthcheck.py

import requests
import sys
import json
from datetime import datetime

def health_check():
    """Perform health check on the application"""
    
    try:
        # Check application response
        response = requests.get('https://your-domain.com/', timeout=10)
        
        if response.status_code == 200:
            print(f"✓ Application is healthy - {datetime.now()}")
            return True
        else:
            print(f"✗ Application returned {response.status_code} - {datetime.now()}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"✗ Health check failed: {e} - {datetime.now()}")
        return False

if __name__ == "__main__":
    success = health_check()
    sys.exit(0 if success else 1)
```

#### **Schedule Health Checks**
```bash
# Add to crontab
echo "*/5 * * * * /usr/local/bin/event_management_healthcheck.py >> /var/log/event_management/healthcheck.log 2>&1" | sudo crontab -
```

---

## 🔄 Backup & Recovery

### **1. Database Backup**
```bash
#!/bin/bash
# /usr/local/bin/backup_event_management.sh

BACKUP_DIR="/var/backups/event_management"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="event_management_system"
DB_USER="event_user"
DB_PASS="secure_password_here"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/db_backup_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +7 -delete

echo "Database backup completed: $BACKUP_DIR/db_backup_$DATE.sql.gz"
```

#### **Schedule Backups**
```bash
# Make executable
sudo chmod +x /usr/local/bin/backup_event_management.sh

# Add to crontab (daily backup at 2 AM)
echo "0 2 * * * /usr/local/bin/backup_event_management.sh" | sudo crontab -
```

### **2. Application Backup**
```bash
#!/bin/bash
# /usr/local/bin/backup_app_files.sh

APP_DIR="/path/to/event-management-system"
BACKUP_DIR="/var/backups/event_management"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup application files (excluding cache and logs)
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz \
    --exclude="Backend/__pycache__" \
    --exclude="Backend/*.log" \
    --exclude="Backend/.env" \
    -C $APP_DIR .

# Keep only last 7 days
find $BACKUP_DIR -name "app_backup_*.tar.gz" -mtime +7 -delete

echo "Application backup completed: $BACKUP_DIR/app_backup_$DATE.tar.gz"
```

---

## 📈 Performance Optimization

### **1. Database Optimization**
```sql
-- Add indexes for better performance
USE event_management_system;

-- User queries
CREATE INDEX idx_users_email ON users(email);

-- Event queries
CREATE INDEX idx_events_user_date ON events(user_id, date);
CREATE INDEX idx_events_date_range ON events(date, time);
CREATE INDEX idx_events_category ON events(category);

-- Collaboration queries
CREATE INDEX idx_collaborations_invitee_status ON collaborations(invitee_id, status);
CREATE INDEX idx_assigned_tasks_assignee ON assigned_tasks(assignee_id);

-- Analyze tables for optimization
ANALYZE TABLE users, events, collaborations, assigned_tasks;
```

### **2. Caching Configuration**
```python
# Backend/config.py - Add caching
from flask_caching import Cache

# Cache configuration
CACHE_CONFIG = {
    'CACHE_TYPE': 'redis',
    'CACHE_REDIS_URL': 'redis://localhost:6379/0',
    'CACHE_DEFAULT_TIMEOUT': 300
}

# Alternative: Simple memory cache
# CACHE_CONFIG = {
#     'CACHE_TYPE': 'simple',
#     'CACHE_DEFAULT_TIMEOUT': 300
# }
```

### **3. Static File Optimization**
```bash
# Minify CSS and JavaScript (install tools)
npm install -g uglifycss uglify-js

# Minify CSS files
uglifycss Backend/static/style.css > Backend/static/style.min.css
uglifycss Backend/static/sstyle.css > Backend/static/sstyle.min.css

# Minify JavaScript files
uglifyjs Backend/static/home.js > Backend/static/home.min.js
uglifyjs Backend/static/schedule.js > Backend/static/schedule.min.js
```

---

## 🛠️ Maintenance

### **1. Update Procedure**
```bash
#!/bin/bash
# /usr/local/bin/update_event_management.sh

APP_DIR="/path/to/event-management-system"
BACKUP_DIR="/var/backups/event_management"

echo "Starting update procedure..."

# 1. Backup current version
/usr/local/bin/backup_event_management.sh
/usr/local/bin/backup_app_files.sh

# 2. Stop service
sudo systemctl stop event-management

# 3. Update code
cd $APP_DIR
git pull origin main

# 4. Update dependencies
source ../event_management_env/bin/activate
pip install -r Backend/requirements.txt

# 5. Run database migrations (if any)
python Backend/database.py

# 6. Start service
sudo systemctl start event-management

# 7. Verify service
sleep 5
if systemctl is-active --quiet event-management; then
    echo "Update completed successfully"
else
    echo "Update failed - check logs"
    exit 1
fi
```

### **2. Monitoring Commands**
```bash
# Service status
sudo systemctl status event-management

# View logs
sudo journalctl -u event-management -f

# Application logs
tail -f /var/log/event_management/error.log

# Nginx logs
tail -f /var/log/nginx/event_management_access.log

# Database status
sudo systemctl status mysql
```

This completes the comprehensive documentation package with deployment and maintenance guides for the Event Management System!