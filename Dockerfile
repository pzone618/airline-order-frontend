FROM node:22 AS frontend-builder
WORKDIR /app

# (关键修复) 先安装 pnpm 工具
# RUN npm install -g pnpm

# 复制依赖描述文件以利用缓存
COPY package*.json ./

RUN npm install 
# 复制所有剩余源代码
COPY . .
RUN npm run build

# 阶段2：用 Nginx 提供静态文件
FROM nginx:alpine
COPY --from=frontend-builder /app/dist/airline-order-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
