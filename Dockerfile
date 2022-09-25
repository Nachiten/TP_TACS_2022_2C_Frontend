# Stage 1 - Build the app
FROM node:alpine AS app-build

WORKDIR /app

COPY ./package.json .
RUN npm install

COPY ["./angular.json", "./tsconfig.json", "./tsconfig.app.json", "./"]
COPY nginx/default.conf nginx/default.conf
COPY src/ src/

RUN npm run build

# Stage 2 - Run the app
FROM nginx:alpine
COPY --from=app-build /app/dist/tp-tacs-2022-2c-grupo-2-frontend /usr/share/nginx/html
COPY --from=app-build /app/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN apk add --update --no-cache tzdata
ENV TZ=America/Buenos_Aires

# Default nginx port
EXPOSE 80
