# Stage 1: Build the Vite app
FROM node:20-slim AS vite-builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Create a non-root user
RUN adduser -D appuser

# Fix permissions for required directories
RUN mkdir -p /var/cache/nginx /usr/share/nginx/html /run && \
    chown -R appuser:appuser /usr/share/nginx/html /var/cache/nginx /run

# Copy the built app
COPY --from=vite-builder /app/dist /usr/share/nginx/html

# Use non-root user
USER appuser

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
