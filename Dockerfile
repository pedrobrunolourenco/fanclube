# Etapa 1: Build
#FROM node:18 AS build

# Definir o diretório de trabalho dentro do contêiner
#WORKDIR /app

# Copiar o package.json e o package-lock.json (se existir)
#COPY package*.json ./
#COPY /mock/database.json ./


# Instalar dependências
#RUN npm install

# Copiar o restante dos arquivos do projeto
#COPY . .

# Construir o aplicativo para produção
#RUN npm run build

# Etapa 2: Runtime (servidor de produção)
#FROM nginx:alpine

# Copiar os arquivos da build para o diretório do nginx
#COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta em que o servidor estará escutando
#EXPOSE 80

# Iniciar o servidor Nginx
#CMD ["nginx", "-g", "daemon off;"]


#######################
# PARA RODAR O DOCKER
# O DOCKER TEM DE ESTAR LEVANTADO
# docker build -t fanclube .
# docker run -d -p 8080:80 fanclube
# http://localhost:8080


# Usar uma imagem Node oficial como base
FROM node:18-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências do frontend
RUN npm install

# Copiar os arquivos do projeto React para dentro do container
COPY . .

# Instalar o json-server globalmente
RUN npm install -g json-server

# Expor a porta 3000 para o React e a porta 5000 para o json-server
EXPOSE 3000 5000

# Comando para rodar React e json-server ao mesmo tempo
CMD ["sh", "-c", "npm run start & json-server --watch mock/database.json --port 5000"]


#docker build -t fanclube .
#docker run -p 3000:3000 -p 5000:5000 fanclube