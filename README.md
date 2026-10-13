# Bike Café: catálogo de bicicletas (versión simple)

Catálogo para **mostrar en visitas a clientes** desde el celular o una tablet. Tiene 18 bicicletas Raleigh con foto, precio y datos clave, filtros por categoría y un modo **Presentar** a pantalla completa para pasar bici por bici.

- Proyecto WebDom independiente (Bike Café, Instagram @bikecafespm). Es estático, sin build: se abre `index.html` con doble clic.
- La versión anterior («La carta», 15 bicis con Scott y Megamo) quedó guardada en `version-1-carta/`.

## Cómo usarlo en una visita

1. Abre el catálogo y toca **Presentar**. Se ve a pantalla completa, empezando por la primera bici.
2. Pasa de bici deslizando la foto con el dedo, o con las flechas (← → en el teclado).
3. Si eliges un filtro antes (por ejemplo *MTB juvenil*), «Presentar» y las flechas recorren solo esa categoría.
4. **Preguntar por WhatsApp** abre el chat de Bike Café (829-744-8771) con el modelo y el precio ya escritos.

## Categorías

| Categoría | Modelos | Desde |
|---|---|---|
| Primera bici (12″ y 16″) | Raleigh 12 Boy, 12 azul oscuro, 12 aqua, 16 Girl, 16 azul | RD$6,900 |
| Niños 20″ y 24″ | Raleigh 20 Girl, 20 Boy (BMX), 24 Girl | RD$8,900 |
| MTB juvenil (20″–26″) | 20 MTB Disc, 24 MTB Disc Boy, 24 MTB Disc Girl, MTB Disc Girl morado, 26 MTB Girl, 26 MTB Boy | RD$13,900 |
| Montaña 29″ | 29 MTB Disc Orion, 29 Boulder 3 | RD$18,900 |
| Paseo | Coral Playera, Cruiser Coral con parrilla | RD$18,900 |

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Las 18 bicis (foto, nombre, color, chips, precio y ficha técnica en `<template>`) |
| `styles.css` | Estilos: página clara, tarjetas, filtros y vista a pantalla completa |
| `script.js` | Filtros, modo Presentar (flechas, teclado, deslizar), mensajes de WhatsApp |
| `img/bicis/` | 18 fotos normalizadas (WebP 900 × 600, fondo blanco, misma línea de suelo) |
| `fuente/` | `catalogo-bicicletas-bicicentro.md` original |

**Cambiar un precio:** busca la bici por su `id` en `index.html` y cambia el precio que se muestra y el texto de `data-mensaje` y del enlace `wa.me` (dice «de RD$…»).

## Fuente de los datos

`catalogo-bicicletas-bicicentro.md`: datos tomados de bicicentro.com.do el 13-oct-2026. Los chips y la ficha técnica salen solo de esa tabla. Contacto y horario: Instagram de Bike Café.

## Pendiente de confirmar con Bike Café

1. Que tengan cada modelo y a ese precio (los datos son de Bicicentro).
2. No se muestra la disponibilidad («Solo queda 1»), porque es el stock de Bicicentro y no el de Bike Café.
3. «Garantía de por vida en el cuadro» en todas: confirmar que aplica al comprar en Bike Café.
4. Raleigh 24 Girl: la tabla dice «estabilizadoras reforzadas», pero la foto no las muestra.
5. Raleigh MTB Disc Girl morado: la tabla no indica el aro.
6. Raleigh 29 Boulder 3: la foto original se llama «BOULDER5». Confirmar que es el modelo correcto.

## Verificación (13-oct-2026)

18/18 pruebas Playwright en escritorio (1440) y móvil (390): 18 bicis, filtro, Presentar, flechas, deslizar, mensaje de WhatsApp, Escape, sin JavaScript. Sin errores de consola ni desborde. Las capturas del contenedor usan fuentes sustitutas; en la vista previa se ven las reales.
