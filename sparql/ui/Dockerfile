ARG basePath=/

FROM node:20.16.0-alpine as build

ARG basePath

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build -- --base=${basePath}

FROM nginx:1.19.10-alpine

ARG basePath

COPY --from=build /app/dist /usr/share/nginx/html${basePath}

EXPOSE 80


