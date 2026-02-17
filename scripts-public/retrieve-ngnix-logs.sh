#!/bin/sh
set -e

COMPOSE_FILE="docker-compose.prod.yml"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
LINES="${LINES:-100}"

cd "$REPO_ROOT"

if [ "$1" = "--access" ]; then
  docker compose -f "$COMPOSE_FILE" exec nginx tail -n "$LINES" /var/log/nginx/access.log
  exit 0
fi

if [ "$1" = "--errors" ]; then
  docker compose -f "$COMPOSE_FILE" exec nginx tail -n "$LINES" /var/log/nginx/error.log
  exit 0
fi

echo "Usage: $0 --access | --errors"
echo "  --access   show last $LINES lines of nginx access log"
echo "  --errors   show last $LINES lines of nginx error log"
echo "  Set LINES=500 for more lines (default: 100)"
exit 1
