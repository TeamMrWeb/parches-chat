# SubscriptionType

Parches Chat Root subscription type, contains all subscriptions provided by the API.

## > messageAdded

Subscription for new messages

> Returns **_MessageType_**

#### Example usage

```graphql example
subscription example {
	messageAdded	{
		# add fields here (depends on the return type)
	}
}
```

## > chatMessageAdded

Subscription for new messages in a specific chat

#### Arguments

- `chatId` _ID_
   - The id of the chat to subscribe

> Returns **_MessageType_**

#### Example usage

```graphql example
subscription example {
	chatMessageAdded(
		chatId: "8a3da4e3a6dde86980be0049"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

