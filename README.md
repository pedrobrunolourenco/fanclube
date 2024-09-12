# Cadastros de Fã-Clubes

## 1. Objetivo
Este MVP tem como objetivo cadastrar fãs e seus específicos ídolos.

## 2. Sobre o Projeto
Trata-se de uma ideia de cunho didático que poderia ser aprimorada com recursos diversificados.

## 3. Referência Técnica
- Foi utilizado **React JS** versão 18.3.1 ou superior.
- **TypeScript** 4.9.5 ou superior.
- A estilização foi feita através da biblioteca **Material UI** 5.15.20, portanto, não foi necessário o uso de folhas de estilo CSS, sendo o projeto totalmente responsivo, utilizando os recursos de estilização do próprio Material UI.
- Foi utilizado um mock de BackEnd, através da biblioteca **JSON-Server** versão 0.17.0, permitindo executar ações de posts, puts, gets e deletes, com o JSON mock sendo atualizado.

## 4. Acesso ao protótipo no FIGMA

### Link
Acessar `https://www.figma.com/design/mwKlgi8UObKFA4sfkKjSbU/MVP-PUC?node-id=0-1&t=kj9YkE5QD0mq0TkT-0` no seu navegador.

## 5. Como Rodar o Projeto

### Passo 1
1. Abrir um novo terminal na pasta do projeto (onde se encontra este arquivo README).
2. Rodar o comando:
   ```sh
   npm install
   ```

### Passo 2
1. Abrir um novo terminal na pasta do projeto (onde se encontra este arquivo README).
2. Rodar o comando:
   ```sh
   npx json-server -w -p 3333 .\mock\database.json
   ```
   (Este comando subirá na porta 3333 o simulador do BackEnd controlado pelo pacote JSON-Server).

### Passo 3
1. Abrir um novo terminal na pasta do projeto (onde se encontra este arquivo README).
2. Rodar o comando:
   ```sh
   npm start
   ```
3. Este comando habilitará o projeto em `localhost:3000`.
4. Acessar `http://localhost:3000` no seu navegador.


docker build -t fanclube .
docker run -d -p 8080:80 fanclube
http://localhost:8080

