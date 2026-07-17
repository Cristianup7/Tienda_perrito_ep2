# syntax=docker/dockerfile:1.7

FROM nginx:1.27-alpine AS build
WORKDIR /usr/share/nginx/html
COPY index.html app.js ./

FROM nginxinc/nginx-unprivileged:alpine
COPY --from=build /usr/share/nginx/html/ /usr/share/nginx/html/
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --chmod=0755 docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
