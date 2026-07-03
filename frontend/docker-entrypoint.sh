#!/bin/sh

# Backend host predeterminado para desarrollo local.
BACKEND_HOST=${BACKEND_HOST:-backend:3001}

# Generar configuración de Nginx con el host del backend.
sed "s|__BACKEND_HOST__|${BACKEND_HOST}|g" /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
