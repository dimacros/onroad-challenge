# Challenge

Se pide crear un sistema de buses que maneje una serie de itinerarios de lima hacia todas las demás provincias.
Considerar los siguientes criterios:

1. Los buses se identifican por placa y operador.
2. Los itinerarios deben tener la siguiente información:
    - Ciudad de origen
    - Ciudad de destino
    - Horario de salida
    - Horario de llegada
    - Precio del pasaje
    - Bus asignado
3. Los buses tendrán un mínimo de 20 asientos y un máximo de 35.
4. Habrá 3 tipos de asientos: Turista, Ejecutivo, Premium. Cada uno de ellos tendrá un valor agregado que lo manejará a criterio del desarrollador.
5. Los usuarios deben poder buscar itinerarios disponibles por ciudad de origen y destino, y reservar su asiento en el bus seleccionado.
6. El sistema debe permitir agregar y actualizar itinerarios, así como revisar las reservas realizadas en sus buses.
7. Se debe implementar un carrito de compras por usuario tipo pasajero, el usuario puede comprar la cantidad de tickets que requiera.
8. Se debe hacer uso de una base de datos relacional.
9. Se tendrán 2 tipos de usuarios:
    - Usuario onroad: Podrá realizar todas las acciones del sistema basado en privilegios de escritura, lectura.
    - Usuario pasajero: Usuario tipo cliente que abordará los buses.
10. Se pide una mensajería de chat en tiempo real entre usuarios tipo onroad para poder realizar coordinaciones internas.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
