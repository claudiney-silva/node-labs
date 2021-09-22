# Tic-Tac-Toe

Este é um projeto de Jogo da velha utilizando Node/Typescript e React/Typescript.

- Backend: MongoDB, Overnight, Graceful shutdown e Pino
- Frontend: Redux

## Organização do projeto

- Backend está na raiz do projeto
- Frontend está na subpasta 'frontend-react-ts'

## Requisitos para executar

- Node
- Docker

## Passos para instalação

- Primeiro crie as variáveis de ambiente:
  Backend: Na raiz do projeto crie um arquivo .env com o conteúdo do arquivo '.env.example'

```
PORT=3001
BASE_URL=http://localhost:3001
MONGODB_URL=mongodb://root:rootpassword@localhost:27017/tic-tac-toe-db?authSource=admin
```

Frontend: Na pasta 'frontend-react-ts' crie um arquivo .env com o conteúdo do arquivo 'frontend-react-ts/.env.example'

```
SKIP_PREFLIGHT_CHECK=true
REACT_APP_API_URL=http://localhost:3001
```

- Instalando dependências e compilando o backend

```
  $ npm install
  $ npm run build
```

- Instalando dependências e compilando o frontend

```
  $ cd frontend-react-ts
  $ npm install
  $ npm run build
```

## Executando a aplicação (compilada)

- Subindo o container docker para o mongodb

```
  $ docker-compose up
```

- Para executar a aplicação compilada (frontend e backend juntos)

```
  $ npm run start:local
```

- Para acessar o frontend: http://localhost:3001

- Para acessar a api: http://localhost:3001/api

- Documentação Swagger: http://localhost:3001/api-docs/

## Executando a aplicação (em modo de desenvolvimento)

- Subindo o container docker para o mongodb

```
  $ docker-compose up
```

- Executando o backend (http://localhost:3001)

```
  $ npm run start:dev
```

- Executando o frontend (http://localhost:3000)

```
  $ cd frontend-react-ts
  $ npm run start
```

## Executando Testes

- Testes Unitários

```
  $ npm run test:unit
```

- Testes de Integração

```
  $ npm run test:functional
```

- Todos Testes Juntos

```
  $ npm run test
```
