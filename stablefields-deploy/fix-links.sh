#!/bin/bash
# Script to fix all internal links for deployment

echo "Fixing internal links for production deployment..."

# Change directory to the deployment folder
cd /workspaces/Zed-Champions-Tracker/stablefields-deploy

# Replace all /public/ links with relative links
find public -type f -name "*.html" -exec sed -i 's/href="\/public\//href="/g' {} \;
find public -type f -name "*.html" -exec sed -i 's/src="\/public\//src="/g' {} \;

echo "Verifying fixes..."
grep -r "href=\"/public/" --include="*.html" public || echo "All /public/ href links fixed!"
grep -r "src=\"/public/" --include="*.html" public || echo "All /public/ src links fixed!"

echo "Fix complete! Files are ready for deployment via FileZilla."
