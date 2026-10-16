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

  const urlBici = (id) => `${location.origin}${location.pathname}#${id}`;
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

  const pintar = (dir = 0) => {
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
    vista.close();
    document.body.style.overflow = '';
    if (publicado && location.hash) history.replaceState(null, '', location.pathname);
    disparador?.focus?.({ preventScroll: true });
  };
  const mover = (paso) => { i = (i + paso + lista.length) % lista.length; pintar(paso); };

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-ficha]');
    if (t && e.button === 0 && !e.metaKey && !e.ctrlKey) { e.preventDefault(); abrir(document.getElementById(t.dataset.ficha), t); }
    const p = e.target.closest('[data-presentar]');
    if (p) { const l = visibles(); if (l.length) abrir(l[0], p); }
  });
  vista.addEventListener('cancel', (e) => { e.preventDefault(); cerrar(); });
  vista.addEventListener('click', (e) => {
    const ir = e.target.closest('[data-ir]');
    if (ir) mover(Number(ir.dataset.ir));
    if (e.target.closest('[data-cerrar]')) cerrar();
  });
  vista.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); mover(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); mover(-1); }
  });
  // Deslizar con el dedo sobre la foto
  let x0 = null; let y0 = null;
  const zona = $('.vista__foto', vista);
  zona.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  zona.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    const dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) mover(dx < 0 ? 1 : -1);
    x0 = null;
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
