# SuperFamily Backup & Restore Guide

## Backup Procedure

### 1. Full Backup (Database + Uploads)

```bash
# Navigate to project directory
cd /path/to/superfamily-dashboard

# Stop containers
docker-compose down

# Backup data directory
tar -czvf superfamily-backup-$(date +%Y%m%d).tar.gz ./data/

# Restart containers
docker-compose up -d
```

### 2. Database-Only Backup

```bash
# Quick copy of SQLite file
cp ./data/superfamily.db ./data/superfamily-backup-$(date +%Y%m%d).db

# Or with compression
gzip -c ./data/superfamily.db > ./data/superfamily-backup-$(date +%Y%m%d).db.gz
```

### 3. Automated Backup Script

```bash
#!/bin/bash
# backup.sh - Run via cron (e.g., daily at 2 AM)
BACKUP_DIR="/path/to/backups"
DB_PATH="./data/superfamily.db"

mkdir -p "$BACKUP_DIR"
timestamp=$(date +%Y%m%d-%H%M%S)
gzip -c "$DB_PATH" > "$BACKUP_DIR/superfamily-$timestamp.db.gz"
echo "$timestamp: Backup completed" >> "$BACKUP_DIR/backup.log"
```

**Cron example** (`crontab -e`):
```
0 2 * * * /path/to/backup.sh
```

---

## Restore Procedure

### 1. Restore from Tarball

```bash
# Stop containers
docker-compose down

# Extract backup
tar -xzvf superfamily-backup-YYYYMMDD.tar.gz

# Restart containers
docker-compose up -d
```

### 2. Restore from Compressed DB

```bash
# Stop containers
docker-compose down

# Restore
gunzip ./data/superfamily-backup-YYYYMMDD.db.gz
# Or if not compressed:
cp ./data/superfamily-backup-YYYYMMDD.db ./data/superfamily.db

# Restart
docker-compose up -d
```

### 3. Point-in-Time Restore

```bash
# List available backups
ls -la ./data/superfamily-backup-*.db.gz

# Pick specific backup and restore
gunzip -k ./data/superfamily-backup-YYYYMMDD.db.gz  # Keep original
# Test by renaming
mv ./data/superfamily.db ./data/superfamily-corrupted.db
mv ./data/superfamily-backup-YYYYMMDD.db ./data/superfamily.db
docker-compose restart backend
```

---

## Important Notes

### Volume Mount Location
- **Host path:** `./data`
- **Container path:** `/app/data`
- **DB filename:** `superfamily.db`

### Critical: Always stop containers before manual restore
```bash
docker-compose down  # Stop containers properly
# THEN do restore
docker-compose up -d  # Restart
```

### Verify after restore
```bash
docker-compose exec backend wget -qO- http://localhost:3001/health
```

### Backup frequency recommendation
- **Daily** for active use
- **Weekly** for low-use
- **Before major updates** (always)

### Offsite backup
Copy `.tar.gz` to cloud storage (Google Drive, S3, etc.) periodically.