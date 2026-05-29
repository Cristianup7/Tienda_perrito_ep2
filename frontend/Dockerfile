# ETAPA 1: Base
FROM nginxinc/nginx-unprivileged:alpine
# Copiamos nuestra configuración de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf
# Copiamos los archivos de la web
COPY index.html /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

# Exponemos el puerto 8080 (las imágenes unprivileged no pueden usar el 80)
EXPOSE 8080