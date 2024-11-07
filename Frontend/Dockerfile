FROM node:18.13.0-alpine
WORKDIR /app/react-app
COPY ./package.json .
RUN npm install --force
COPY . .
EXPOSE 10010
CMD ["npm", "run", "dev"]