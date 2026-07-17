# syntax=docker/dockerfile:1.7
FROM mysql:8.0.36-oracle
ENV MYSQL_ROOT_PASSWORD=admin123
ENV MYSQL_DATABASE=tienda_perritos
ENV MYSQL_USER=alumno
ENV MYSQL_PASSWORD=alumno123
COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
