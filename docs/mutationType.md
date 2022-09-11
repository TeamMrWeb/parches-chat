# MutationType

Parches Chat Root mutation type, contains all mutations provided by the API.

## > register

Register a new user.

#### Arguments

- **username**: _String!_
   - The username of the user.

- **email**: _String!_
   - The email of the user.

- **password**: _String!_
   - The password of the user (not hashed).

> Returns _**String**_

## > login

Login a user and returns a access token.

#### Arguments

- **email**: _String!_
   - The email of the user.

- **password**: _String!_
   - The password of the user (not hashed).

> Returns _**String**_

## > createChat

Create a new chat and returns the chat object.

#### Arguments

- **name**: _String!_
   - The name of the chat.

- **usersId**: _None!_
   - The id of the users of the chat.

- **avatar**: _String_
   - The avatar of the chat.

- **secure**: _Boolean_
   - If the chat is secure or not. If is secure the chat will have a owner.

- **private**: _Boolean_
   - If the chat is private or not.

> Returns _**ChatType**_

## > createMessage

Create a new message in a chat.

#### Arguments

- **chatId**: _ID!_
   - The id of the chat.

- **text**: _String!_
   - The text of the message.

- **image**: _String_
   - The image of the message.

> Returns _**MessageType**_

## > updateUser

Updates a logged user.

#### Arguments

- **username**: _String_
   - The new name of the user.

- **email**: _String_
   - The new email of the user.

- **avatar**: _String_
   - The new avatar of the user.

- **status**: _Int_
   - The new status of the user.

> Returns _**UserType**_

## > updateMessage

Update a message by id.

#### Arguments

- **messageId**: _ID!_
   - The id of the message.

- **text**: _String_
   - The new text of the message.

> Returns _**MessageType**_

## > addUserToChat

Add a user to a chat by id.

#### Arguments

- **chatId**: _ID!_
   - The id of the chat.

- **userId**: _ID_
   - The id of the user, if not provided, the current user will be used.

> Returns _**ChatType**_

## > removeUserFromChat

Remove a user from a chat by id.

#### Arguments

- **chatId**: _ID!_
   - The id of the chat.

- **userId**: _ID_
   - The id of the user, if not provided, the current user will be used.

> Returns _**ChatType**_

## > refreshToken

Refresh a access token of a logged user.

#### Arguments

- **token**: _String!_
   - The token to refresh (not expired).

> Returns _**String**_

## > deleteChat

Delete a chat by id.

#### Arguments

- **chatId**: _ID!_
   - The id of the chat to delete.

> Returns _**String**_

## > deleteMessage

Delete a message in a chat by id.

#### Arguments

- **chatId**: _ID!_
   - The id of the chat that contains the message.

- **messageId**: _ID!_
   - The id of the message to delete.

> Returns _**ID**_

