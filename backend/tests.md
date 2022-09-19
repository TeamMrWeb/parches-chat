## Tests

Hasta ahora el proyecto tendrá soporte para los siguientes tipos de tests necesarios para la aplicación.

Ningún test se hará de forma manual, todo será automatizado.

### Unit tests
Las pruebas unitarias son a bajo nivel (cercanas al código fuente de la aplicación).
Este tipo de testing consiste en probar de forma individual las funciones y/o métodos (de las clases, componentes y/o módulos que son usados por nuestro software).
Debido a lo específicas que son, generalmente son las pruebas automatizadas de menor coste, y pueden ejecutarse más rápidamente.

- Estas pruebas verifican que el nombre de la función o método sea adecuado, que los nombres y tipos de los parámetros sean correctos, y así mismo el tipo y valor de lo que se devuelve como resultado.
- En muchos casos inclusive se suele reemplazar las consultas a bases de datos, de modo que la prueba se enfoque en operar a partir de los valores de entrada, sin depender de ninguna fuente externa.
- Si no es factible aislar el uso de bases de datos de nuestras pruebas unitarias, será importante tener en cuenta el rendimiento y buscar optimizar nuestras consultas.


### Integration tests

Las pruebas de integración verifican que los diferentes módulos y/o servicios usados por nuestra aplicación funcionen en bien cuando trabajan en conjunto.
Son generalmente más costosas de ejecutar, ya que requieren que más partes de nuestra aplicación se configuren y se encuentren en funcionamiento.

- Asegurar que los microservicios operen como se espera.
- Probar la interacción con una o multiples base de datos.
