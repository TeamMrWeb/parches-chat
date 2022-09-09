# MutationType
Un MutationType es una escritura, eliminación, edición o creación de dato/s

Todas las mutaciones reciben argumentos que son necesarios para que puedan ser accionados, estos van en parentesis **()**

Nota: los argumentos que después del tipo de dato tengan un **!** son obligatorios

## register
Registra un nuevo usuario y devuelve un texto indicando que se verifique el email registrado

#### Argumentos
- `username` _String_**!**
  - Nombre del usuario
- `email` _String_**!**
  - Email del usuario
- `password` _String_**!**
  - Contraseña del usuario (no encriptado)

> **Retorna** _String_

#### Ejemplo de uso
```graphql example
mutation{
  register(
    username: "test"
    email: "test@gmail.com"
    password: "testing123"
  )
}
```

## login
Inicia sesion a un usuario y devuelve un token de acceso

#### Argumentos
- `username` _String_**!**
  - Nombre del usuario
- `email` _String_**!**
  - Email del usuario

> **Retorna** _String_ (token de acceso)

#### Ejemplo de uso
```graphql example
mutation{
  login( # los argumentos van en ()
    username: "test"
    email: "test@gmail.com"
  )
}
```

## createChat
Crea un nuevo chat y devuelve este mismo

#### Argumentos
- `name` _String_**!**
  - Nombre del chat
- `usersId` [_[UserType](https://github.com/TeamParches/parches-chat/blob/docs/DATATYPES.MD#usertype)_]**!**
  - Lista de usuarios que constituyen el chat, entre ellos el quien lo crea (el usuario logeado)
- `secure` _Boolean_
  - Si el chat es seguro, si lo es tendrá un dueño (el usuario logeado quien crea el chat)
- `private` _Boolean_
  - Si el chat va a ser privado para un solo usuario

> **Retorna** [ChatType](https://github.com/TeamParches/parches-chat/blob/docs/DATATYPES.MD#chattype)

#### Ejemplo de uso

**Chat grupal** con 3 integrantes y seguro. Una vez creado se obtiene el ID del nuevo chat
```graphql example
mutation{
  createChat(
    name: "parches grupazo"
    usersId: ["superid1", "superid2", "superid3"]
    secure: true
  ) {
    id
  }
}
```
**Chat privado**, un usuario solo podrá tener un chat privado con el mismo. Una vez creado se obtiene el ID del nuevo chat
```graphql example
mutation{
  createChat(
    name: "anotador"
    usersId: []
    private: true
  ) {
    id
  }
}
```

## addUserToChat
Agrega un usuario a un chat, al terminar devuelve el chat actualizado con el nuevo usuario integrado

#### Argumentos
- `chatId` _ID_**!**
  - ID del chat donde se agregará al usuario
- `userId` _ID_
  - ID del usuario, si no se especifica entonces se usará al usuario logeado

> **Retorna** [ChatType](https://github.com/TeamParches/parches-chat/blob/docs/DATATYPES.MD#chattype)

#### Ejemplo de uso
Agregando un usuario **mediante su ID**. Al finalizar obtenemos el chat y el campo de usuarios actualizado
```graphql example
mutation{
  addUserToChat(
    chatId: "superchatid"
    userId: "superuserid"
  ) {
    id
    users{
        id
        username
    }
  }
}
```
Agregando al **usuario logeado** a un chat
```graphql example
mutation{
  addUserToChat(
    chatId: "superchatid"
  ) {
    id
    users{
        id
        username
    }
  }
}
```

## removeUserFromChat
Elimina a un usuario de un chat, al terminar devuelve el chat actualizado sin el usuario

#### Argumentos
- `chatId` _ID_**!**
  - ID del chat donde se eliminará al usuario
- `userId` _ID_
  - ID del usuario, si no se especifica entonces se usará al usuario logeado

> **Retorna** [ChatType](https://github.com/TeamParches/parches-chat/blob/docs/DATATYPES.MD#chattype)

#### Ejemplo de uso
Eliminando a un usuario **mediante su ID**. Al finalizar obtenemos el chat y el campo de usuarios actualizado
```graphql example
mutation{
  removeUserFromChat(
    chatId: "superchatid"
    userId: "superuserid"
  ) {
    id
    users{
        id
        username
    }
  }
}
```

Eliminando al **usuario logeado** de un chat. Al finalizar obtenemos el chat y el campo de usuarios actualizado
```graphql example
mutation{
  removeUserFromChat(
    chatId: "superchatid"
  ) {
    id
    users{
        id
        username
    }
  }
}
```

## createMessage
Crea un nuevo mensaje adherido a un chat y devuelve este mismo.

Nota: el autor del mensaje es el usuario logeado

#### Argumentos
- `chatId` _ID_**!**
  - Id del chat que pertenece al mensaje
- `text` _String_**!**
  - Texto del mensaje
- `image` _String_
  - Imagen del mensaje, este tiene que estar encriptado en base64

> **Retorna** [MessageType](https://github.com/TeamParches/parches-chat/blob/docs/DATATYPES.MD#messagetype)

#### Ejemplo de uso
Creación de un **mensaje sin imagen**, al finalizar se obtiene el ID del mensaje nuevo
```graphql example
mutation{
  createMessage(
    chatId: "superchatid"
    text: "hola grupo"
  ) {
    id
  }
}
```

## updateUser
Actualiza los campos del usuario actualmente logeado

#### Argumentos
- `username` _String_
  - Nuevo nombre
- `email` _String_
  - Nuevo email, el usuario dejará de estar verificado
- `avatar` _String_
  - Nuevo avatar
- `status` _Int_
  - Nuevo estado, ver más en [UserType](https://github.com/TeamParches/parches-chat/blob/docs/DATATYPES.MD#usertype)

> **Retorna** [UserType](https://github.com/TeamParches/parches-chat/blob/docs/DATATYPES.MD#usertype)

#### Ejemplo de uso
Actualización del campo username y status
```graphql example
mutation{
  updateUser(
    username: "erickjq10x2"
    status: 3 # corresponde a desconectado
  ) {
    id
  }
}
```
