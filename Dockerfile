FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD [ "npm", "start" ]
FROM nginx:alpine
COPY --from=build /app/dist/todo-list /usr/share/nginx/html
EXPOSE 80