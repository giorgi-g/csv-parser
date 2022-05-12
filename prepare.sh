rm -rf ./dist && \
npm run build && \
cp package-dist.json ./dist/package.json && \
cp .env.example ./dist/.env.example && \
cp README.md ./dist/README.md && \
cp LICENSE ./dist/LICENSE
