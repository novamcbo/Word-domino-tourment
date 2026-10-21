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

## Android, iPhone/iPad y web

La misma carpeta `dist/` se usa en las tres plataformas. Capacitor 8.5.3 conecta
el juego con los proyectos nativos `android/` e `ios/`; no carga un sitio remoto.
Identificador inicial: `com.novamcbo.dominoclub` (confirmar antes de publicar).

```sh
npm ci
npm test
npm run mobile:sync
npm run android
# En macOS con Xcode:
npm run ios
```

Después de cada cambio web, ejecutar `npm run mobile:sync` antes de compilar.
Android necesita Android Studio, SDK y el JDK compatible con Capacitor 8.
iOS necesita macOS y Xcode 26 o posterior; seleccionar el equipo de firma en
Xcode para probar en dispositivo o crear un archivo de distribución.
Los proyectos nativos se generaron y sincronizaron en Linux, pero todavía no se
compilaron ni probaron en dispositivos físicos. Las firmas, las cuentas de las
tiendas, las fichas comerciales y sus revisiones están pendientes.

La web incluye manifiesto, iconos y un service worker para uso sin conexión tras
una primera carga correcta. Android: menú del navegador → instalar/agregar a
pantalla de inicio. iPhone/iPad: Safari → compartir → añadir a pantalla de inicio.
La instalación depende del navegador y del acceso al sitio privado actual.
El service worker no se registra dentro de las apps nativas, que ya incluyen
los archivos del juego. No se fuerza una recarga mientras haya una partida.

El guardado sigue siendo local a cada instalación. No hay cuenta compartida,
sincronización entre dispositivos ni multijugador remoto implementados aún.
El modo 1 contra 1 con pozo y el rediseño de las referencias siguen pendientes.

Documentación: https://capacitorjs.com/docs/getting-started/environment-setup
