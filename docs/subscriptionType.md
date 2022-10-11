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
		chatId: "34f0b8c49baec302abafac33"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

## > userMessageNotification

Subscription for message notifications for a specific user

#### Arguments

- `userId` _ID_
   - The id of the user to subscribe

> Returns **_MessageType_**

#### Example usage

```graphql example
subscription example {
	userMessageNotification(
		userId: "34f0b8c49baec302abafac33"
	)
	{
		# add fields here (depends on the return type)
	}
}
```

