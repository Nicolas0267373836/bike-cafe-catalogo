/* Live storefront data from the isolated WebFact1 public projection. */
(() => {
 'use strict';
 const cfg=window.WEBFACT_CATALOG;
 const money=new Intl.NumberFormat('es-DO',{maximumFractionDigits:2});
 let revision=null,running=false;
 const el=(tag,className,text)=>{const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n;};
 const notice=el('p','catalog-status');notice.setAttribute('role','status');document.querySelector('.catalogo').before(notice);
 const priceNode=p=>{const n=el('p','bici__precio');const s=el('span','precio');s.append(el('span','precio__moneda','RD$'),document.createTextNode(money.format(p.price)));n.append(s);return n;};
 function render(data){
  if(!data||!Array.isArray(data.products))throw Error('Sin datos');
  const fragment=document.createDocumentFragment(),filterFragment=document.createDocumentFragment();
  const all=el('button','filtro','Todas ');all.type='button';all.dataset.filtro='todas';all.setAttribute('aria-pressed','true');all.append(el('span','',String(data.products.length)));filterFragment.append(all);
  const groups=new Map();for(const p of data.products){const category=p.category||'Productos';if(!groups.has(category))groups.set(category,[]);groups.get(category).push(p);}
  
  for(const [category,products] of groups){
   const group='categoria-'+encodeURIComponent(category),section=el('section','grupo');section.dataset.seccion=group;section.id=group;
   const head=el('header','grupo__cabeza');const title=el('h2','grupo__titulo',category);title.id=group+'-titulo';section.setAttribute('aria-labelledby',title.id);head.append(title,el('p','grupo__info',products.length+' '+(products.length===1?'producto':'productos')));section.append(head);
   const filter=el('button','filtro',category+' ');filter.type='button';filter.dataset.filtro=group;filter.setAttribute('aria-pressed','false');filter.append(el('span','',String(products.length)));filterFragment.append(filter);
   const grid=el('div','rejilla');
   for(const p of products){
    const card=el('article','bici');card.id=p.id;card.dataset.bici='';card.dataset.grupo=group;card.dataset.categoria=category;card.dataset.nombre=p.name;card.dataset.mensaje='Hola, Bike Café. Me interesa '+p.name+' de RD$'+money.format(p.price)+'. ¿Me pueden dar más información?';
    const open=el('a','bici__abrir');open.href='#'+encodeURIComponent(p.id);open.dataset.ficha=p.id;open.setAttribute('aria-label','Ver en grande '+p.name);
    const photo=el('span','bici__foto');const img=el('img');img.alt=p.name;img.width=900;img.height=600;img.loading='lazy';img.decoding='async';
    let image;try{image=new URL(p.imageUrl);}catch{image=null;}if(image?.protocol==='https:')img.src=image.href;else img.src='img/og-bike-cafe.jpg';photo.append(img);open.append(photo);card.append(open);
    const body=el('div','bici__cuerpo');body.append(el('h3','bici__nombre',p.name));if(p.variant)body.append(el('p','bici__color',p.variant));
    const chips=el('ul','bici__chips');for(const chip of (Array.isArray(p.chips)?p.chips:[]).slice(0,6))if(typeof chip==='string')chips.append(el('li','',chip));body.append(chips);
    const status=p.stock===null?'Consultar disponibilidad':p.stock>0?'Disponible':'Agotado';body.append(el('p','bici__stock'+(p.stock===0?' bici__stock--out':''),status));
    const footer=el('div','bici__pie');footer.append(priceNode(p));const wa=el('a','boton boton--wa','Preguntar');wa.href='https://wa.me/'+document.body.dataset.whatsapp+'?text='+encodeURIComponent(card.dataset.mensaje);wa.target='_blank';wa.rel='noopener';footer.append(wa);body.append(footer);card.append(body);
    const template=el('template','bici__ficha'),dl=el('dl','ficha-tecnica');for(const pair of Array.isArray(p.specs)?p.specs:[]){if(typeof pair.label!=='string'||typeof pair.value!=='string')continue;const row=el('div');row.append(el('dt','',pair.label),el('dd','',pair.value));dl.append(row);}
    if(p.description){const row=el('div');row.append(el('dt','','Descripción'),el('dd','',p.description));dl.append(row);}const availability=el('div');availability.append(el('dt','','Disponibilidad'),el('dd','',status));dl.append(availability);template.content.append(dl);card.append(template);grid.append(card);
   }
   section.append(grid);fragment.append(section);
  }
  if(!data.products.length)fragment.append(el('p','catalog-empty','No hay productos publicados por ahora.'));
  document.querySelector('.catalogo').replaceChildren(fragment);document.querySelector('.filtros__pista').replaceChildren(filterFragment);
  revision=data.revision;notice.textContent='';window.dispatchEvent(new Event('wf:catalog:update'));
 }
 async function refresh(){
  if(running)return;running=true;
  try{
   const response=await fetch(cfg.url+'/rest/v1/rpc/wf1_catalog_public',{method:'POST',headers:{apikey:cfg.key,'Content-Type':'application/json'},body:JSON.stringify({p_slug:cfg.slug}),cache:'no-store',signal:AbortSignal.timeout(10000)});
   if(!response.ok)throw Error('No disponible');const data=await response.json();if(!data)throw Error('No disponible');if(data.revision!==revision)render(data);else notice.textContent='';
  }catch{
   notice.textContent='No pudimos actualizar el catálogo. Confirma precio y disponibilidad por WhatsApp.';
   if(revision===null){document.querySelector('.catalogo').replaceChildren(el('p','catalog-empty','El catálogo no está disponible en este momento. Puedes contactarnos por WhatsApp.'));document.querySelector('.filtros__pista').replaceChildren();}
  }finally{running=false;}
 }
 window.catalogReady=cfg?refresh():Promise.resolve();
 if(cfg){setInterval(()=>{if(!document.hidden)refresh();},30000);window.addEventListener('focus',refresh);}
})();
