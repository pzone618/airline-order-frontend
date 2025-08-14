# ---------- Stage 1: Build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install deps with cache-friendly layering
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build && \
    echo '==== DIST TREE (top 200 entries) ====' && \
    (find dist -maxdepth 3 -type f -print | sed -n '1,200p' || true)

# Normalize artifacts into /app/dist_final regardless of framework layout
# Handles:
#   - Vite/React:            dist/index.html
#   - Angular default:       dist/<project>/index.html
#   - Angular SSR (browser): dist/<project>/browser/index.html
ARG COMMIT_SHA="dev"
RUN set -eux; \
    mkdir -p /app/dist_final; \
    if [ -f dist/index.html ]; then \
        cp -a dist/* /app/dist_final/; \
    elif [ -f dist/airline-order-frontend/index.html ]; then \
        cp -a dist/airline-order-frontend/* /app/dist_final/; \
    elif [ -f dist/airline-order-frontend/browser/index.html ]; then \
        cp -a dist/airline-order-frontend/browser/* /app/dist_final/; \
    else \
        echo 'Build artifacts not found in known locations.'; \
        echo 'Dist tree (deep):'; \
        find dist -maxdepth 5 -print; \
        exit 1; \
    fi; \
    printf '%s %s\n' \"$COMMIT_SHA\" \"$(date -u +'%Y-%m-%dT%H:%M:%SZ')\" > /app/dist_final/version.txt; \
    echo '==== DIST_FINAL TREE ===='; \
    find /app/dist_final -maxdepth 2 -type f -print

# ---------- Stage 2: Nginx serve ----------
FROM nginx:1.29-alpine

# Copy normalized static assets to nginx root (index.html at root)
COPY --from=build /app/dist_final/ /usr/share/nginx/html/

# NOTE: default.conf is mounted via docker-compose; we don't overwrite it here.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
