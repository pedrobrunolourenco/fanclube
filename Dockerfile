FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Comando para rodar a aplicação React
CMD ["npm", "start"]

#docker build -t fanclube .
#docker run -d -p 3000:3000 fanclube