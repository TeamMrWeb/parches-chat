
# Parches Backend ⚙️

This branch contains the backend of Parches Chat providing a functional API using GraphQL

Se full documentation [here](https://github.com/TeamParches/parches-chat/tree/docs)
## Installation

```bash
git clone https://github.com/TeamParches/parches-chat.git
cd parches-chat
git checkout backend
npm i -force
npm start
```

## Environment variables
if you not define these variables you may have an error execution
- PORT
- MONGODB_URL
- JWT_SECRET
- JWT_EMAIL_SECRET
- JWT_EXPIRES_IN
- JWT_EMAIL_EXPIRES_IN
- JWT_EMAIL_SECRET
- EMAIL
- EMAIL_USER
- EMAIL_PASS

## Development

Scripts availables

- **npm start** _executes normal start_
- **npm dev**: _executes start in development mode_
- **npm test**: _executes all tests from src/tests_

## Exporting

You need to install the package `get-graphql-schema` globally and disable or remove graphiql option in graphqlHTTP constructor ([here](https://github.com/TeamParches/parches-chat/blob/81e80ca78ebc8c2039ebdd28a2dbcb76b805a794/src/app.js#L32))

```bash
npm start
```

Open another terminal
```bash
python scripts/exportSchemas.py
```

> Note: default exports in addons directory but you can change it
