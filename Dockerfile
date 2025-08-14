# Stage 1: Build frontend
FROM node:22 AS frontend-builder
WORKDIR /app

# (可选) 如果你用 pnpm，取消下一行注释
# RUN npm install -g pnpm

#  仅复制依赖清单以利用缓存
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目源码并构建
COPY . .
RUN npm run build && \
    echo "==== DIST TREE ====" && (ls -alh dist || true) && \
    (find dist -maxdepth 3 -type d -print || true)

# Stage 2: Serve with nginx
FROM nginx:alpine
# 关键修复：大多数 Vite/React/普通 Angular 构建产物直接在 dist 下，没有 browser 子目录
COPY --from=frontend-builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
