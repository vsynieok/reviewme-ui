# build
FROM node:lts-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# serve
FROM nginx:stable-alpine as server
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]