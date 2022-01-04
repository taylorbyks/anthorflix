# Anthorflix
![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat)
![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat)
![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat)
![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat)

# Backend
## Tecnologias usadas:

- ### NodeJS com Express e Typescript
- ### PostgreSQL

### Dependencias

- Jest, Supertest (Efetuar testes de integração)
- Prisma ORM (Realizar conexão e operações no banco)
- JWT (Criar tokens de autenticação)
- Criptojs (Encodar e gerar hashes para proteger senhas)
- Prettier (Formatador de codigo para consistencia e padrão no código)
- Istanbul Badges (Adicionar badges do teste no readme)

## Comandos

- Clonar repositório

```
git clone https://github.com/taylorbyks/anthorflix.git
```

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

## Váriaveis de Ambiente (.env)

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


141e6fe8