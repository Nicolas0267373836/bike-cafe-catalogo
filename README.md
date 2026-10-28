# Bike Café: catálogo de bicicletas (versión simple)

Catálogo para **mostrar en visitas a clientes** desde el celular o una tablet. Tiene 67 bicicletas (18 Raleigh, 44 Scott y 5 Megamo) con foto, precio y datos clave, filtros por categoría y un modo **Presentar** a pantalla completa para pasar bici por bici.

Paleta visual: negro, marrón y blanco. Los colores se definen en las variables de `styles.css`; la lectura del inventario y los controles del catálogo conservan su comportamiento.

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
| Primera bici (12″ y 16″) | Raleigh 12 Boy, 12 azul oscuro, 12 aqua, 16 Girl, 16 azul | RD$7,500 |
| Niños 20″ y 24″ | Raleigh 20 Girl, 20 Boy (BMX), 24 Girl | RD$9,500 |
| MTB juvenil (20″–26″) | 20 MTB Disc, 24 MTB Disc Boy, 24 MTB Disc Girl, MTB Disc Girl morado, 26 MTB Girl, 26 MTB Boy | RD$14,500 |
| Montaña 29″ | 29 MTB Disc Orion, 29 Boulder 3 | RD$19,500 |
| Paseo | Coral Playera, Cruiser Coral con parrilla | RD$19,500 |
| MTB Scott · Hardtail | Contrail 20 (×3), Scale 50, 20 Carbono, 920, 930, 935, 960 (×2), 970 | RD$59,000 |
| Doble suspensión Scott | Spark RC (World Cup, Team Issue, Team, Expert, Comp ×2, SL, 900 Pro, WC EVO, WC AXS), Spark 910, 960, 970 | RD$172,000 |
| Ruta y carretera Scott | Foil RC 20 (×2), Foil RC 10 (×3), Foil RC Pro, Addict RC Pro, Addict RC 15, Speedster 20 y 30 | RD$68,600 |
| Niños Scott | Roxter 20 (naranja), Contessa 24 | RD$34,900 |
| E-Bikes | Scott eRIDE (Patron 900/910/920/930, Lumen 900, Strike 940, Voltage 900, Solace Gravel 20) y Megamo (Reason AL 07, CRB 01, CRB 03; Flame CRB 01 y 10) | RD$330,000 |

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Las 67 bicis (foto, nombre, color, chips, precio y ficha técnica en `<template>`) |
| `styles.css` | Estilos: página clara, tarjetas, filtros y vista a pantalla completa |
| `script.js` | Filtros, modo Presentar (flechas, teclado, deslizar), mensajes de WhatsApp |
| `img/bicis/` | 67 fotos normalizadas (WebP 900 × 600, fondo blanco, misma línea de suelo) |
| `fuente/` | `catalogo-bicicletas-bicicentro.md` original |

**Cambiar un precio:** busca la bici por su `id` en `index.html` y cambia el precio que se muestra y el texto de `data-mensaje` y del enlace `wa.me` (dice «de RD$…»).

## Inventario WebFact1

Desde el 16-oct-2026 la página lee productos, precios y disponibilidad del inventario WebFact1 (`catalog-config.js` y `catalog-sync.js`) y reemplaza con ellos el HTML al cargar. El HTML de `index.html` queda como respaldo (sin JavaScript) y como referencia. Para que las bicis Scott y Megamo aparezcan en la página en vivo hay que cargarlas en WebFact1 (ver `fuente/importacion-webfact1-scott-megamo.csv`).

## Bicis Scott y Megamo (agregadas el 25-oct-2026)

Datos, descripción y tallas tomados de la página de cada producto en bicicentro.com.do (`fuente/bicicentro-scott-megamo-2026-10-25.jsonl`). Las fotos salen del PDF `fotos-bicicentro` (foto principal de cada página), recortadas y puestas sobre fondo blanco con el mismo encuadre que las Raleigh. Son de baja resolución: se ven bien en tarjeta, algo suaves a pantalla completa. Para mejorarlas, `fuente/descargar-fotos-bicicentro.ps1` baja las originales.

**Precios de Scott y Megamo (28-oct-2026):** son los mismos que muestra Bicicentro, sin margen ni redondeo a RD$500. Solo se quitan los centavos porque el catálogo muestra pesos enteros (97,999.99 → 98,000 · 899,999.91 → 900,000 · 427,499.87 → 427,500 · 36,899.99 → 36,900). Si hay oferta, se usa el precio rebajado. Para cambiarlo: función `redondeo()` del generador. Los Raleigh siguen con los precios de Bike Café (`fuente/catalogo-final.json`).

| Modelo | Bicicentro | En el catálogo |
|---|---|---|
| Scott Contrail 20 (2027) (Gris, verde o rosado) | RD$59,000.00 | RD$59,000 |
| Scott Contrail 20 aro 27.5 (Negra · talla XS) | RD$59,000.00 | RD$59,000 |
| Scott Contrail 20 aro 29 (Negra) | RD$59,000.00 | RD$59,000 |
| Scott Scale 50 (2027) (Negro) | RD$108,000.00 | RD$108,000 |
| Scott Scale 20 Carbono (2027) (Negro) | RD$165,000.00 | RD$165,000 |
| Scott Scale 920 (Negra o blanca) | RD$155,000.00 | RD$155,000 |
| Scott Scale 930 (Negra) | RD$108,000.00 | RD$108,000 |
| Scott Scale 935 (Verde) | RD$97,999.99 | RD$98,000 |
| Scott Scale 970 (Gris o rojo) | RD$96,000.00 | RD$96,000 |
| Scott Scale 960 | RD$133,000.00 | RD$133,000 |
| Scott Scale 960 (Naranja) | RD$133,000.00 | RD$133,000 |
| Scott Spark RC World Cup (2027) (Blanco) | RD$690,000.00 | RD$690,000 |
| Scott Spark RC Team Issue (2027) (Negro) | RD$550,000.00 | RD$550,000 |
| Scott Spark RC Team (2027) (Negro · talla M) | RD$390,000.00 | RD$390,000 |
| Scott Spark RC Expert (2027) (Gris) | RD$490,000.00 | RD$490,000 |
| Scott Spark RC Comp (2027) (Blanco) | RD$330,000.00 | RD$330,000 |
| Scott Spark RC SL | RD$744,000.00 | RD$744,000 |
| Scott Spark 910 (Negra · talla S) | RD$300,000.00 | RD$300,000 |
| Scott Spark RC WC EVO | RD$604,800.00 | RD$604,800 |
| Scott Spark 970 (Azul) | RD$172,000.00 | RD$172,000 |
| Scott Spark RC WC AXS | RD$516,000.00 | RD$516,000 |
| Scott Spark 960 (Negra) | RD$188,000.00 | RD$188,000 |
| Scott Spark RC Comp (Azul) | RD$228,000.00 | RD$228,000 |
| Scott Spark RC 900 Pro | RD$396,000.00 | RD$396,000 |
| Scott Foil RC 20 | RD$402,000.00 | RD$402,000 |
| Scott Foil RC 10 | RD$469,950.00 | RD$469,950 |
| Scott Foil RC 10 (Tallas XS y XXS) | RD$469,950.00 | RD$469,950 |
| Scott Foil RC Pro | RD$602,500.00 | RD$602,500 |
| Scott Foil RC 20 | RD$402,000.00 | RD$402,000 |
| Scott Foil RC 10 (Tallas M y L) | RD$470,000.00 | RD$470,000 |
| Scott Addict RC Pro | RD$650,000.00 | RD$650,000 |
| Scott Addict RC 15 (Carbón) | RD$465,000.00 | RD$465,000 |
| Scott Speedster 30 | RD$68,600.00 | RD$68,600 |
| Scott Speedster 20 | RD$77,000.00 | RD$77,000 |
| Megamo Reason AL 07 (2027) (Negro, blanco/rojo o azul/negro) | RD$395,000.00 | RD$395,000 |
| Megamo Reason CRB 03 AXS (2027) (Negro) | RD$679,000.00 | RD$679,000 |
| Megamo Flame CRB 01 Race (Navy o green forest) | RD$899,999.91 | RD$900,000 |
| Megamo Flame CRB 10 (Navy azul) | RD$427,499.87 | RD$427,500 |
| Megamo Reason CRB 01 (2027) (Naranja, verde o negra) | RD$861,000.00 | RD$861,000 |
| Scott Patron eRIDE 930 (Verde o negra) | RD$375,000.00 | RD$375,000 |
| Scott Solace Gravel 20 | RD$510,000.00 | RD$510,000 |
| Scott Patron eRIDE 900 | RD$525,500.00 | RD$525,500 |
| Scott Lumen eRIDE 900 | RD$672,600.00 | RD$672,600 |
| Scott Patron eRIDE 910 | RD$495,000.00 | RD$495,000 |
| Scott Patron eRIDE 920 | RD$435,000.00 | RD$435,000 |
| Scott Strike eRIDE 940 | RD$330,000.00 | RD$330,000 |
| Scott Voltage eRIDE 900 Tuned | RD$778,800.00 | RD$778,800 |
| Scott Roxter 20 (Naranja) | RD$36,899.99 | RD$36,900 |
| Scott Contessa 24 | RD$34,900.00 | RD$34,900 |

## Fuente de los datos

**Precios actualizados el 14-oct-2026** según `fuente/catalogo-final.json` (los de Bike Café). Todo lo demás sale de la tabla de Bicicentro:

`catalogo-bicicletas-bicicentro.md`: datos tomados de bicicentro.com.do el 13-oct-2026. Los chips y la ficha técnica salen solo de esa tabla. Contacto y horario: Instagram de Bike Café.

## Pendiente de confirmar con Bike Café

1. Que tengan cada modelo (los precios ya son los de Bike Café; la ficha técnica viene de Bicicentro).
2. No se muestra la disponibilidad («Solo queda 1»), porque es el stock de Bicicentro y no el de Bike Café.
3. «Garantía de por vida en el cuadro» (solo en las Raleigh): confirmar que aplica al comprar en Bike Café. En Scott y Megamo no se muestra garantía.
4. Raleigh 24 Girl: la tabla dice «estabilizadoras reforzadas», pero la foto no las muestra.
5. Raleigh MTB Disc Girl morado: la tabla no indica el aro.
6. Raleigh 29 Boulder 3: la foto original se llama «BOULDER5». Confirmar que es el modelo correcto.

## Verificación (25-oct-2026)

18/18 pruebas Playwright en escritorio (1440) y móvil (390): 18 bicis, filtro, Presentar, flechas, deslizar, mensaje de WhatsApp, Escape, sin JavaScript. Sin errores de consola ni desborde. Las capturas del contenedor usan fuentes sustitutas; en la vista previa se ven las reales.
7. Scott y Megamo: confirmar que tengan cada modelo y las tallas (son las de Bicicentro). Las ofertas de Bicicentro (−20 % o −30 %) pueden vencer.
8. Scott Lumen eRIDE 900: Bicicentro muestra un rango (RD$672,600 a 708,000); se usó el mínimo.
9. Duplicados con el mismo nombre y precio: Foil RC 20 (×2), Foil RC 10 (×3), Scale 960 (distinto color) y Contrail 20 (×3). Confirmar cuáles se dejan.
10. Megamo (Reason y Flame) y Solace Gravel 20 están como E-Bike porque así los clasifica Bicicentro.
11. Fuera del catálogo: Scale 910 (la página no existe) y Spark 940 Carbon (agotada y sin precio).
12. Scott Contessa 24: la página de Bicicentro no indica color ni aro; el «24» sale del nombre y el color se omite (la foto es turquesa).
