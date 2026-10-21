# Dominó Club

Juego web en español de dominó doble seis. Primera versión: una persona y tres bots locales, por parejas o individual. Interfaz adaptable, sugerencias, historial, partidas a 100/150/200 y reanudación automática en el mismo navegador.

## Ejecutar

Desde la raíz, con Python 3 instalado:

```sh
python -m http.server 8000 --directory dist
```

Abrir http://localhost:8000. No abrir index.html con file://: utiliza módulos JavaScript.

## Pruebas

Con Node.js 20 o superior:

```sh
node test.mjs
node test-blocked.mjs
node test-layout.mjs
```

Simula 1.000 manos y comprueba conservación de las 28 fichas, conexiones válidas, finalización y rechazo de jugadas inválidas.

## Código

- `dist/engine.mjs`: reparto, jugadas, bots, trancas y puntuación.
- `dist/app.mjs`: controles, renderizado y guardado local.
- `dist/index.html` y `dist/style.css`: interfaz.
- `test.mjs`: pruebas del motor.

## Reglas de esta edición

7 fichas por jugador, sin pozo. Abre el 6-6 en cada mano. El pase es automático cuando el jugador no tiene jugadas. Gana quien vacía su mano. Por parejas se suman los puntos restantes de los rivales; en individual, los de todos los demás. Cuando nadie tiene una jugada válida, se declara tranca automáticamente y gana la menor suma por equipo o jugador. Un empate no puntúa. Estas reglas son explícitas de esta edición, no una implementación certificada de una variante nacional.

## Límites actuales

Sin multijugador en línea, cuentas, dinero real ni variantes regionales todavía. El bot usa una heurística sencilla; no ve las manos ajenas. El progreso se guarda en localStorage del navegador, no en un servidor. Google Fonts es opcional; hay fuentes de respaldo.
