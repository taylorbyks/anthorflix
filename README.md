<p align="center" width="100%">
<img alt="logo" src="frontend\public\logo.png">
</p>

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
  Para facilitar a inicialização deixei o dotenv
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

- Avaliar Filmes
  - Rota protegida (é necessário enviar o token para fazer a requisição).
  - O sistema de avaliação é através de uma nota de 0 a 10
  - É possível dar uma nota e escrever um comentário.
  - É salva a referência do usuário que fez o comentário e o id do filme.
- Ver Avaliações
  - Rota protegida (é necessário enviar o token para fazer a requisição).
  - É possível ver as minhas avaliações e deletar avaliações.
- CRUD Avaliações
  - É possível atualizar apenas o seu usuário garantindo uma segurança.
- Cadastro de usuário
  - Foi implementado uma rota para o cadastrar um usuário.
- CRUD Usuários
  - É possível atualizar apenas o seu usuário garantindo uma segurança.
- Autenticação
  - Ao fazer um login é retornado um JWT com expiração de 1 dia.
- Banco de dados Postgres
- Docker e docker-compose
- Testes de integração e testes unitários

### Requisitos a desenvolver ou melhorar

- Cadastrar filmes assistidos
  - Adicionar um campo 'watched' no usuário, onde seria um array com os ids de filmes assistidos.
- Permitir comentar as avaliações
  - Criar uma tabela de comentários que salva a avaliação, o usuário que comentou e o comentário. Tendo assim a referência.
- Calcular a média das avaliações de um filme
  - Seria necessário gravar os filmes em banco, no momento eles não são gravados.
- Melhorar testes nas avaliações para aumentar o coverange

### Tecnologias usadas:

- #### NodeJS com Express e Typescript
- #### PostgreSQL

#### Dependências

- Jest, Supertest (Efetuar testes de integração)
- Prisma ORM (Realizar conexão e operações no banco)
- JWT (Criar tokens de autenticação)
- Criptojs (Encodar e gerar hashes para proteger senhas)
- Prettier (Formatador de código para consistência e padrão no código)
- Istanbul Badges (Adicionar badges do teste no readme)

### Comandos

- Instalar dependências

```
yarn
```

- Executar migrations no banco

```
yarn prisma migrate dev
```
ou
```
yarn prisma migrate deploy
```

- Limpar as migrations executadas no banco

```
yarn prisma migrate reset
```

- Inciar aplicação

```
yarn start
```

- Build da aplicação

```
yarn build
```

- Executar testes

```
yarn test
```

- Visualizar o banco de dados

```
yarn prisma studio
```

### Variáveis de Ambiente (.env)

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
VERSION=
```

## Frontend

### Requisitos desenvolvidos:

- Listar Filmes
  - Feito com uma integração com a API do OMDB.
  - É necessário buscar pelo nome do filme para que comecem a aparecer filmes
  - a API do OMDB não fornece tantos detalhes ao buscar por um nome de um filme, os campos que aparecem na listagem são: Titulo, Ano, Poster
- Avaliar Filmes
  - É possível dar uma nota e escrever um comentário.
- Ver Avaliações
  - É possível ver as minhas avaliações e deletar avaliações.
- Cadastro de usuário
  - Foi implementado um formulário com validações que permite cadastrar um usuário
- Login
  - Ao fazer o login é retornado um JWT armazenado nos cookies do navegador
  - Foi implementado um broadcast de signout, ou seja, caso tenha mais de uma guia, ao fazer o logout todas as guias recebem o evento e fazem o logout também.
  - As telas internas do sistema são protegidas pelo server-side que obriga estar autenticado para acessar.
- Docker e docker-compose

### Requisitos a desenvolver ou melhorar

- Cadastrar filmes assistidos.
- Permitir editar os dados da conta logada.
  - Já foi implementado no backend
- Permitir comentar as avaliações.
- Permitir editar as avaliações.
  - Já foi implementado no backend
- Mostrar a média das avaliações de um filme.
- Criar testes.
- Trocar a API de filmes e gravar os filmes em banco. Inicialmente optei pela API do OMDB, pois era mais simples, um grande equivoco, pois, deveria ter estudado mais a respeito de ambas as API's. como melhoria eu trocaria a API, pois ela não esta sanando todos os requisitos.

### Tecnologias usadas:

- #### ReactJS com o framework NextJS
  O NextJS utiliza o conceito de SSR (Server Side Rendering), oferecendo mais desempenho, consistência e tempo de carregamento mais eficiente em comparação a uma SPA tradicional

#### Dependências

- ChackraUI (Biblioteca de UI)
- Axios (Realizar requisições)
- React Query (Armazenar requisições e seus status)
- JWT Decode (Decode do token de autenticação)
- Nookies (Gerenciar cookies salvos no navegador)
- React Icons (Pacotes de icones)
- Yup (Validar formulários)

### Comandos

- Instalar dependências

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

### Variáveis de Ambiente (.env)

```
NEXT_PUBLIC_OMDB_API_KEY=