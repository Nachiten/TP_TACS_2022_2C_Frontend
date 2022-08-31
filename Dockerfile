# Stage 1 - Build the app
FROM node:alpine AS app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Stage 2 - Run the app
FROM nginx:alpine
COPY --from=app-build /app/dist/tp-tacs-2022-2c-grupo-2-frontend /usr/share/nginx/html

# Default nginx port
EXPOSE 80
