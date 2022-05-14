FROM nginx:latest

COPY config/nginx.conf /etc/nginx/nginx.conf
ADD ./www /www

EXPOSE 80
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]