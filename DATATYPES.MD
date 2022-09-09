# DataTypes

Un DataType es un objeto que contiene diferentes campos que puedes obtenes

## ChatType
Representa un chat

**Campos**

- `id` _ID_
  - Identificación del chat, este es único
- `name` _String_
  - Nombre del chat asignado, no es único y puede cambiar
- `users` [_[UserType](https://github.com/TeamParches/parches-chat/new/docs#usertype)_]
  - Lista con usuarios que pertenecen al chat, estos son de tipo UserType
- `admins` [_[UserType](https://github.com/TeamParches/parches-chat/new/docs#usertype)_]
  - Lista con los administradores del chat, estos son de tipo UserType
- `owner` _[UserType](https://github.com/TeamParches/parches-chat/new/docs#usertype)_
  - Dueño del chat, solamente si el chat es seguro. Por otro lado es *null*
- `messages` [_[MesssageType](https://github.com/TeamParches/parches-chat/new/docs#messagetype)_]
  - Lista de mensajes del chat, estos son de tipo MessageType
- `isGroup` _Boolean_
  - Si el chat es grupo, es grupo cuando hay mas de 2 usuarios
- `secure` _Boolean_
  - Si el chat es seguro, tendrá un dueño asignado quien será el creador del chat
- `private` _Boolean_
  - Si el chat es privado, solamente para un usuario como anotador
- `updatedAt` _String_
  - Fecha de la ultima actualización del chat, esta es en formato timestamp
- `createdAt` _String_
  - Fecha de cración del chat, esta es en formato timestamp

**Ejemplo de consulta**
```graphql example
chat{
  id
  users{
    id
    username
  }
  messages{
    text
  }
}
```

## MessageType
Representa un mensaje

**Campos**

- `id` _ID_
  - Identificación del mensaje, este es único
- `text` _String_
  - El texto del mensaje
- `image` _String_
  - Imagen del mensaje, puede ser vacio
- `author` [UserType](https://github.com/TeamParches/parches-chat/new/docs#usertype)
  - Creador del mensaje, este es de tipo UserType
- `seen` [_[UserType](https://github.com/TeamParches/parches-chat/new/docs#usertype)_]
  - Lista de usuarios que vieron el mensaje, este es de tipo UserType
- `edited` _Boolean_
  - Si el mensaje esta editado
- `updatedAt` _String_
  - Fecha de la ultima actualización del mensaje, esta es en formato timestamp
- `createdAt` _String_
  - Fecha de cración del mensaje, esta es en formato timestamp

**Ejemplo de consulta**
```graphql example
messages{
  id
  text
  author{
    id
    username
  }
  seen{
    id
    username
  }
}
```

## UserType
Representa un usuario

**Campos**
- `id` _ID_
  - Identificación del mensaje, este es único
- `username` _String_
  - El nombre del usuario
- `email` _String_
  - Dirección de correo electronico del usuario
- `avatar` _String_
  - La imagen del usuario encriptado en base64
- `status` _Int_
  - Estado del usuario -> 0: conectado, 1: ausente, 2: no molestar, 3: desconectado
- `verified` _Boolean_
  - Si el usuario ha verificado su email
- `updatedAt` _String_
  - Fecha de la ultima actualización del usuario, esta es en formato timestamp
- `createdAt` _String_
  - Fecha de cración del usuario, esta es en formato timestamp

**Ejemplo de consulta**
```graphql example
user{
  id
  username
  email
}
```
