/* ===== INTIARA · shared site script ===== */

var PRODUCTS=[
 {id:'inti', type:'bag',    cat:{en:'Tote',es:'Bolso tote'},          name:'Inti',  colour:{es:'Cacao',en:'Cocoa'},  hex:'#5B4636', price:480, artisan:'Rosa Q.',  region:{en:'Arequipa, Peru',es:'Arequipa, Perú'}, loom:'AR-014',
   desc:{en:'A structured everyday tote in handwoven baby alpaca, lined with a handloomed Peruvian interior. Quiet, generous and made to last.',es:'Un bolso tote estructurado en baby alpaca tejida a mano, forrado con un telar peruano. Discreto, amplio y hecho para durar.'}},
 {id:'killa',type:'bag',    cat:{en:'Shoulder bag',es:'Bolso de hombro'},name:'Killa',colour:{es:'Chocolate',en:'Chocolate'},hex:'#3B2F24',price:460, artisan:'Elena M.', region:{en:'Arequipa, Peru',es:'Arequipa, Perú'}, loom:'AR-027',
   desc:{en:'A softly sculpted shoulder bag with a 950 silver clasp and a single Andean opal set by hand. Evening or day, without effort.',es:'Un bolso de hombro de forma suave, con broche de plata 950 y un ópalo andino engastado a mano. De día o de noche, sin esfuerzo.'}},
 {id:'pacha',type:'bag',    cat:{en:'Crossbody',es:'Bandolera'},      name:'Pacha', colour:{es:'Camello',en:'Camel'}, hex:'#A77B45', price:420, artisan:'Carmen A.',region:{en:'Puno, Peru',es:'Puno, Perú'},     loom:'PU-009',
   desc:{en:'A compact crossbody woven in warm camel alpaca, finished with an adjustable strap and silver detail. The piece for moving lightly.',es:'Una bandolera compacta tejida en alpaca color camello, con correa ajustable y detalle de plata. La pieza para moverse con ligereza.'}},
 {id:'mayu', type:'bag',    cat:{en:'Bucket bag',es:'Bolso saco'},    name:'Mayu',  colour:{es:'Marfil',en:'Ivory'},  hex:'#E7DCC6', price:440, artisan:'Rosa Q.',  region:{en:'Arequipa, Peru',es:'Arequipa, Perú'}, loom:'AR-018',
   desc:{en:'A fluid bucket bag in ivory alpaca with an alpaca tassel and drawstring. Light, tactile and quietly luxurious.',es:'Un bolso saco fluido en alpaca marfil, con borla de alpaca y cierre de cordón. Ligero, táctil y discretamente lujoso.'}},
 {id:'sumaq',type:'wallet', cat:{en:'Clutch',es:'Cartera de mano'},   name:'Sumaq', colour:{es:'Arena',en:'Sand'},   hex:'#C9B48E', price:320, artisan:'Lucía F.', region:{en:'Lima, Peru',es:'Lima, Perú'},     loom:'LI-003',
   desc:{en:'A slim evening clutch with a handwoven interior and a polished 950 silver edge. Considered, never decorative.',es:'Una cartera de mano esbelta con interior tejido a mano y canto de plata 950 pulida. Cuidada, nunca decorativa.'}},
 {id:'quri', type:'wallet', cat:{en:'Wallet',es:'Cartera'},          name:'Quri',  colour:{es:'Coñac',en:'Cognac'}, hex:'#8A4F2C', price:240, artisan:'Elena M.', region:{en:'Arequipa, Peru',es:'Arequipa, Perú'}, loom:'AR-031',
   desc:{en:'A long wallet in cognac alpaca with 950 silver hardware and a woven inner panel. The detail discovered every day.',es:'Una cartera larga en alpaca coñac, con herrajes de plata 950 y panel interior tejido. El detalle que se descubre cada día.'}},
 {id:'wayra',type:'bag',    cat:{en:'Mini bag',es:'Mini bolso'},     name:'Wayra', colour:{es:'Topo',en:'Taupe'},   hex:'#8A7D6B', price:360, artisan:'Carmen A.',region:{en:'Puno, Peru',es:'Puno, Perú'},     loom:'PU-014',
   desc:{en:'A precise little mini bag in taupe alpaca with a silver chain option. Small in scale, complete in intention.',es:'Un mini bolso preciso en alpaca topo, con opción de cadena de plata. Pequeño en escala, completo en intención.'}}
];

var MATERIALS=[
 {n:'01',t:{en:'Alpaca',es:'Alpaca'},lead:{en:'The softness of an exceptional fibre',es:'La suavidad de una fibra excepcional'},p:{en:'Alpaca is one of the world’s most prized natural fibres, valued for its softness, durability and timeless elegance.',es:'La alpaca es una de las fibras naturales más apreciadas del mundo por su suavidad, durabilidad y elegancia atemporal.'},ph:{en:'Macro · exterior texture',es:'Macro · textura exterior'}},
 {n:'02',t:{en:'950 silver',es:'Plata 950'},lead:{en:'The nobility of Peruvian silver',es:'La nobleza de la plata peruana'},p:{en:'Every piece features details crafted in 950 silver, prized for its exceptional purity and shine.',es:'Cada pieza incorpora detalles elaborados en plata 950, reconocida por su pureza y brillo excepcionales.'},ph:{en:'Detail · the hardware',es:'Detalle · el herraje'}},
 {n:'03',t:{en:'Andean opal',es:'Ópalo andino'},lead:{en:'A gem of Peruvian origin',es:'Una joya de origen peruano'},p:{en:'Chosen for its singular natural beauty, each opal lends character and exclusivity.',es:'Seleccionado por su singular belleza natural, cada ópalo aporta carácter y exclusividad.'},ph:{en:'Macro · the opal',es:'Macro · el ópalo'}},
 {n:'04',t:{en:'Alpaca tassels',es:'Borlas de alpaca'},lead:{en:'Beauty with purpose',es:'Belleza con propósito'},p:{en:'The tassels are made from responsibly sourced alpaca, reflecting our commitment to the conscious use of noble materials.',es:'Las borlas se elaboran con alpaca obtenida de manera responsable, reflejando nuestro compromiso con el aprovechamiento consciente de los materiales nobles.'},ph:{en:'Detail · the tassel',es:'Detalle · la borla'}},
 {n:'05',t:{en:'Woven interior',es:'Telar interior'},lead:{en:'Stories discovered within',es:'Historias que se descubren por dentro'},p:{en:'Each interior features textiles handwoven by Peruvian artisans, turning every piece into an expression of tradition and contemporary design.',es:'Cada interior incorpora textiles tejidos a mano por artesanos peruanos, convirtiendo cada pieza en una expresión de tradición y diseño contemporáneo.'},ph:{en:'The bag, opened',es:'La cartera, abierta'}}
];

var I18N={
 en:{
  announce:'Contemporary luxury with a Peruvian soul · Worldwide shipping',
  nav_home:'Home',nav_story:'Story',nav_materials:'Materials',nav_collection:'Collection',nav_contact:'Contact',nav_shop:'Collection',
  filter_all:'All',filter_bag:'Bags',filter_wallet:'Wallets',
  view_piece:'View piece',add_bag:'Add to bag',from:'From',
  /* home */
  hero_eyebrow:'Contemporary luxury · Designer pieces',hero_title:"Designed in Peru,<br>made to endure",
  hero_stmt:"INTIARA transforms Peru's finest materials into designer pieces — discovered, layer by layer.",
  hero_cta:'Explore the collection',ph_hero:'Editorial image · woman + handbag · European setting',ph_founder:'Portrait · the founder',
  strip:'Contemporary design, created from the finest materials of Peru.',
  home_story_eyebrow:'Our story',home_story_title:'A bridge between tradition and design',
  home_story_p:"INTIARA was born from a conviction: Peru's finest materials deserve a place in the world of contemporary luxury. A journey to Arequipa transformed our understanding of fashion — and a brand was born.",
  home_story_cta:'Read our story',
  home_mat_eyebrow:'Materials & detail',home_mat_title:'Discovered, layer by layer',
  home_mat_p:'First the design, then the alpaca, the woven interior, the 950 silver, and finally the opal. INTIARA reveals itself slowly.',
  home_mat_cta:'Explore the materials',
  col_eyebrow:'The collection',col_title:'A small, considered house',
  col_desc:'Seven pieces, made in limited production. Each carries a certificate of origin recording the materials and the hands behind it.',
  col_cta:'View the collection',
  val_eyebrow:'What INTIARA protects',val_title:'Four enduring principles',
  v1_t:'Designer-led',v1_p:'Pieces with their own identity — never trends followed without intent.',
  v2_t:'Exceptional materials',v2_p:'Alpaca, 950 silver, Andean opal and handwoven textiles.',
  v3_t:'Contemporary luxury',v3_p:'Sophisticated, minimal and timeless — quietly, never loudly.',
  v4_t:'Responsible production',v4_p:'Limited runs, conscious sourcing and respect for noble materials.',
  nw_eyebrow:'Stay close',nw_title:'Private viewings & new pieces',nw_p:'Join the list for early access to each release and the stories behind the materials.',nw_ph:'Your email address',nw_btn:'Join →',
  /* collection page */
  colp_title:'The collection',colp_desc:'Seven pieces in limited production — woven in Peru from alpaca, 950 silver and Andean opal.',
  /* product page */
  pdp_crumb_col:'Collection',pdp_added:'Add to bag',
  cert_h:'Certificate of origin',cert_alpaca:'Alpaca',cert_interior:'Interior',cert_silver:'Silver',cert_opal:'Opal',cert_artisan:'Artisan',cert_region:'Region',cert_loom:'Loom',
  cert_alpaca_v:'100% baby alpaca',cert_interior_v:'Handwoven textile',cert_silver_v:'950 silver',cert_opal_v:'Andean opal',
  acc_details:'Details & care',acc_details_p:'Handwoven baby alpaca with a handloomed interior and 950 silver hardware. Store in the provided dust bag; brush gently and keep away from prolonged damp.',
  acc_ship:'Shipping & returns',acc_ship_p:'Complimentary worldwide express shipping. Made-to-order pieces ship within 5–6 weeks. Returns accepted within 14 days on stocked pieces.',
  acc_origin:'Origin',acc_origin_p:'Designed by INTIARA and handcrafted by named artisans in Peru, recorded on each piece’s certificate of origin.',
  related_t:'You may also like',
  /* story page */
  storyp_title:'Our story',storyp_lead:'Design comes first. Materials second. Craftsmanship supports the story.',
  story_p1:"INTIARA was born from a conviction: Peru's finest materials deserve a place in the world of contemporary luxury.",
  story_p2:'A journey to Arequipa revealed a world of craftsmanship, dedication and beauty that transformed our understanding of fashion. There, we witnessed the work of master artisans who, generation after generation, preserve the art of working extraordinary fibres such as alpaca, using techniques that respect both people and nature.',
  story_p3:'That experience inspired a vision: to create pieces that honour this artisanal heritage while embracing contemporary design and sophistication. INTIARA is the bridge between tradition and innovation.',
  story_p4:'More than creating accessories, we seek to share a new vision of luxury — one where excellence, design and responsibility coexist in perfect harmony.',
  story_sig:'— A dream fulfilled, made in Peru.',
  mission_t:'Mission',mission_p:'To create contemporary luxury pieces crafted from Peru’s finest materials, where exceptional quality, timeless design and responsible production come together to create objects of beauty, meaning and lasting value — connecting people around the world with the cultural richness of Peru.',
  vision_t:'Vision',vision_p:'To become an internationally recognised contemporary luxury brand, transforming Peru’s finest materials and artisanal excellence into exceptional design pieces, championing a new vision of luxury rooted in authenticity, quality, sustainability and timeless beauty.',
  /* materials page */
  matp_title:'Materials & detail',matp_desc:'INTIARA does not reveal everything at once. The richness of each piece is discovered, layer by layer.',
  /* contact page */
  contactp_title:'Contact',contactp_desc:'For enquiries, private viewings and bespoke requests, we would be delighted to hear from you.',
  ct_atelier:'Atelier',ct_atelier_v:'Lima, Peru',ct_email:'Email',ct_hours:'Enquiries',ct_hours_v:'Mon–Fri · 9.00–18.00 (PET)',ct_social:'Follow',
  f_name:'Name',f_email:'Email',f_subject:'Subject',f_message:'Message',f_send:'Send enquiry',f_sub_general:'General enquiry',f_sub_bespoke:'Bespoke request',f_sub_press:'Press',f_sub_wholesale:'Wholesale',
  contact_sent:'Thank you — we will be in touch',
  /* cart */
  cart_title:'Your bag',cart_subtotal:'Subtotal',cart_checkout:'Checkout',cart_ship:'Complimentary worldwide shipping',cart_empty:'Your bag is empty.',cart_remove:'Remove',
  /* footer */
  ft_blurb:"A contemporary luxury brand transforming Peru's finest materials into designer pieces.",
  ft_explore:'Explore',ft_house:'House',ft_values:'Values',ft_care:'Client care',ft_shipping:'Shipping & returns',ft_care2:'Material care',ft_contactus:'Contact us',ft_tag:'Lujo contemporáneo con alma peruana',
  toast_added:'Added to your bag',toast_sub:"Thank you — you're on the list",toast_checkout:'Checkout is a demo in this build'
 },
 es:{
  announce:'Lujo contemporáneo con alma peruana · Envío a todo el mundo',
  nav_home:'Inicio',nav_story:'Historia',nav_materials:'Materiales',nav_collection:'Colección',nav_contact:'Contacto',nav_shop:'Colección',
  filter_all:'Todo',filter_bag:'Bolsos',filter_wallet:'Carteras',
  view_piece:'Ver pieza',add_bag:'Añadir a la bolsa',from:'Desde',
  hero_eyebrow:'Lujo contemporáneo · Diseño de autor',hero_title:'Diseñado en el Perú,<br>hecho para perdurar',
  hero_stmt:'INTIARA transforma los materiales más nobles del Perú en piezas de diseño de autor — descubiertas, capa a capa.',
  hero_cta:'Descubrir la colección',ph_hero:'Imagen editorial · mujer + cartera · entorno europeo',ph_founder:'Retrato · la fundadora',
  strip:'Diseño contemporáneo, creado a partir de los materiales más nobles del Perú.',
  home_story_eyebrow:'Nuestra historia',home_story_title:'Un puente entre tradición y diseño',
  home_story_p:'INTIARA nació de una convicción: los materiales más nobles del Perú merecen un lugar en el lujo contemporáneo. Un viaje a Arequipa transformó nuestra manera de entender la moda — y nació una marca.',
  home_story_cta:'Leer nuestra historia',
  home_mat_eyebrow:'Materiales y detalle',home_mat_title:'Descubiertos, capa a capa',
  home_mat_p:'Primero el diseño, luego la alpaca, el telar interior, la plata 950 y, finalmente, el ópalo. INTIARA se revela despacio.',
  home_mat_cta:'Explorar los materiales',
  col_eyebrow:'La colección',col_title:'Una casa pequeña y cuidada',
  col_desc:'Siete piezas, de producción limitada. Cada una lleva un certificado de origen que registra los materiales y las manos que la hicieron.',
  col_cta:'Ver la colección',
  val_eyebrow:'Lo que INTIARA protege',val_title:'Cuatro principios permanentes',
  v1_t:'Diseño de autor',v1_p:'Piezas con identidad propia — nunca tendencias seguidas sin criterio.',
  v2_t:'Materiales excepcionales',v2_p:'Alpaca, plata 950, ópalo andino y textiles tejidos a mano.',
  v3_t:'Lujo contemporáneo',v3_p:'Sofisticado, minimalista y atemporal — en voz baja, nunca alta.',
  v4_t:'Producción responsable',v4_p:'Ediciones limitadas, abastecimiento consciente y respeto por los materiales nobles.',
  nw_eyebrow:'Mantente cerca',nw_title:'Presentaciones privadas y nuevas piezas',nw_p:'Únete a la lista para acceso anticipado a cada lanzamiento y las historias detrás de los materiales.',nw_ph:'Tu correo electrónico',nw_btn:'Unirme →',
  colp_title:'La colección',colp_desc:'Siete piezas de producción limitada — tejidas en el Perú con alpaca, plata 950 y ópalo andino.',
  pdp_crumb_col:'Colección',pdp_added:'Añadir a la bolsa',
  cert_h:'Certificado de origen',cert_alpaca:'Alpaca',cert_interior:'Interior',cert_silver:'Plata',cert_opal:'Ópalo',cert_artisan:'Artesana',cert_region:'Región',cert_loom:'Telar',
  cert_alpaca_v:'100% baby alpaca',cert_interior_v:'Textil tejido a mano',cert_silver_v:'Plata 950',cert_opal_v:'Ópalo andino',
  acc_details:'Detalles y cuidado',acc_details_p:'Baby alpaca tejida a mano con interior de telar y herrajes de plata 950. Guárdala en su bolsa de tela; cepilla suavemente y evita la humedad prolongada.',
  acc_ship:'Envíos y devoluciones',acc_ship_p:'Envío exprés gratuito a todo el mundo. Las piezas a pedido se envían en 5–6 semanas. Devoluciones dentro de 14 días en piezas en stock.',
  acc_origin:'Origen',acc_origin_p:'Diseñada por INTIARA y hecha a mano por artesanas peruanas con nombre propio, registradas en el certificado de origen de cada pieza.',
  related_t:'También te puede gustar',
  storyp_title:'Nuestra historia',storyp_lead:'Primero el diseño. Después los materiales. La artesanía sostiene la historia.',
  story_p1:'INTIARA nació de una convicción: los materiales más nobles del Perú merecen un lugar en el mundo del lujo contemporáneo.',
  story_p2:'Un viaje a Arequipa reveló un universo de conocimiento, dedicación y belleza que transformó nuestra manera de entender la moda. Allí vimos de cerca el trabajo de maestros artesanos que, generación tras generación, preservan el arte de trabajar fibras extraordinarias como la alpaca, con técnicas respetuosas con las personas y la naturaleza.',
  story_p3:'Aquella experiencia despertó una visión: crear piezas que honraran este legado artesanal sin renunciar al diseño contemporáneo y a la sofisticación. INTIARA es el puente entre tradición e innovación.',
  story_p4:'Más que crear accesorios, buscamos compartir una nueva visión del lujo — una donde la excelencia, el diseño y la responsabilidad conviven en perfecta armonía.',
  story_sig:'— Un sueño hecho realidad, hecho en el Perú.',
  mission_t:'Misión',mission_p:'Diseñar piezas de lujo contemporáneo elaboradas con materiales nobles peruanos, donde la calidad excepcional, el diseño atemporal y la producción responsable se unen para crear objetos con significado, belleza y permanencia — conectando a personas de todo el mundo con la riqueza cultural del Perú.',
  vision_t:'Visión',vision_p:'Ser una marca internacional de lujo contemporáneo reconocida por transformar los materiales más nobles y la excelencia artesanal del Perú en piezas de diseño excepcionales, defendiendo una nueva visión del lujo basada en la autenticidad, la calidad, la sostenibilidad y la belleza atemporal.',
  matp_title:'Materiales y detalle',matp_desc:'INTIARA no lo revela todo a primera vista. La riqueza de cada pieza se descubre, capa a capa.',
  contactp_title:'Contacto',contactp_desc:'Para consultas, presentaciones privadas y pedidos a medida, será un placer escucharte.',
  ct_atelier:'Atelier',ct_atelier_v:'Lima, Perú',ct_email:'Correo',ct_hours:'Consultas',ct_hours_v:'Lun–Vie · 9.00–18.00 (PET)',ct_social:'Síguenos',
  f_name:'Nombre',f_email:'Correo',f_subject:'Asunto',f_message:'Mensaje',f_send:'Enviar consulta',f_sub_general:'Consulta general',f_sub_bespoke:'Pedido a medida',f_sub_press:'Prensa',f_sub_wholesale:'Mayoristas',
  contact_sent:'Gracias — nos pondremos en contacto',
  cart_title:'Tu bolsa',cart_subtotal:'Subtotal',cart_checkout:'Pagar',cart_ship:'Envío gratuito a todo el mundo',cart_empty:'Tu bolsa está vacía.',cart_remove:'Quitar',
  ft_blurb:'Una marca de lujo contemporáneo que transforma los materiales más nobles del Perú en piezas de diseño de autor.',
  ft_explore:'Explorar',ft_house:'La casa',ft_values:'Valores',ft_care:'Atención',ft_shipping:'Envíos y devoluciones',ft_care2:'Cuidado de materiales',ft_contactus:'Contáctanos',ft_tag:'Lujo contemporáneo con alma peruana',
  toast_added:'Añadido a tu bolsa',toast_sub:'Gracias — estás en la lista',toast_checkout:'El pago es una demo en esta versión'
 }
};

var lang='en',cart=[],currentFilter='all';
var euro=function(n){return '€'+Math.round(n);};
function t(k){return (I18N[lang][k]!==undefined)?I18N[lang][k]:k;}
function mono(){return '<svg class="wm" viewBox="0 0 133 120" fill="none" aria-hidden="true"><use href="#iamono"/></svg>';}
function findP(id){for(var i=0;i<PRODUCTS.length;i++){if(PRODUCTS[i].id===id)return PRODUCTS[i];}return null;}
function qparam(k){return new URLSearchParams(location.search).get(k);}
function tint(hex){var r=parseInt(hex.substr(1,2),16),g=parseInt(hex.substr(3,2),16),b=parseInt(hex.substr(5,2),16);r=Math.round(r+(238-r)*0.78);g=Math.round(g+(234-g)*0.78);b=Math.round(b+(220-b)*0.78);return 'rgb('+r+','+g+','+b+')';}

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
  return '<a class="card reveal" href="product.html?id='+p.id+'">'
    +'<div class="ph"><span class="cat">'+(p.cat[lang]||p.cat.en)+'</span>'
    +'<div class="photo" style="background:'+tint(p.hex)+'">'+mono()+'<span class="plabel">'+p.name+'</span></div>'
    +'<span class="view"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.5"/></svg>'+t('view_piece')+'</span></div>'
    +'<div class="info"><div><div class="nm">'+p.name+'</div><div class="colourway"><span class="swatch" style="background:'+p.hex+'"></span>'+(p.colour[lang]||p.colour.es)+'</div></div><div class="price">'+euro(p.price)+'</div></div></a>';
}
function renderGrid(id,list){var g=document.getElementById(id);if(!g)return;g.innerHTML=list.map(productCard).join('');observeReveal();}
function renderCollection(){
  var g=document.getElementById('productGrid');if(!g)return;
  var list=PRODUCTS.filter(function(p){return currentFilter==='all'||p.type===currentFilter;});
  g.innerHTML=list.map(productCard).join('');observeReveal();
}
function renderMaterials(id){
  var c=document.getElementById(id||'materialsList');if(!c)return;
  c.innerHTML=MATERIALS.map(function(m){
    return '<div class="mat reveal"><div class="mphoto photo dark">'+mono()+'<span class="plabel">'+m.ph[lang]+'</span></div>'
      +'<div class="mbody"><span class="mnum">'+m.n+'</span><h3>'+m.t[lang]+'</h3><p class="mlead">'+m.lead[lang]+'</p><p>'+m.p[lang]+'</p></div></div>';
  }).join('');
  observeReveal();
}
function renderProductDetail(){
  var id=qparam('id')||'inti';var p=findP(id);if(!p)p=PRODUCTS[0];currentProductId=p.id;
  document.title='INTIARA · '+p.name;
  var set=function(i,v){var el=document.getElementById(i);if(el)el.textContent=v;};
  set('pCat',p.cat[lang]||p.cat.en);set('pName',p.name);set('pPrice',euro(p.price));
  var cw=document.getElementById('pColour');if(cw)cw.innerHTML='<span class="swatch" style="background:'+p.hex+'"></span>'+(p.colour[lang]||p.colour.es);
  set('pDesc',p.desc[lang]||p.desc.en);
  var main=document.getElementById('pMain');if(main){main.style.background=tint(p.hex);main.innerHTML=mono()+'<span class="plabel">'+p.name+' · '+(p.colour[lang]||p.colour.es)+'</span>';}
  var th=document.getElementById('pThumbs');if(th){var labs=['Front','Detail','Interior','Worn'];var lse=['Frente','Detalle','Interior','En uso'];th.innerHTML='';for(var i=0;i<4;i++){th.innerHTML+='<div class="photo" style="background:'+tint(p.hex)+'">'+mono()+'<span class="plabel">'+(lang==='en'?labs[i]:lse[i])+'</span></div>';}}
  set('cArtisan',p.artisan);set('cRegion',p.region[lang]||p.region.en);set('cLoom',p.loom);
  var addb=document.getElementById('pAdd');if(addb)addb.onclick=function(){addToCart(p.id);};
  var rel=document.getElementById('relatedGrid');if(rel){var others=PRODUCTS.filter(function(x){return x.id!==p.id;}).slice(0,3);rel.innerHTML=others.map(productCard).join('');}
  observeReveal();
}
var currentProductId=null;

/* ---- i18n apply ---- */
function setLang(l){
  lang=l;document.documentElement.lang=l;
  var en=document.getElementById('langEn'),es=document.getElementById('langEs');
  if(en)en.classList.toggle('active',l==='en');if(es)es.classList.toggle('active',l==='es');
  document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(I18N[l][k]!==undefined)el.innerHTML=I18N[l][k];});
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){var k=el.getAttribute('data-i18n-ph');if(I18N[l][k]!==undefined)el.setAttribute('placeholder',I18N[l][k]);});
  renderGrid('featuredGrid',PRODUCTS.slice(0,3));
  renderCollection();
  renderMaterials('materialsList');
  if(document.getElementById('pName'))renderProductDetail();
  renderCart();
  try{localStorage.setItem('intiara_lang',l);}catch(e){}
}

/* ---- cart ---- */
function addToCart(id){var p=findP(id);cart.push({name:p.name,meta:(p.cat[lang]||p.cat.en)+' · '+(p.colour[lang]||p.colour.es),price:p.price,hex:p.hex});saveCart();renderCart();toast(t('toast_added'));openCart();}
function removeItem(i){cart.splice(i,1);saveCart();renderCart();}
function cartTotal(){return cart.reduce(function(s,x){return s+x.price;},0);}
function renderCart(){
  var b=document.getElementById('cartBody');if(!b)return;
  var cc=document.getElementById('cartCount');if(cc)cc.textContent=cart.length;
  document.getElementById('cartTotal').textContent=euro(cartTotal());
  if(!cart.length){b.innerHTML='<div class="cart-empty">'+t('cart_empty')+'</div>';return;}
  b.innerHTML=cart.map(function(it,i){return '<div class="cart-item"><div class="thumb photo" style="background:'+tint(it.hex)+'">'+mono()+'</div><div style="flex:1"><div class="ci-nm">'+it.name+'</div><div class="ci-meta">'+it.meta+'</div><div class="ci-bottom"><span>'+euro(it.price)+'</span><button class="rm" onclick="removeItem('+i+')">'+t('cart_remove')+'</button></div></div></div>';}).join('');
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
  setLang(lang);
  observeReveal();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initINTIARA);else initINTIARA();
