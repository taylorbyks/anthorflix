# Anthorflix
![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat)
![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat)
![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat)
![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat)

## Comandos

- Clonar repositório

```
git clone https://github.com/taylorbyks/anthorflix.git
```

- Inicialização rápida com docker
Para facilitar a inicializaçao deixei o dotenv
Ao rodar o comando é criado 3 containers (Postgres, Backend e Frontend)

```
cd anthorflix
docker-compose up
```
### Para acessar

Frontend: localhost:3333
Backend: localhost:3000

## Backend

### Requisitos desenvolvidos:

- CRUD Usuários
  - É possivel atualizar apenas o seu usuário garantindo uma segurança.
- Avaliar Filmes
  - Rota protegida (é necessario enviar o token para fazer a requisição).
  - O sistema de avaliçao é atraves de um nota de 0 a 10
  - É possivel dar uma nota e escrever um comentário.
  - É salva a referencia do usuário que fez o comentário e o id do filme.
- Ver Avaliações
  - Rota protegida (é necessario enviar o token para fazer a requisição).
  - É possivel ver as minhas avaliações e deletar avaliaçoes.
- CRUD Avaliações
  - É possivel atualizar apenas o seu usuário garantindo uma segurança.
- Cadastro de usuário
  - Foi implementado uma rota para o cadastrar um usuário.
- Autenticação
  - Ao fazer um login é retornado um JWT com expiração de 1 dia.
- Banco de dados Postgres
- Docker e docker-compose
- Testes de integraçao e testes unitarios

### Requsitos a desenvolver ou melhorar
- Cadastrar filmes assistidos
- Permitir comentar as avaliações
- Calcular a média das avaliações de um filme

### Tecnologias usadas:

- #### NodeJS com Express e Typescript
- #### PostgreSQL

#### Dependencias

- Jest, Supertest (Efetuar testes de integração)
- Prisma ORM (Realizar conexão e operações no banco)
- JWT (Criar tokens de autenticação)
- Criptojs (Encodar e gerar hashes para proteger senhas)
- Prettier (Formatador de codigo para consistencia e padrão no código)
- Istanbul Badges (Adicionar badges do teste no readme)

### Comandos

- Instalar dependencias

```
yarn
```

- Executar migrations no banco

```
yarn prisma migrate dev
```

- Limpar as migrations executadas no banco

```
yarn prisma migrate reset
```

- Inicar aplicação

```
yarn start
```

- Executar testes

```
yarn test
```

- Vizualizar o banco de dados

```
yarn prisma studio
```

### Váriaveis de Ambiente (.env)

```
DB_HOST=
DB_PORT=
DB_SCHEMA=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=${DB_SCHEMA}&sslmode=prefer
TOKEN_SECRET=
PORT=
```

## Frontend

### Requisitos desenvolvidos:

- Listar Filmes
  - Feito com uma integração com a API do OMDB.
  - É necessario buscar pelo nome do filme para que comecem a aparecer filmes
  - a API do OMDB não fornece tantos detalhes ao buscar por um nome de um filme, os campos que aparecem na listagem são: Titulo, Ano, Poster
- Avaliar Filmes
  - É possivel dar uma nota e escrever um comentário.
- Ver Avaliações
  - É possivel ver as minhas avaliações e deletar avaliaçoes.
- Cadastro de usuário
  - Foi implementado um formulario com validações que permite cadastrar um usuário
- Login
  - Ao fazer o login é retornado um JWT que é armazenado nos cookies do navegador
  - Foi implementado um broadcast de signout, ou seja, caso tenha mais de uma guia, ao fazer o logout todas as guias recebem o evento e fazem o logout tambem.
  - As telas internas do sistema sao protegidas pelo server-side que obriga estar autenticado para acessar.
- Docker e docker-compose

### Requsitos a desenvolver ou melhorar
- Cadastrar filmes assistidos.
- Permitir editar os dados da conta logada.
- Permitir comentar as avaliações.
- Mostrar a média das avaliações de um filme.
- Criar testes.
- Trocar a API de filmes. Inicialmente optei pela API do OMDB pois era mais simples, um grande equivoco pois deveria ter estudado mais a respeito de ambas as API's. como melhoria eu trocaria a API pois ela nao esta sanando todos os requisitos.

### Tecnologias usadas:

- #### ReactJS com o framework NextJS
O NextJS utiliza o conceito de SSR (Server Side Rendering), oferecendo mais performance, consistência e tempo de carregamento mais eficiente em comparação a uma SPA tradicional

#### Dependencias

- ChackraUI (Biblioteca de UI)
- Axios (Realizar requisições)
- React Query (Armazenar requisições e seus status)
- JWT Decode (Decode do token de autenticação)
- Nookies (Gerenciar cookies salvos no navegador)
- React Icons (Pacotes de icones)
- Yup (Validar formulários)

### Comandos

- Instalar dependencias

```
yarn
```

- Build do projeto

```bash
yarn build
```

- Rodar sem o build

```bash
yarn dev
```

- Rodar com o build

```bash
yarn start
```

### Váriaveis de Ambiente (.env)

```
NEXT_PUBLIC_OMDB_API_KEY=
```