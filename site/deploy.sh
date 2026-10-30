#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════
# KIMSWAP Deploy Script
# Guards against wrong directory, wrong project, bad auth
# ═══════════════════════════════════════════════════════

set -e

TOKEN="${1:-}"
if [ -z "$TOKEN" ]; then
  echo "Usage: ./deploy.sh <vercel-token>"
  exit 1
fi

# ── Guard: must run from site/ directory ────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ "$(basename "$SCRIPT_DIR")" != "site" ]; then
  echo "ERROR: Must run from the site/ directory."
  echo "  cd projects/kim/site && ./deploy.sh <token>"
  exit 1
fi

# ── Guard: .vercel/project.json must reference kim-swap ──
VERCEL_PROJECT='{"projectId":"prj_XubKZDrRmne8J1N8REbqUHSbyRr8","orgId":"team_nA2Bclnvd1gcjtNbIdFjpApP"}'
if [ -f ".vercel/project.json" ]; then
  if ! grep -q "kim" .vercel/project.json 2>/dev/null; then
    echo "WARNING: .vercel/project.json may point to wrong project."
    echo "Contents: $(cat .vercel/project.json)"
  fi
fi

# ── Auth check ───────────────────────────────────────
WHOAMI=$(npx vercel --token "$TOKEN" whoami 2>/dev/null || echo "ERROR")
if [ "$WHOAMI" != "mj1804" ]; then
  echo "ERROR: Vercel auth failed. Got user: $WHOAMI"
  exit 1
fi
echo "✓ Authenticated as mj1804"

# ── Deploy ───────────────────────────────────────────
echo "→ Deploying KimSwap to Vercel..."
DEPLOY_OUTPUT=$(npx vercel deploy --prod --yes --token "$TOKEN" 2>&1)
echo "$DEPLOY_OUTPUT"

# ── Verify ───────────────────────────────────────────
URL=$(echo "$DEPLOY_OUTPUT" | grep -o 'https://[^ ]*\.vercel\.app' | head -1)
if [ -z "$URL" ]; then
  echo "ERROR: Could not parse deployment URL."
  exit 1
fi
echo "✓ Deployed to $URL"

# ── Verify site responds ─────────────────────────────
sleep 3
HTTP_CODE=$(curl -sL -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null || echo "000")
if [ "$HTTP_CODE" != "200" ]; then
  echo "WARNING: Site returned HTTP $HTTP_CODE"
else
  echo "✓ Site verified (HTTP 200)"
fi

echo ""
echo "Deploy complete: $URL"
