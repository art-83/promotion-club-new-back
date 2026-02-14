#!/bin/sh
set -e

# Define paths and container names
COMPOSE_FILE="docker-compose.prod.yml"
NGINX_CONTAINER="indaiatuba-new-back-nginx"
SCRIPT_PATH="$(readlink -f "$0")"

# 1. Ensure this script is in the crontab (runs daily at 3am)
(crontab -l 2>/dev/null | grep -v "$SCRIPT_PATH" || true; echo "0 3 * * * $SCRIPT_PATH") | crontab -

# 2. Run the renewal
# This uses the 'certbot' service definition from your compose file
docker compose -f "$COMPOSE_FILE" run --rm certbot

# 3. Reload Nginx to pick up potentially new certificates
docker exec "$NGINX_CONTAINER" nginx -s reload