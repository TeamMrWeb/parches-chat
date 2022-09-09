# MutationType
Un MutationType es una escritura, eliminación, edición o creación de dato/s

Todas las mutaciones reciben argumentos que son necesarios para que puedan ser accionados

Nota: los argumentos que después del tipo de dato tengan un **!** son obligatorios

## register
Registra un nuevo usuario y devuelve un token de acceso

**Argumentos**
- `username` _String_**!**
  - Nombre del usuario
- `email` _String_**!**
  - Email del usuario
- `password` _String_**!**
  - Contraseña del usuario (no encriptado)

> **Retorna** _String_ que es un token de acceso

**Ejemplo de uso**
```graphql example
mutation{
  register( # los argumentos van en ()
    username: "test"
    email: "test@gmail.com"
    password: "testing123"
  )
}
```

## login
Inicia sesion a un usuario y devuelve un token de acceso

**Argumentos**
- `username` _String_**!**
  - Nombre del usuario
- `email` _String_**!**
  - Email del usuario

> **Retorna** _String_ que es un token de acceso

**Ejemplo de uso**
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

**Argumentos**
- `name` _String_**!**
  - Nombre del chat
- `usersId` [_[UserType](https://github.com/TeamParches/parches-chat/blob/docs/DATATYPES.MD#usertype)_]**!**
  - Lista de usuarios que constituyen el chat, entre ellos el quien lo crea (el usuario logeado)
- `secure` _Boolean_
  - Si el chat es seguro, si lo es tendrá un dueño (el usuario logeado quien crea el chat)
- `private` _Boolean_
  - Si el chat va a ser privado para un solo usuario

> **Retorna** [ChatType](https://github.com/TeamParches/parches-chat/blob/docs/DATATYPES.MD#chattype) creado recientemente

**Ejemplo de uso**

Chat normal con 3 integrantes y seguro
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
Chat privado, un usuario solo podrá tener un chat privado con el mismo
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
