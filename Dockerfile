# 多阶段构建 - 前端构建阶段
FROM node:22-alpine AS frontend-build

# 设置工作目录
WORKDIR /app/frontend

# 复制package.json和package-lock.json
COPY frontend/package*.json ./

# 安装依赖
RUN npm install

# 复制前端源代码
COPY frontend/ .

# 构建前端应用
RUN npm run build

# 最终阶段 - 运行时镜像
FROM eclipse-temurin:17-jre-alpine

# 安装Nginx
RUN apk add --no-cache nginx

# 设置工作目录
WORKDIR /app

# 复制前端构建产物到Nginx服务目录
COPY --from=frontend-build /app/frontend/dist/airline-order-frontend/browser /usr/share/nginx/html

# 复制Nginx配置文件
COPY nginx.conf /etc/nginx/http.d/default.conf

# 创建启动脚本
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'nginx' >> /app/start.sh && \
    echo 'java -jar /app/app.jar' >> /app/start.sh && \
    chmod +x /app/start.sh

# 暴露端口
EXPOSE 80 8080

# 设置启动命令
CMD ["sh", "/app/start.sh"]