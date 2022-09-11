# QueryType

Root query type

## > hello

Hello World!

> Returns _**String**_

## > users

List of all users

> Returns _**[UserType]**_

## > user

Get a user by id, email or username

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

Get a chat by id

#### Arguments

- **id**: _ID_
   - The id of the chat.

> Returns _**ChatType**_

## > chats

List of all chats

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

Send a email verification

#### Arguments

- **email**: _String!_
   - Email of the user to send the email verification

> Returns _**String**_

