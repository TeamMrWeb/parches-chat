# parches-chat-backend

## Requirements

Required NodeJS v16.x

- Cors
- ExpressJS
- ExpressGraphQL
- JsonWebToken
- Nodemailer
- Mongoose
- GraphQL

## Install

```bash
git clone https://github.com/TeamParches/parches-chat.git
cd parches-chat
git checkout backend
npm i
```

## Environment variables

- `PORT`
- `MONGODB_URL`
- `JWT_SECRET`
- `JWT_EMAIL_SECRET`
- `JWT_EXPIRES_IN`
- `JWT_EMAIL_EXPIRES_IN`
- `JWT_EMAIL_SECRET`
- `EMAIL`
- `EMAIL_USER`
- `EMAIL_PASS`

## Development

Scripts availables

- `npm start` -> starts the api.
- `npm test` -> starts the tests.

## Exporting

You need to install the package `get-graphql-schema` and disable graphiql option in graphqlHTTP constructor.

```bash
python exportSchemas.py
```
