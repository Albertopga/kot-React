# kot-React

Board game ported to a web client game, with React library

# Reglas de dados de King of Tokio

Tenemos `dx` dados normales + `de` dados extra para un total de `d` dados.

En cada turno, el jugador dispone de hasta `t` tiradas (por defecto 3 tiradas).

En cada tirada, el jugador puede reservar hasta `d` dados, que mantienen el valor actual. El resto de dados no seleccionados (reservados) cambian su valor a uno aleatorio.

- limite de dados
- limite de tiradas
- estado de dado:
  - reservado o no
  - resultado
- estado de tirada
  - turno de jugador `x`
  - numero de tirada
  - resultado de los dados
  - estado de todos los dados
  - => numero de tirada + estado de los dados
- estado de un turno
  - tiradas
  - resultado final de las tiradas
- estado de partida
  - turnos -> estado de cada turno

##TODO:
crea una clase que se encargue de las tiradas que básicamente tiene que:

- recibir cuantos dados de cada tipo al crearse

- guardar el resultado de cada dado

- tienes que poder consultar el resultado de cada dado

- tienes que poder decirle que quieres seleccionar o deseleccionar un dado

- tienes que poder decirle que quieres tirar otra vez todos los dados no seleccionados (no reservados)

- no te tiene que dejar ni seleccionar dados que no existan ni tirar cuando te has pasadso

(asi que en la creacion del objeto aparte de cada numero de dado, pasa el limite de tiradas)

cuando lo tengas en js funcionando, vemos como meterlo en react
#KingOfTokio
