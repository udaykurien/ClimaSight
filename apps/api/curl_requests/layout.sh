#!/usr/bin/env bash
# Manual smoke check for GET and PUT /api/layout.
# Usage: EMAIL=you@example.com ./layout.sh
# The password is asked for with a prompt, so it is never in this file or in shell history.
# Optional: API_URL=http://localhost:3000 (default shown).

set -u

API_URL="${API_URL:-http://localhost:3000}"

if [ -z "${EMAIL:-}" ]; then
  echo "Set EMAIL first, for example: EMAIL=you@example.com ./layout.sh"
  exit 1
fi

read -s -p "Password: " PASSWORD
echo

# Build the login body with node, so special characters in the password cannot break the JSON.
LOGIN_BODY=$(EMAIL="$EMAIL" PASSWORD="$PASSWORD" node -p \
  "JSON.stringify({ email: process.env.EMAIL, password: process.env.PASSWORD })")

TOKEN=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "$LOGIN_BODY" \
  | node -p "JSON.parse(require('fs').readFileSync(0, 'utf8')).data.accessToken")

# Print only the length, never the token itself.
if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "Login failed: no access token returned."
  exit 1
fi
echo "Logged in, token length: ${#TOKEN}"

echo
echo "1. GET with a token. Expect 200. data is null only if this user has never saved a layout."
curl -s -i "$API_URL/api/layout" \
  -H "Authorization: Bearer $TOKEN"

echo
echo
echo "2. PUT a valid layout. Expect 200 with { layout, version } in data."
curl -s -i -X PUT "$API_URL/api/layout" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"version":1,"layout":[{"id":"w1","type":"test","x":0,"y":0,"width":4,"height":2}]}'

echo
echo
echo "3. GET again. Expect 200 with the layout saved in step 2."
curl -s -i "$API_URL/api/layout" \
  -H "Authorization: Bearer $TOKEN"

echo
echo
echo "4. PUT with version 0. Expect 400 'Version must be a positive whole number.'"
curl -s -i -X PUT "$API_URL/api/layout" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"version":0,"layout":[]}'

echo
echo
echo "5. GET without a token. Expect 401 'Missing or invalid Authorization header.'"
curl -s -i "$API_URL/api/layout"

echo
