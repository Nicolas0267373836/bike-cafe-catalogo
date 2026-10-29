/* Bike Café · catálogo simple: filtros, vista a pantalla completa
   («Presentar») con flechas, teclado y deslizar, y cadena con el scroll. */
(async () => {
  'use strict';
  await window.catalogReady;
  document.documentElement.classList.add('js');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const sinMov = window.matchMedia('(prefers-reduced-motion: reduce)');
  const publicado = /^https?:$/.test(location.protocol);
  const WA = document.body.dataset.whatsapp || '';

  let bicis = Array.from(document.querySelectorAll('[data-bici]'));
  let secciones = Array.from(document.querySelectorAll('[data-seccion]'));
  let filtro = 'todas';
  const visibles = () => bicis.filter((b) => filtro === 'todas' || b.dataset.grupo === filtro);

  const urlBici = (id) => `${location.origin}${location.pathname}${location.search}#${id}`;
  const enlaceWA = (b) => {
    const texto = publicado ? `${b.dataset.mensaje}\n${urlBici(b.id)}` : b.dataset.mensaje;
    return `https://wa.me/${WA}?text=${encodeURIComponent(texto)}`;
  };
  if (publicado) bicis.forEach((b) => { const l = $('.boton--wa', b); if (l) l.href = enlaceWA(b); });

  /* Filtros */
  let botones = Array.from(document.querySelectorAll('[data-filtro]'));
  const filtrar = (valor,scroll=true) => {
    filtro = valor;
    botones.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === valor)));
    secciones.forEach((s) => { s.hidden = !(valor === 'todas' || s.dataset.seccion === valor); });
    const cat = $('.catalogo');
    if (scroll && cat && cat.getBoundingClientRect().top < 0) window.scrollTo({ top: window.scrollY + cat.getBoundingClientRect().top - 70, behavior: 'instant' });
  };
  botones.forEach((b) => b.addEventListener('click', () => filtrar(b.dataset.filtro)));

  /* Vista a pantalla completa */
  const vista = $('#vista');
  const v = {
    img: $('.vista__img', vista), cat: $('.vista__categoria', vista), cont: $('.vista__contador', vista),
    titulo: $('.vista__titulo', vista), color: $('.vista__color', vista), precio: $('.vista__precio', vista),
    tabla: $('.vista__tabla', vista), wa: $('.vista__wa', vista), cerrar: $('[data-cerrar]', vista),
  };
  let lista = [];
  let i = 0;
  let disparador = null;

  /* Zoom de la foto: botones, arrastre y pellizco dentro de la vista. */
  const lienzo = $('.vista__lienzo', vista);
  const nivelZoom = $('[data-zoom-nivel]', vista);
  const menosZoom = $('[data-zoom="menos"]', vista);
  const masZoom = $('[data-zoom="mas"]', vista);
  let zoom = 1, panX = 0, panY = 0;
  const punteros = new Map();
  let inicio = null, pellizco = null, gestoMultiple = false;
  const limitar = (n, min, max) => Math.min(max, Math.max(min, n));
  const aplicarZoom = (nuevo, x = panX, y = panY) => {
    zoom = limitar(nuevo, 1, 3);
    const limiteX = Math.max(0, (v.img.offsetWidth * zoom - lienzo.clientWidth) / 2);
    const limiteY = Math.max(0, (v.img.offsetHeight * zoom - lienzo.clientHeight) / 2);
    panX = limitar(x, -limiteX, limiteX); panY = limitar(y, -limiteY, limiteY);
    v.img.classList.remove('es-entrando');
    v.img.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
    lienzo.classList.toggle('es-acercada', zoom > 1);
    nivelZoom.value = `${Math.round(zoom * 100)} %`;
    menosZoom.disabled = zoom <= 1; masZoom.disabled = zoom >= 3;
  };
  const reiniciarZoom = () => {
    punteros.forEach((_p, id) => { if (lienzo.hasPointerCapture(id)) lienzo.releasePointerCapture(id); });
    punteros.clear(); inicio = null; pellizco = null; gestoMultiple = false;
    lienzo.classList.remove('es-arrastrando');
    aplicarZoom(1, 0, 0);
  };
  const puntoMedio = (a, b) => {
    const r = lienzo.getBoundingClientRect();
    return { x: (a.x + b.x) / 2 - r.left - r.width / 2, y: (a.y + b.y) / 2 - r.top - r.height / 2 };
  };
  lienzo.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });
    lienzo.setPointerCapture(e.pointerId);
    if (punteros.size === 1) inicio = { x: e.clientX, y: e.clientY, panX, panY };
    if (punteros.size === 2) {
      gestoMultiple = true;
      const [a, b] = [...punteros.values()];
      pellizco = { distancia: Math.hypot(a.x - b.x, a.y - b.y), zoom, panX, panY, centro: puntoMedio(a, b) };
    }
    lienzo.classList.toggle('es-arrastrando', zoom > 1);
  });
  lienzo.addEventListener('pointermove', (e) => {
    if (!punteros.has(e.pointerId)) return;
    punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (punteros.size === 2 && pellizco?.distancia > 0) {
      const [a, b] = [...punteros.values()], centro = puntoMedio(a, b);
      const nuevo = limitar(pellizco.zoom * Math.hypot(a.x - b.x, a.y - b.y) / pellizco.distancia, 1, 3);
      const ratio = nuevo / pellizco.zoom;
      aplicarZoom(nuevo, (pellizco.panX - pellizco.centro.x) * ratio + centro.x, (pellizco.panY - pellizco.centro.y) * ratio + centro.y);
    } else if (punteros.size === 1 && inicio && zoom > 1 && !gestoMultiple) {
      aplicarZoom(zoom, inicio.panX + e.clientX - inicio.x, inicio.panY + e.clientY - inicio.y);
    }
  });
  const terminarGesto = (e) => {
    if (!punteros.has(e.pointerId)) return;
    const dx = inicio ? e.clientX - inicio.x : 0, dy = inicio ? e.clientY - inicio.y : 0;
    const deslizar = e.type === 'pointerup' && e.pointerType !== 'mouse' && punteros.size === 1 && !gestoMultiple && zoom === 1 && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy);
    punteros.delete(e.pointerId);
    if (lienzo.hasPointerCapture(e.pointerId)) lienzo.releasePointerCapture(e.pointerId);
    if (!punteros.size) { inicio = null; pellizco = null; gestoMultiple = false; lienzo.classList.remove('es-arrastrando'); }
    if (deslizar) mover(dx < 0 ? 1 : -1);
  };
  lienzo.addEventListener('pointerup', terminarGesto);
  lienzo.addEventListener('pointercancel', terminarGesto);
  lienzo.addEventListener('dblclick', () => aplicarZoom(zoom > 1 ? 1 : 2, 0, 0));
  window.addEventListener('resize', () => { if (vista.open) aplicarZoom(zoom); });

  const pintar = (dir = 0) => {
    reiniciarZoom();
    const b = lista[i];
    const foto = $('img', b);
    v.img.src = foto.currentSrc || foto.src;
    v.img.alt = foto.alt;
    if (dir && !sinMov.matches) {
      v.img.style.setProperty('--dir', dir);
      v.img.classList.remove('es-entrando'); void v.img.offsetWidth; v.img.classList.add('es-entrando');
    }
    v.cat.textContent = b.dataset.categoria;
    v.cont.textContent = `${i + 1} / ${lista.length}`;
    v.titulo.innerHTML = $('.bici__nombre', b).innerHTML;
    v.color.textContent = $('.bici__color', b)?.textContent || '';
    v.precio.innerHTML = $('.bici__precio', b).innerHTML;
    v.tabla.innerHTML = '';
    v.tabla.append($('template', b).content.cloneNode(true));
    v.wa.href = enlaceWA(b);
    v.wa.setAttribute('aria-label', `Preguntar por WhatsApp por la ${b.dataset.nombre}`);
    if (publicado) history.replaceState(null, '', `#${b.id}`);
  };
  const abrir = (bici, origen) => {
    lista = visibles();
    if (!lista.includes(bici)) { lista = bicis; }
    i = lista.indexOf(bici);
    disparador = origen || document.activeElement;
    pintar();
    if (!vista.open) vista.showModal();
    document.body.style.overflow = 'hidden';
    v.cerrar.focus({ preventScroll: true });
  };
  const cerrar = () => {
    if (!vista.open) return;
    reiniciarZoom();
    vista.close();
    document.body.style.overflow = '';
    if (publicado && location.hash) history.replaceState(null, '', location.pathname+location.search);
    disparador?.focus?.({ preventScroll: true });
  };
  const mover = (paso) => { i = (i + paso + lista.length) % lista.length; pintar(paso); };

  document.addEventListener('click', (e) => {
    if(window.WEBFACT_TEST_CATALOG && e.target.closest('a[href*="wa.me"]')){e.preventDefault();return;}
    const t = e.target.closest('[data-ficha]');
    if (t && e.button === 0 && !e.metaKey && !e.ctrlKey) { e.preventDefault(); abrir(document.getElementById(t.dataset.ficha), t); }
    const p = e.target.closest('[data-presentar]');
    if (p) { const l = visibles(); if (l.length) abrir(l[0], p); }
  });
  vista.addEventListener('cancel', (e) => { e.preventDefault(); cerrar(); });
  vista.addEventListener('click', (e) => {
    const control = e.target.closest('[data-zoom]');
    if (control) aplicarZoom(control.dataset.zoom === 'ajustar' ? 1 : zoom + (control.dataset.zoom === 'mas' ? 0.5 : -0.5));
    const ir = e.target.closest('[data-ir]');
    if (ir) mover(Number(ir.dataset.ir));
    if (e.target.closest('[data-cerrar]')) cerrar();
  });
  vista.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); mover(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); mover(-1); }
    if (['+', '=', '-', '0'].includes(e.key)) {
      e.preventDefault(); aplicarZoom(e.key === '0' ? 1 : zoom + (e.key === '-' ? -0.5 : 0.5));
    }
  });

  const desdeHash = () => {
    const b = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (b && b.matches('[data-bici]')) abrir(b, $('[data-ficha]', b));
  };
  if (location.hash) requestAnimationFrame(desdeHash);
  window.addEventListener('hashchange', desdeHash);

  window.addEventListener('wf:catalog:update',()=>{
    if(vista.open)cerrar();
    bicis=Array.from(document.querySelectorAll('[data-bici]'));secciones=Array.from(document.querySelectorAll('[data-seccion]'));botones=Array.from(document.querySelectorAll('[data-filtro]'));
    botones.forEach(b=>b.addEventListener('click',()=>filtrar(b.dataset.filtro)));
    if(publicado)bicis.forEach(b=>{const l=$('.boton--wa',b);if(l)l.href=enlaceWA(b);});
    filtrar(botones.some(b=>b.dataset.filtro===filtro)?filtro:'todas',false);
    if(location.hash)desdeHash();
  });
  /* Cadena del logo */
  const cadena = $('.cadena');
  if (cadena && !sinMov.matches) {
    let pendiente = false;
    window.addEventListener('scroll', () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => { pendiente = false; cadena.style.setProperty('--avance', ((window.scrollY * 0.5) % 89.88).toFixed(2)); });
    }, { passive: true });
  }
})();
