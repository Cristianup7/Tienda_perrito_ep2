# ETAPA 1: Base
FROM nginxinc/nginx-unprivileged:alpine

# Copiamos la plantilla de configuración de Nginx y el entrypoint
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Copiamos los archivos de la web
COPY index.html /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

# Exponemos el puerto 8080
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
