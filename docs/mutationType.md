## register
Register a new user
### Arguments
- username
- email
- password
## login
Login a user
### Arguments
- email
- password
## createChat
Create a new chat
### Arguments
- name
> The name of the chat.
- usersId
> The id of the users of the chat.
- avatar
> The avatar of the chat.
- secure
> If the chat is secure or not. If is secure the chat will have a owner.
- private
> If the chat is private or not.
## createMessage
Create a new message
### Arguments
- chatId
> The id of the chat.
- text
> The text of the message.
- image
> The image of the message.
## updateUser
Update a user
### Arguments
- username
> The new name of the user.
- email
> The new email of the user.
- avatar
> The new avatar of the user.
- status
> The new status of the user.
## updateMessage
Update a message
### Arguments
- messageId
> The id of the message.
- text
> The new text of the message.
## addUserToChat
Add a user to a chat.
### Arguments
- chatId
> The id of the chat.
- userId
> The id of the user, if not provided, the current user will be used.
## removeUserFromChat
Remove a user from a chat.
### Arguments
- chatId
> The id of the chat.
- userId
> The id of the user, if not provided, the current user will be used.
## refreshToken
Refresh a token.
### Arguments
- token
> The token to refresh (not expired).
## deleteChat
Delete a chat
### Arguments
- chatId
> The id of the chat to delete.
## deleteMessage
Delete a message
### Arguments
- chatId
> The id of the chat that contains the message.
- messageId
> The id of the message to delete.
