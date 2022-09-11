## hello
Hello World!
## users
List of all users
## user
Get a user by id, email or username
### Arguments
- userId
> The id of the user, if not provided, logged user will be used.
## messages
Get messages by ids, if not provided, parent messages will be used.
### Arguments
- ids
> The ids of the messages, if not provided, parent messages will be used.
- limit
> The limit of messages to return.
- skip
> The number of messages to skip.
## chat
Get a chat by id
### Arguments
- id
> The id of the chat.
## chats
List of all chats
### Arguments
- userId
> The id of the user to get the chats from. If not provided, logged user will be used.
- isGroup
> If the chat is a group or not.
- skip
> The number of chats to skip.
- limit
> The limit of chats to return.
## verify
Verify a user by a token (through headers)
## sendEmailVerification
Send a email verification
### Arguments
- email
> Email of the user to send the email verification
