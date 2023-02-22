FROM node:alpine
RUN apk add --no-cache bash
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh
COPY ./ ./
RUN npm i
RUN npm run build
EXPOSE 3001
CMD ["/usr/wait-for-it.sh", "mysql_db:3306", "--timeout=30", "--", "npm", "run", "preview"]
