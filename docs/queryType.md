# QueryType

Parches Chat Root query type, contains all queries provided by the API.

## > hello

A simple test query that returns "Hello World!"

> Returns _**String**_

## > users

Returns all users from the database.

> Returns _**[UserType]**_

## > user

Get a user by id.

#### Arguments

- **userId**: _ID_
   - The id of the user, if not provided, logged user will be used.

> Returns _**UserType**_

## > messages

Get messages by ids, if not provided, parent messages will be used.

#### Arguments

- **ids**: _[ID]_
   - The ids of the messages, if not provided, parent messages will be used.

- **limit**: _Int_
   - The limit of messages to return.

- **skip**: _Int_
   - The number of messages to skip.

> Returns _**[MessageType]**_

## > chat

Get a chat by id.

#### Arguments

- **id**: _ID!_
   - The id of the chat to find.

> Returns _**ChatType**_

## > chats

Get chats from a user by its id.

#### Arguments

- **userId**: _ID_
   - The id of the user to get the chats from. If not provided, logged user will be used.

- **isGroup**: _Boolean_
   - If the chat is a group or not.

- **skip**: _Int_
   - The number of chats to skip.

- **limit**: _Int_
   - The limit of chats to return.

> Returns _**[ChatType]**_

## > verify

Verify a user by a token (through headers)

> Returns _**String**_

## > sendEmailVerification

Send a email verification to the user.

#### Arguments

- **email**: _String!_
   - Email of the user to send the email verification

> Returns _**String**_

