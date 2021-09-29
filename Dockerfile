FROM node:14.15-alpine AS ui-build
WORKDIR /usr/src/app
COPY app/ ./app/
RUN cd ang-node && npm install @angular/cli && npm install && npm run build


FROM node:14.15-alpine AS build
WORKDIR /usr/src/app
COPY --from=ui-build /usr/src/app/dist/ang-node ./dist/ang-node
COPY package*.json ./
RUN npm install
COPY server.js .
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/ang-node /usr/share/nginx/html

EXPOSE 3080

CMD ["node", "server.js"]