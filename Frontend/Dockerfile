FROM node:22-alpine AS builder
COPY ./src /build/src
COPY *.js /build
COPY *.ts /build
COPY *.json /build
COPY *.html /build
WORKDIR /build
RUN npm ci
RUN npm run build

FROM nginx:1.29.2-alpine
COPY --from=builder /build/dist/ /usr/share/nginx/html