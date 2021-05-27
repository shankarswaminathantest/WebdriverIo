FROM node:12.13.1
RUN apt update && apt upgrade -y
RUN apt install -y curl
RUN apt-get install g++ build-essential -y
RUN apt-get install openjdk-8-jre
WORKDIR /usr/src/webdriverio-cucumber
COPY . .
RUN npm install