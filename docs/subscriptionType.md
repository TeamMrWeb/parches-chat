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
		chatId: "cdc84f7449001d63448596d7"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

