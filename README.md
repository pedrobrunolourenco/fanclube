# Cadastros de Fã-Clubes

## 1. Objetivo
Este MVP tem como objetivo cadastrar fãs e seus específicos ídolos.

## 2. Sobre o Projeto
Trata-se de uma ideia de cunho didático que poderia ser aprimorada com recursos diversificados.

## 3. Referência Técnica
- Foi utilizado **React JS** versão 18.3.1 ou superior.
- **TypeScript** 4.9.5 ou superior.
- A estilização foi feita através da biblioteca **Material UI** 5.15.20, portanto, não foi necessário o uso de folhas de estilo CSS, sendo o projeto totalmente responsivo, utilizando os recursos de estilização do próprio Material UI.
- Este projeto faz uso de 2 componentes internos (Api Rest) desenvolvidos em **Phyton** além de 2 componentes externos. Cada componente interno faz uso do seu próprio **Dockerfile**, e de seu próprio Repositório ambos em **SQLLite**, ORM **Sqlalchemy**, bancos com suas
respectivas tabelas são gerados automaticamente pelos componentes individualmente.

## 4. Subindo o componente Api-Notaveis
### 4.1
- Clonar o projeto em **https://github.com/pedrobrunolourenco/notaveis**
### 4.2
- Abrir um novo terminal na pasta do projeto (onde se encontra o arquivo Dockerfile).
### 4.3 - Executar os comandos abaixo
   ```sh
   docker build -t api-notaveis .
   docker run -d -p 8181:8181 api-notaveis
   ```
- Feito isso a documentação do componente api-notaveis é disponibilizada em `localhost:8181`.

## 5. Subindo o componente Api-Admiradores
### 5.1
- Clonar o projeto em **https://github.com/pedrobrunolourenco/admiradores**
### 5.2
- Abrir um novo terminal na pasta do projeto (onde se encontra o arquivo Dockerfile).
### 5.3 - Executar os comandos abaixo
   ```sh
   docker build -t api-admiradores .
   docker run -d -p 8383:8383 api-admiradores
   ```
- Feito isso a documentação do componente api-admiradores é disponibilizada em `localhost:8383`.

## 6. Apis Externas Utilizadas
### 6.1 - Exemplo de uso da Api Externa disponibilizada pelo WikiPedia
   ```sh
   **https://pt.wikipedia.org/api/rest_v1/page/summary/Chico_Buarque**
   ```
### 6.2 - Exemplo de uso da Api Externa viacep disponibilizada pelo IBGE
   ```sh
   **https://viacep.com.br/ws/01001000/json/**
   ```

## 7. Como subir o projeto Principal
### 7.1
- Abrir um novo terminal na pasta do projeto (onde se encontra o arquivo Dockerfile).
### 7.2 - Executar os comandos abaixo
   ```sh
   docker build -t fanclube .
   docker run -d -p 3000:3000 fanclube
   ```
- Feito isso o App React fanclube é disponibilizado em `localhost:3000`.

