#  基础版Dockerfile
 
 # 基础镜像 体积小
# FROM node:16-alpine
FROM luuviethai/node-16-alpine

# 指定工作目录 将代码添加至此
WORKDIR /code

ADD . /code


# 如何将前端项目启动
RUN npm install
RUN npm run build
RUN npm run serve

# 暴露给宿主机映射的端口
EXPOSE 8080