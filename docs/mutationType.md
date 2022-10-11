# MutationType

Parches Chat Root mutation type, contains all mutations provided by the API.

## > register

Register a new user.

#### Arguments

- `username` _String_**!**
   - The username of the user.

- `email` _String_**!**
   - The email of the user.

- `password` _String_**!**
   - The password of the user (not hashed).

> Returns **_String_**

#### Example usage

```graphql example
mutation example {
	register(
		username: "test"
		email: "test"
		password: "test"
	)

}
```

## > login

Login a user and returns a access token.

#### Arguments

- `email` _String_**!**
   - The email of the user.

- `password` _String_**!**
   - The password of the user (not hashed).

> Returns **_String_**

#### Example usage

```graphql example
mutation example {
	login(
		email: "test"
		password: "test"
	)

}
```

## > createChat

Create a new chat and returns the chat object.

#### Arguments

- `name` _String_**!**
   - The name of the chat.

- `usersId` _[ID]_**!**
   - The id of the users of the chat.

- `avatar` _String_
   - The avatar of the chat.

- `secure` _Boolean_
   - If the chat is secure or not. If is secure the chat will have a owner.

- `private` _Boolean_
   - If the chat is private or not.

> Returns **_ChatType_**

#### Example usage

```graphql example
mutation example {
	createChat(
		name: "test"
		usersId: ["34f0b8c49baec302abafac33", "34f0b8c49baec302abafac33"]
		avatar: "test"
		secure: False
		private: False
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > createMessage

Create a new message in a chat.

#### Arguments

- `chatId` _ID_**!**
   - The id of the chat.

- `text` _String_**!**
   - The text of the message.

- `image` _String_
   - The image of the message.

> Returns **_MessageType_**

#### Example usage

```graphql example
mutation example {
	createMessage(
		chatId: "34f0b8c49baec302abafac33"
		text: "test"
		image: "test"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > updateUser

Updates a logged user.

#### Arguments

- `username` _String_
   - The new name of the user.

- `email` _String_
   - The new email of the user.

- `avatar` _String_
   - The new avatar of the user.

- `status` _Int_
   - The new status of the user.

> Returns **_UserType_**

#### Example usage

```graphql example
mutation example {
	updateUser(
		username: "test"
		email: "test"
		avatar: "test"
		status: 0
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > updateMessage

Update a message by id.

#### Arguments

- `messageId` _ID_**!**
   - The id of the message.

- `text` _String_
   - The new text of the message.

> Returns **_MessageType_**

#### Example usage

```graphql example
mutation example {
	updateMessage(
		messageId: "34f0b8c49baec302abafac33"
		text: "test"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > addUserToChat

Add a user to a chat by id.

#### Arguments

- `chatId` _ID_**!**
   - The id of the chat.

- `userId` _ID_
   - The id of the user, if not provided, the current user will be used.

> Returns **_ChatType_**

#### Example usage

```graphql example
mutation example {
	addUserToChat(
		chatId: "34f0b8c49baec302abafac33"
		userId: "34f0b8c49baec302abafac33"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > removeUserFromChat

Remove a user from a chat by id.

#### Arguments

- `chatId` _ID_**!**
   - The id of the chat.

- `userId` _ID_
   - The id of the user, if not provided, the current user will be used.

> Returns **_ChatType_**

#### Example usage

```graphql example
mutation example {
	removeUserFromChat(
		chatId: "34f0b8c49baec302abafac33"
		userId: "34f0b8c49baec302abafac33"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > refreshToken

Refresh a access token of a logged user.

#### Arguments

- `token` _String_**!**
   - The token to refresh (not expired).

> Returns **_String_**

#### Example usage

```graphql example
mutation example {
	refreshToken(
		token: "test"
	)

}
```

## > deleteChat

Delete a chat by id.

#### Arguments

- `chatId` _ID_**!**
   - The id of the chat to delete.

> Returns **_String_**

#### Example usage

```graphql example
mutation example {
	deleteChat(
		chatId: "34f0b8c49baec302abafac33"
	)

}
```

## > deleteMessage

Delete a message in a chat by id.

#### Arguments

- `chatId` _ID_**!**
   - The id of the chat that contains the message.

- `messageId` _ID_**!**
   - The id of the message to delete.

> Returns **_ID_**

#### Example usage

```graphql example
mutation example {
	deleteMessage(
		chatId: "34f0b8c49baec302abafac33"
		messageId: "34f0b8c49baec302abafac33"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > sendFriendRequest

Send a friend request to a user.

#### Arguments

- `userId` _ID_**!**
   - The user id to send the friend request to.

- `senderId` _ID_
   - The user id of the sender. If not provided, the current logged user will be used.

> Returns **_String_**

#### Example usage

```graphql example
mutation example {
	sendFriendRequest(
		userId: "34f0b8c49baec302abafac33"
		senderId: "34f0b8c49baec302abafac33"
	)

}
```

## > removeFriendRequest

Remove a friend request.

#### Arguments

- `userId` _ID_**!**
   - The user id to remove the friend request from.

> Returns **_String_**

#### Example usage

```graphql example
mutation example {
	removeFriendRequest(
		userId: "34f0b8c49baec302abafac33"
	)

}
```

## > acceptFriendRequest

Remove a friend request.

#### Arguments

- `userId` _ID_**!**
   - The user id to accept the friend request from.

> Returns **_String_**

#### Example usage

```graphql example
mutation example {
	acceptFriendRequest(
		userId: "34f0b8c49baec302abafac33"
	)

}
```

## > declineFriendRequest

Decline a friend request.

#### Arguments

- `userId` _ID_**!**
   - The user id to decline the friend request from.

> Returns **_String_**

#### Example usage

```graphql example
mutation example {
	declineFriendRequest(
		userId: "34f0b8c49baec302abafac33"
	)

}
```

