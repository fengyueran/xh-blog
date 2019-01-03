```
########### 每个指令必须有分号结束。#################

 #配置运行nginx用户或用户组
user root;   
#允许生成的进程数，默认为1
worker_processes 2; 
#制定错误日志路径，级别。这个设置可以放入全局块，http块，server块，级别依次为：debug|info|notice|warn|error|crit|alert|emerg
error_log log/error.log debug; 

events {
#设置网路连接序列化，防止惊群现象发生，默认为on
   accept_mutex on; 
#设置一个进程是否同时接受多个网络连接，默认为off
   multi_accept on; 
#事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
#use epoll; 
#单个work进程允许的最大连接数，默认为512
   worker_connections 1024; 
}

#http服务器
http {
#文件扩展名与文件类型映射表。设定mime类型(邮件支持类型),类型由mime.types文件定义
#include /usr/local/etc/nginx/conf/mime.types;
   include mime.types; 
#默认文件类型，默认为text/plain
   default_type application/octet-stream; 

#自定义日志格式
   log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; 
#设置访问日志路径和格式。"log/"该路径为nginx日志的相对路径，mac下是/usr/local/var/log/。combined为日志格式的默认值
   access_log log/access.log myFormat; 
   rewrite_log on;

#允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。（sendfile系统调用不需要将数据拷贝或者映射到应用程序地址空间中去）
   sendfile on; 
#将tcp_nopush和tcp_nodelay两个指令设置为on用于防止网络阻塞
   tcp_nopush on;
   tcp_nodelay on;
#连接超时时间，默认为75s，可以在http，server，location块。
   keepalive_timeout 65; 

#gzip压缩开关
   gzip on;

#error_page 404 https://www.baidu.com; #错误页

#HTTP服务器

# 静态资源一般放在nginx所在主机
   server {
       listen 8080; #监听HTTP端口
       server_name localhost 149.28.211.15; #监听地址  
       keepalive_requests 120; #单连接请求上限次数
       root /root/www;
       index index.html;  #定义首页索引文件的名称
       location / { 
          root /root/www; #静态资源根目录
          index index.html;
       } 
       location /honey {
          alias /root/www/honey;
          index index.html;
       }
   }
} 
```