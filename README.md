
# Parches Backend ⚙️

Esta brach contiene la API funcional de Parches Chat desarrollada en NodeJS con ExpressJS, MongoDB y GraphQL

Para acceder a la documentación completa puedes dar click [aquí](https://github.com/TeamParches/parches-chat/tree/docs)
## Instalación
Clonación, cambio de rama e instalación
```bash
git clone https://github.com/TeamParches/parches-chat.git
cd parches-chat
git checkout backend
npm i -force
```
Para ejecutar la aplicación
```bash
npm start
```

## Desarrollo
### Scripts disponibles
`npm dev`: ejecuta la aplicación en modo desarrollador
`npm test`: ejecuta todos los tests disponibles

### Variables de entorno
Por defecto la aplicación genera algunas variables de entorno pero hay otras que no se pueden definir ya que requiere una API KEY privada.

Es recomendable crear un archivo **.env** como el siguiente [ejemplo]()
### Exportar

Para exportar el esquema de GraphQL es necesario tener instalado python y el paquete `get-graphql-schema` de Node globalmente.

Se tiene que desactivar la opción  **graphiql** en el middleware constructor de graphqlHTTP ([referencia](https://github.com/TeamParches/parches-chat/blob/81e80ca78ebc8c2039ebdd28a2dbcb76b805a794/src/app.js#L32))

Ejecuta el servidor
```bash
npm start
```
En otra terminal
```bash
python scripts/exportSchemas.py
```

> Note: por defecto todo el esquema es exportado en la carpeta addons
