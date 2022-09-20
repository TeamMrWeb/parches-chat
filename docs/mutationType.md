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
		usersId: ["8a3da4e3a6dde86980be0049", "8a3da4e3a6dde86980be0049"]
		avatar: "test"
		secure: True
		private: True
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
		chatId: "8a3da4e3a6dde86980be0049"
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
		status: 3
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
		messageId: "8a3da4e3a6dde86980be0049"
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
		chatId: "8a3da4e3a6dde86980be0049"
		userId: "8a3da4e3a6dde86980be0049"
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
		chatId: "8a3da4e3a6dde86980be0049"
		userId: "8a3da4e3a6dde86980be0049"
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
		chatId: "8a3da4e3a6dde86980be0049"
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
		chatId: "8a3da4e3a6dde86980be0049"
		messageId: "8a3da4e3a6dde86980be0049"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

