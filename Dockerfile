FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

#docker stop $(docker ps -q --filter "publish=3000")
#docker build -t fanclube .
#docker run -d -p 3000:3000 fanclube