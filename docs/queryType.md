# QueryType

Parches Chat Root query type, contains all queries provided by the API.

## > hello

A simple test query that returns "Hello World!"

> Returns **_String_**

#### Example usage

```graphql example
query example {
	hello
}
```

## > users

Returns all users from the database.

> Returns _[**UserType**]_

#### Example usage

```graphql example
query example {
	users	{
		# add fields here (depends on the return type)
	}
}
```

## > user

Get a user by id.

#### Arguments

- `userId` _ID_
   - The id of the user, if not provided, logged user will be used.

> Returns **_UserType_**

#### Example usage

```graphql example
query example {
	user(
		userId: "8a3da4e3a6dde86980be0049"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > messages

Get messages by ids, if not provided, parent messages will be used.

#### Arguments

- `ids` _[ID]_
   - The ids of the messages, if not provided, parent messages will be used.

- `limit` _Int_
   - The limit of messages to return.

- `skip` _Int_
   - The number of messages to skip.

> Returns _[**MessageType**]_

#### Example usage

```graphql example
query example {
	messages(
		ids: ["8a3da4e3a6dde86980be0049", "8a3da4e3a6dde86980be0049"]
		limit: 3
		skip: 3
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > chat

Get a chat by id.

#### Arguments

- `id` _ID_**!**
   - The id of the chat to find.

> Returns **_ChatType_**

#### Example usage

```graphql example
query example {
	chat(
		id: "8a3da4e3a6dde86980be0049"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > chats

Get chats from a user by its id.

#### Arguments

- `userId` _ID_
   - The id of the user to get the chats from. If not provided, logged user will be used.

- `isGroup` _Boolean_
   - If the chat is a group or not.

- `skip` _Int_
   - The number of chats to skip.

- `limit` _Int_
   - The limit of chats to return.

> Returns _[**ChatType**]_

#### Example usage

```graphql example
query example {
	chats(
		userId: "8a3da4e3a6dde86980be0049"
		isGroup: True
		skip: 3
		limit: 3
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > verify

Verify a user by a token (through headers)

> Returns **_String_**

#### Example usage

```graphql example
query example {
	verify
}
```

## > sendEmailVerification

Send a email verification to the user.

#### Arguments

- `email` _String_**!**
   - Email of the user to send the email verification

> Returns **_String_**

#### Example usage

```graphql example
query example {
	sendEmailVerification(
		email: "test"
	)

}
```

