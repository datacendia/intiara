/* ===== INTIARA · shared site script ===== */
/* Content (products, materials, EN/ES copy, settings) is loaded from
   content/content.json so it can be edited from the /admin panel. */

var PRODUCTS=[], MATERIALS=[], I18N={en:{},es:{}}, SITE={};

var lang='en',cart=[],currentFilter='all';
var euro=function(n){var s=(SITE&&SITE.currencySymbol)||'€';return s+Math.round(n);};
function t(k){return (I18N[lang]&&I18N[lang][k]!==undefined)?I18N[lang][k]:k;}
function mono(){return '<svg class="wm" viewBox="0 0 133 120" fill="none" aria-hidden="true"><use href="#iamono"/></svg>';}
function findP(id){for(var i=0;i<PRODUCTS.length;i++){if(PRODUCTS[i].id===id)return PRODUCTS[i];}return null;}
function qparam(k){return new URLSearchParams(location.search).get(k);}
function tint(hex){hex=hex||'#8a7d6b';var r=parseInt(hex.substr(1,2),16),g=parseInt(hex.substr(3,2),16),b=parseInt(hex.substr(5,2),16);r=Math.round(r+(238-r)*0.78);g=Math.round(g+(234-g)*0.78);b=Math.round(b+(220-b)*0.78);return 'rgb('+r+','+g+','+b+')';}
function escAttr(s){return (''+(s||'')).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function pImgs(p){return (p&&p.images&&p.images.length)?p.images:[];}

/* ---- content loading ---- */
function loadContent(){
  return fetch('content/content.json?ts='+Date.now(),{cache:'no-store'})
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
    .then(function(d){
      PRODUCTS=d.products||[];MATERIALS=d.materials||[];
      I18N=d.copy||{en:{},es:{}};SITE=d.site||{};
    })
    .catch(function(e){console.error('INTIARA: could not load content.json',e);});
}

/* ---- chrome injection (cart + toast) ---- */
function injectChrome(){
  if(document.getElementById('overlay'))return;
  var html=''
   +'<div class="overlay" id="overlay"></div>'
   +'<aside class="drawer" id="drawer"><div class="drawer-head"><h3 data-i18n="cart_title">Your bag</h3>'
   +'<button class="icon-btn" id="cartClose" aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button></div>'
   +'<div class="drawer-body" id="cartBody"></div>'
   +'<div class="drawer-foot"><div class="tot"><span class="eyebrow" data-i18n="cart_subtotal">Subtotal</span><span class="t" id="cartTotal">€0</span></div>'
   +'<button class="btn btn-fill" id="cartCheckout" data-i18n="cart_checkout">Checkout</button>'
   +'<p class="ship-note" data-i18n="cart_ship">Complimentary worldwide shipping</p></div></aside>'
   +'<div class="toast" id="toast"></div>';
  var d=document.createElement('div');d.innerHTML=html;document.body.appendChild(d);
  document.getElementById('overlay').onclick=closeCart;
  document.getElementById('cartClose').onclick=closeCart;
  document.getElementById('cartCheckout').onclick=function(){toast(t('toast_checkout'));};
}

/* ---- rendering ---- */
function productCard(p){
  var imgs=pImgs(p);
  var photo=imgs.length
    ? '<div class="photo"><img class="pimg" src="'+escAttr(imgs[0])+'" alt="'+escAttr(p.name)+'" loading="lazy"></div>'
    : '<div class="photo" style="background:'+tint(p.hex)+'">'+mono()+'<span class="plabel">'+p.name+'</span></div>';
  return '<a class="card reveal" href="product.html?id='+p.id+'">'
    +'<div class="ph"><span class="cat">'+(p.cat[lang]||p.cat.en)+'</span>'
    +photo
    +'<span class="view"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.5"/></svg>'+t('view_piece')+'</span></div>'
    +'<div class="info"><div><div class="nm">'+p.name+'</div><div class="colourway"><span class="swatch" style="background:'+p.hex+'"></span>'+(p.colour[lang]||p.colour.es)+'</div></div><div class="price">'+euro(p.price)+'</div></div></a>';
}
function renderGrid(id,list){var g=document.getElementById(id);if(!g)return;g.innerHTML=list.map(productCard).join('');observeReveal();}
function renderCollection(){
  var g=document.getElementById('productGrid');if(!g)return;
  var list=PRODUCTS.filter(function(p){return currentFilter==='all'||p.type===currentFilter;});
  g.innerHTML=list.map(productCard).join('');observeReveal();
}
var colSel=0;
function colCard(p){
  var imgs=pImgs(p);
  var photo=imgs.length
    ? '<div class="cv-photo photo"><img class="pimg" src="'+escAttr(imgs[0])+'" alt="'+escAttr(p.name)+'"></div>'
    : '<div class="cv-photo photo" style="background:'+tint(p.hex)+'">'+mono()+'<span class="plabel">'+p.name+'</span></div>';
  var quote=p.quote?(p.quote[lang]||p.quote.en):'';
  return photo
    +'<div>'
    +'<p class="cv-sub">'+(p.cat[lang]||p.cat.en)+'</p>'
    +'<h3>'+p.name+'</h3>'
    +(quote?'<p class="cv-quote">'+quote+'</p>':'')
    +'<p class="cv-desc">'+(p.desc[lang]||p.desc.en)+'</p>'
    +'<p class="cv-price">'+euro(p.price)+'</p>'
    +'<div class="cv-actions">'
    +'<button class="btn btn-fill" onclick="addToCart(\''+p.id+'\')">'+t('add_bag')+'</button>'
    +'<a class="btn" href="product.html?id='+p.id+'">'+t('view_piece')+'</a>'
    +'</div></div>';
}
function renderCollectionShowcase(){
  var tabs=document.getElementById('colTabs'),view=document.getElementById('colView');
  if(!tabs||!view)return;
  if(colSel>=PRODUCTS.length)colSel=0;
  tabs.innerHTML=PRODUCTS.map(function(p,i){
    return '<button class="col-tab'+(i===colSel?' active':'')+'" data-i="'+i+'">'
      +'<span class="ct-n">0'+(i+1)+'</span>'
      +'<span><span class="ct-nm">'+p.name+'</span><span class="ct-sub">'+(p.cat[lang]||p.cat.en)+'</span></span>'
      +'</button>';
  }).join('');
  tabs.querySelectorAll('.col-tab').forEach(function(b){
    b.onclick=function(){colSel=parseInt(b.getAttribute('data-i'),10);renderCollectionShowcase();};
  });
  view.innerHTML=colCard(PRODUCTS[colSel]);
  observeReveal();
}
function renderMaterials(id){
  var c=document.getElementById(id||'materialsList');if(!c)return;
  c.innerHTML=MATERIALS.map(function(m){
    var photo=m.image
      ? '<div class="mphoto photo"><img class="pimg" src="'+escAttr(m.image)+'" alt="'+escAttr(m.t[lang]||m.t.en)+'" loading="lazy"></div>'
      : '<div class="mphoto photo dark">'+mono()+'<span class="plabel">'+m.ph[lang]+'</span></div>';
    return '<div class="mat reveal">'+photo
      +'<div class="mbody"><span class="mnum">'+m.n+'</span><h3>'+m.t[lang]+'</h3><p class="mlead">'+m.lead[lang]+'</p><p>'+m.p[lang]+'</p></div></div>';
  }).join('');
  observeReveal();
}
function renderProductDetail(){
  var id=qparam('id')||(PRODUCTS[0]&&PRODUCTS[0].id);var p=findP(id);if(!p)p=PRODUCTS[0];if(!p)return;currentProductId=p.id;
  document.title='INTIARA · '+p.name;
  var set=function(i,v){var el=document.getElementById(i);if(el)el.textContent=v;};
  set('pCat',p.cat[lang]||p.cat.en);set('pName',p.name);set('pPrice',euro(p.price));
  var cw=document.getElementById('pColour');if(cw)cw.innerHTML='<span class="swatch" style="background:'+p.hex+'"></span>'+(p.colour[lang]||p.colour.es);
  set('pDesc',p.desc[lang]||p.desc.en);
  var pq=document.getElementById('pQuote');if(pq){var q=p.quote?(p.quote[lang]||p.quote.en):'';pq.textContent=q;pq.style.display=q?'':'none';}
  var imgs=pImgs(p);
  var main=document.getElementById('pMain');
  if(main){
    if(imgs.length){main.style.background='';main.innerHTML='<img class="pimg" src="'+escAttr(imgs[0])+'" alt="'+escAttr(p.name)+'">';}
    else{main.style.background=tint(p.hex);main.innerHTML=mono()+'<span class="plabel">'+p.name+' · '+(p.colour[lang]||p.colour.es)+'</span>';}
  }
  var th=document.getElementById('pThumbs');
  if(th){
    if(imgs.length){
      th.innerHTML=imgs.map(function(src,i){return '<div class="photo'+(i===0?' active':'')+'" data-src="'+escAttr(src)+'"><img class="pimg" src="'+escAttr(src)+'" alt="'+escAttr(p.name)+'"></div>';}).join('');
      th.querySelectorAll('.photo').forEach(function(el){el.onclick=function(){var s=el.getAttribute('data-src');if(main){main.innerHTML='<img class="pimg" src="'+escAttr(s)+'" alt="'+escAttr(p.name)+'">';}th.querySelectorAll('.photo').forEach(function(x){x.classList.remove('active');});el.classList.add('active');};});
    }else{
      var labs=['Front','Detail','Interior','Worn'];var lse=['Frente','Detalle','Interior','En uso'];th.innerHTML='';
      for(var i=0;i<4;i++){th.innerHTML+='<div class="photo" style="background:'+tint(p.hex)+'">'+mono()+'<span class="plabel">'+(lang==='en'?labs[i]:lse[i])+'</span></div>';}
    }
  }
  set('cArtisan',p.artisan);set('cRegion',p.region[lang]||p.region.en);set('cLoom',p.loom);
  var addb=document.getElementById('pAdd');if(addb)addb.onclick=function(){addToCart(p.id);};
  var rel=document.getElementById('relatedGrid');if(rel){var others=PRODUCTS.filter(function(x){return x.id!==p.id;}).slice(0,3);rel.innerHTML=others.map(productCard).join('');}
  observeReveal();
}
var currentProductId=null;

/* ---- site images + links (from settings) ---- */
function applySiteImages(){
  var imgs=(SITE&&SITE.images)||{};
  document.querySelectorAll('[data-img]').forEach(function(el){
    var key=el.getAttribute('data-img');var url=imgs[key];var ex=el.querySelector('.pimg');
    if(url){if(!ex){ex=document.createElement('img');ex.className='pimg';el.appendChild(ex);}ex.src=url;}
    else if(ex){ex.remove();}
  });
}
function applySiteLinks(){
  document.querySelectorAll('[data-link]').forEach(function(el){
    var k=el.getAttribute('data-link');
    if(k==='email'){if(SITE.email){el.href='mailto:'+SITE.email;el.textContent=SITE.email;}}
    else if(k==='instagram'&&SITE.instagram){el.href=SITE.instagram;el.target='_blank';el.rel='noopener';}
    else if(k==='pinterest'&&SITE.pinterest){el.href=SITE.pinterest;el.target='_blank';el.rel='noopener';}
  });
}
function injectWhatsApp(){
  if(document.getElementById('waFab'))return;
  var num=(''+(SITE.whatsapp||'')).replace(/[^0-9]/g,'');if(!num)return;
  var a=document.createElement('a');a.id='waFab';a.href='https://wa.me/'+num;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label','WhatsApp');
  a.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.115v.408zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
  document.body.appendChild(a);
}

/* ---- i18n apply ---- */
function setLang(l){
  lang=l;document.documentElement.lang=l;
  var en=document.getElementById('langEn'),es=document.getElementById('langEs');
  if(en)en.classList.toggle('active',l==='en');if(es)es.classList.toggle('active',l==='es');
  document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(I18N[l]&&I18N[l][k]!==undefined)el.innerHTML=I18N[l][k];});
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){var k=el.getAttribute('data-i18n-ph');if(I18N[l]&&I18N[l][k]!==undefined)el.setAttribute('placeholder',I18N[l][k]);});
  renderGrid('featuredGrid',PRODUCTS.slice(0,3));
  renderCollection();
  renderCollectionShowcase();
  renderMaterials('materialsList');
  if(document.getElementById('pName'))renderProductDetail();
  renderCart();
  try{localStorage.setItem('intiara_lang',l);}catch(e){}
}

/* ---- cart ---- */
function addToCart(id){var p=findP(id);cart.push({name:p.name,meta:(p.cat[lang]||p.cat.en)+' · '+(p.colour[lang]||p.colour.es),price:p.price,hex:p.hex,img:(pImgs(p)[0]||'')});saveCart();renderCart();toast(t('toast_added'));openCart();}
function removeItem(i){cart.splice(i,1);saveCart();renderCart();}
function cartTotal(){return cart.reduce(function(s,x){return s+x.price;},0);}
function renderCart(){
  var b=document.getElementById('cartBody');if(!b)return;
  var cc=document.getElementById('cartCount');if(cc)cc.textContent=cart.length;
  document.getElementById('cartTotal').textContent=euro(cartTotal());
  if(!cart.length){b.innerHTML='<div class="cart-empty">'+t('cart_empty')+'</div>';return;}
  b.innerHTML=cart.map(function(it,i){
    var thumb=it.img?'<div class="thumb photo"><img class="pimg" src="'+escAttr(it.img)+'" alt=""></div>':'<div class="thumb photo" style="background:'+tint(it.hex)+'">'+mono()+'</div>';
    return '<div class="cart-item">'+thumb+'<div style="flex:1"><div class="ci-nm">'+it.name+'</div><div class="ci-meta">'+it.meta+'</div><div class="ci-bottom"><span>'+euro(it.price)+'</span><button class="rm" onclick="removeItem('+i+')">'+t('cart_remove')+'</button></div></div></div>';
  }).join('');
}
function saveCart(){try{localStorage.setItem('intiara_cart',JSON.stringify(cart));}catch(e){}}
function openCart(){document.getElementById('drawer').classList.add('open');document.getElementById('overlay').classList.add('open');}
function closeCart(){document.getElementById('drawer').classList.remove('open');document.getElementById('overlay').classList.remove('open');}

/* ---- misc ---- */
function subscribe(e){e.preventDefault();e.target.reset();toast(t('toast_sub'));}
function sendContact(e){e.preventDefault();e.target.reset();toast(t('contact_sent'));}
var toastTimer;function toast(msg){var el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){el.classList.remove('show');},2600);}
function observeReveal(){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:.12});document.querySelectorAll('.reveal:not(.in)').forEach(function(el){io.observe(el);});}

/* ---- init ---- */
function initINTIARA(){
  loadContent().then(function(){
    try{var sl=localStorage.getItem('intiara_lang');if(sl)lang=sl;var sc=localStorage.getItem('intiara_cart');if(sc)cart=JSON.parse(sc)||[];}catch(e){}
    injectChrome();
    var mt=document.getElementById('menuToggle');if(mt)mt.onclick=function(){document.getElementById('navLinks').classList.toggle('open');};
    document.querySelectorAll('#navLinks a').forEach(function(a){a.addEventListener('click',function(){document.getElementById('navLinks').classList.remove('open');});});
    var en=document.getElementById('langEn'),es=document.getElementById('langEs');
    if(en)en.onclick=function(){setLang('en');};if(es)es.onclick=function(){setLang('es');};
    document.querySelectorAll('.js-cart-open').forEach(function(b){b.onclick=openCart;});
    document.querySelectorAll('.filter').forEach(function(f){f.onclick=function(){currentFilter=f.getAttribute('data-filter');document.querySelectorAll('.filter').forEach(function(x){x.classList.toggle('active',x===f);});renderCollection();};});
    document.querySelectorAll('.acc-h').forEach(function(h){h.onclick=function(){var it=h.parentElement;var c=it.querySelector('.acc-c');if(it.classList.contains('open')){it.classList.remove('open');c.style.maxHeight=null;}else{it.classList.add('open');c.style.maxHeight=c.scrollHeight+'px';}};});
    var nf=document.getElementById('newsForm');if(nf)nf.onsubmit=subscribe;
    var cf=document.getElementById('contactForm');if(cf)cf.onsubmit=sendContact;
    window.addEventListener('scroll',function(){var h=document.getElementById('hdr');if(h)h.classList.toggle('scrolled',window.scrollY>10);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeCart();});
    applySiteImages();applySiteLinks();injectWhatsApp();
    setLang(lang);
    observeReveal();
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initINTIARA);else initINTIARA();
