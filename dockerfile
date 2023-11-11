FROM node
WORKDIR /docker/ecoder
COPY package*.json ./ 
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
