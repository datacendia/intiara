/* ===== INTIARA · admin (content studio) =====
   Loads content/content.json from GitHub, lets the owner edit text,
   products, materials, settings and photos, then commits back to the
   repo (which triggers a Netlify rebuild). Pure client-side. */

var OWNER='datacendia', REPO='intiara', BRANCH='main', CONTENT_PATH='content/content.json', IMG_DIR='assets/img';
var TKEY='intiara_admin_token';

var TOKEN='', content=null, contentSha=null, dirty=false;
var pendingImages=[];           // {path, base64}
var localPreviews={};           // path -> dataURL (preview before publish)
var imgSeq=0;

/* ---------- helpers ---------- */
function $(id){return document.getElementById(id);}
function esc(s){return (''+(s==null?'':s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function escA(s){return (''+(s==null?'':s)).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}
function encPath(p){return p.split('/').map(encodeURIComponent).join('/');}
function b64enc(str){return btoa(unescape(encodeURIComponent(str)));}
function b64dec(b64){return decodeURIComponent(escape(atob((b64||'').replace(/\s/g,''))));}
function imgSrc(path){return localPreviews[path]||path;}
function uid(){imgSeq++;return 'p'+Date.now().toString(36)+imgSeq.toString(36);}
function getPath(o,path){var a=path.split('.');for(var i=0;i<a.length;i++){if(o==null)return undefined;o=o[a[i]];}return o;}
function setPath(o,path,val){var a=path.split('.');for(var i=0;i<a.length-1;i++){var k=a[i];if(o[k]==null)o[k]=/^\d+$/.test(a[i+1])?[]:{};o=o[k];}o[a[a.length-1]]=val;}

/* ---------- GitHub API ---------- */
function gh(path,opts){
  opts=opts||{};
  var headers={'Authorization':'Bearer '+TOKEN,'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'};
  if(opts.body)headers['Content-Type']='application/json';
  return fetch('https://api.github.com'+path,{method:opts.method||'GET',headers:headers,body:opts.body}).then(function(r){
    if(r.status===204)return null;
    return r.text().then(function(txt){
      var data=null;try{data=txt?JSON.parse(txt):null;}catch(e){}
      if(!r.ok){var m=(data&&data.message)||txt||r.statusText;throw new Error(r.status+' · '+m);}
      return data;
    });
  });
}
function ghPut(path,b64,sha,message){
  var body={message:message,content:b64,branch:BRANCH};
  if(sha)body.sha=sha;
  return gh('/repos/'+OWNER+'/'+REPO+'/contents/'+encPath(path),{method:'PUT',body:JSON.stringify(body)});
}

/* ---------- auth ---------- */
function setLoginMsg(m){$('loginMsg').textContent=m||'';}
function showApp(){$('login').classList.add('hidden');$('app').classList.remove('hidden');}
function showLogin(){$('app').classList.add('hidden');$('login').classList.remove('hidden');}

function tryAuth(){
  setLoginMsg('Connecting…');
  return gh('/repos/'+OWNER+'/'+REPO).then(function(){
    showApp();
    return loadContent();
  }).catch(function(e){
    localStorage.removeItem(TKEY);TOKEN='';
    showLogin();
    setLoginMsg('Sign-in failed: '+e.message+'. Check the token has Contents → Read and write on datacendia/intiara.');
  });
}
function signIn(){
  var v=$('tok').value.trim();
  if(!v){setLoginMsg('Please paste your access token.');return;}
  TOKEN=v;
  try{localStorage.setItem(TKEY,v);}catch(e){}
  tryAuth();
}
function signOut(){
  localStorage.removeItem(TKEY);TOKEN='';content=null;dirty=false;
  $('tok').value='';
  showLogin();setLoginMsg('Signed out.');
}

/* ---------- load ---------- */
function loadContent(){
  setMsg('busy','Loading your content…',true);
  return gh('/repos/'+OWNER+'/'+REPO+'/contents/'+encPath(CONTENT_PATH)+'?ref='+BRANCH).then(function(res){
    contentSha=res.sha;
    content=JSON.parse(b64dec(res.content));
    content.site=content.site||{};content.site.images=content.site.images||{};
    content.products=content.products||[];content.materials=content.materials||[];
    content.copy=content.copy||{en:{},es:{}};content.copy.en=content.copy.en||{};content.copy.es=content.copy.es||{};
    pendingImages=[];localPreviews={};
    renderAll();
    setDirty(false);
    setMsg('','Connected. Make your edits, then “Publish changes”.');
  }).catch(function(e){
    setMsg('err','Could not load content: '+e.message);
  });
}

/* ---------- field builders ---------- */
function fld(label,inner){return '<div class="fld"><label>'+label+'</label>'+inner+'</div>';}
function inp(path,val){return '<input type="text" data-path="'+path+'" value="'+escA(val)+'">';}
function inpNum(path,val){return '<input type="number" data-num="1" data-path="'+path+'" value="'+(val==null?'':val)+'">';}
function area(path,val){return '<textarea data-path="'+path+'">'+esc(val)+'</textarea>';}
function sel(path,val,opts){return '<select data-path="'+path+'">'+opts.map(function(o){return '<option value="'+o[0]+'"'+(o[0]===val?' selected':'')+'>'+o[1]+'</option>';}).join('')+'</select>';}
function langFld(label,base,obj){obj=obj||{};return '<div class="fld"><label>'+label+'</label><div class="langpair">'
  +'<div><div class="langtag">English</div>'+inp(base+'.en',obj.en)+'</div>'
  +'<div><div class="langtag">Español</div>'+inp(base+'.es',obj.es)+'</div></div></div>';}
function langArea(label,base,obj){obj=obj||{};return '<div class="fld"><label>'+label+'</label><div class="langpair">'
  +'<div><div class="langtag">English</div>'+area(base+'.en',obj.en)+'</div>'
  +'<div><div class="langtag">Español</div>'+area(base+'.es',obj.es)+'</div></div></div>';}
function uploadTile(kind,attrs){return '<label class="upload'+(kind==='site'?' site':'')+'">+ Photo<input type="file" accept="image/*" data-imgkind="'+kind+'"'+attrs+'></label>';}
function thumb(path,delAttrs,site){return '<div class="thumb'+(site?' site':'')+'"><img src="'+escA(imgSrc(path))+'" alt=""><button class="del" '+delAttrs+'>×</button></div>';}

/* ---------- render: products ---------- */
function renderProducts(){
  $('productList').innerHTML=content.products.map(function(p,i){
    var imgs=(p.images||[]).map(function(src,j){return thumb(src,'data-act="delImage" data-i="'+i+'" data-j="'+j+'"');}).join('');
    return '<div class="card">'
      +'<div class="card-top"><span class="nm">'+esc(p.name||'Untitled')+'</span><span class="tagpill">'+esc(p.type||'bag')+'</span><span class="spacer"></span>'
      +'<button class="btn btn-sm btn-ghost" data-act="moveUp" data-i="'+i+'" title="Move up">↑</button>'
      +'<button class="btn btn-sm btn-ghost" data-act="moveDown" data-i="'+i+'" title="Move down">↓</button>'
      +'<button class="btn btn-sm btn-danger" data-act="delProduct" data-i="'+i+'">Delete</button></div>'
      +'<div class="grid3">'+fld('Name',inp('products.'+i+'.name',p.name))+fld('Type',sel('products.'+i+'.type',p.type,[['bag','Bag'],['wallet','Wallet']]))+fld('Price (number)',inpNum('products.'+i+'.price',p.price))+'</div>'
      +'<div class="grid3">'+fld('Colour swatch','<div class="row"><input type="color" data-path="products.'+i+'.hex" value="'+escA(p.hex||'#8a7d6b')+'"><input type="text" data-path="products.'+i+'.hex" value="'+escA(p.hex||'')+'"></div>')+fld('Artisan',inp('products.'+i+'.artisan',p.artisan))+fld('Loom code',inp('products.'+i+'.loom',p.loom))+'</div>'
      +langFld('Category',  'products.'+i+'.cat',    p.cat)
      +langFld('Colour name','products.'+i+'.colour', p.colour)
      +langFld('Region',    'products.'+i+'.region', p.region)
      +langArea('Description','products.'+i+'.desc',  p.desc)
      +'<div class="fld"><label>Photos (first one is the main image)</label><div class="imgs">'+imgs+uploadTile('product',' data-i="'+i+'"')+'</div></div>'
      +'</div>';
  }).join('');
}

/* ---------- render: materials ---------- */
function renderMaterials(){
  $('materialList').innerHTML=content.materials.map(function(m,i){
    var img=m.image?thumb(m.image,'data-act="delMatImage" data-i="'+i+'"'):'';
    return '<div class="card">'
      +'<div class="card-top"><span class="nm">'+esc((m.t&&m.t.en)||('Material '+(i+1)))+'</span><span class="spacer"></span>'
      +'<button class="btn btn-sm btn-danger" data-act="delMaterial" data-i="'+i+'">Delete</button></div>'
      +'<div class="grid3">'+fld('Number',inp('materials.'+i+'.n',m.n))+'</div>'
      +langFld('Title','materials.'+i+'.t',m.t)
      +langFld('Lead line','materials.'+i+'.lead',m.lead)
      +langArea('Paragraph','materials.'+i+'.p',m.p)
      +langFld('Placeholder label (shown if no photo)','materials.'+i+'.ph',m.ph)
      +'<div class="fld"><label>Photo</label><div class="imgs">'+img+uploadTile('material',' data-i="'+i+'"')+'</div></div>'
      +'</div>';
  }).join('')
  +'<div class="addbar"><button class="btn btn-sm" data-act="addMaterial">+ Add material</button></div>';
}

/* ---------- render: copy ---------- */
var GROUPDEF=[
  ['Announcement bar',function(k){return k==='announce';}],
  ['Navigation & buttons',function(k){return /^(nav_|filter_)/.test(k)||['view_piece','add_bag','from'].indexOf(k)>=0;}],
  ['Home — hero',function(k){return /^hero_/.test(k)||k==='strip'||k==='ph_hero'||k==='ph_founder';}],
  ['Home — sections',function(k){return /^(home_|col_|val_|v[1-4]_|nw_)/.test(k);}],
  ['Collection page',function(k){return /^colp_/.test(k);}],
  ['Product page',function(k){return /^(pdp_|cert_|acc_)/.test(k)||k==='related_t';}],
  ['Story page',function(k){return /^(storyp_|story_|mission_|vision_)/.test(k);}],
  ['Materials page',function(k){return /^matp_/.test(k);}],
  ['Contact page',function(k){return /^(contactp_|ct_|f_)/.test(k)||k==='contact_sent';}],
  ['Cart',function(k){return /^cart_/.test(k);}],
  ['Footer',function(k){return /^ft_/.test(k);}],
  ['Messages',function(k){return /^toast_/.test(k);}]
];
function buildCopyGroups(enObj){
  var keys=Object.keys(enObj),used={},groups=[];
  GROUPDEF.forEach(function(d){var gk=keys.filter(function(k){return !used[k]&&d[1](k);});gk.forEach(function(k){used[k]=1;});if(gk.length)groups.push({title:d[0],keys:gk});});
  var rest=keys.filter(function(k){return !used[k];});if(rest.length)groups.push({title:'Other',keys:rest});
  return groups;
}
function renderCopy(){
  var en=content.copy.en,es=content.copy.es;
  $('copyGroups').innerHTML=buildCopyGroups(en).map(function(g){
    return '<details class="copy-group" open><summary>'+esc(g.title)+' <span class="muted" style="font-size:11px">('+g.keys.length+')</span></summary><div class="gbody">'
      +g.keys.map(function(k){
        return '<div class="copy-row" data-key="'+escA(k)+'"><div class="k">'+esc(k)+'</div><div class="langpair">'
          +'<div><div class="langtag">English</div>'+area('copy.en.'+k,en[k])+'</div>'
          +'<div><div class="langtag">Español</div>'+area('copy.es.'+k,es[k])+'</div></div></div>';
      }).join('')
      +'</div></details>';
  }).join('');
}
function filterCopy(q){
  q=(q||'').toLowerCase().trim();
  document.querySelectorAll('#copyGroups .copy-row').forEach(function(row){
    var k=row.getAttribute('data-key').toLowerCase();
    var txt='';row.querySelectorAll('textarea').forEach(function(t){txt+=' '+t.value.toLowerCase();});
    row.style.display=(!q||k.indexOf(q)>=0||txt.indexOf(q)>=0)?'':'none';
  });
}

/* ---------- render: settings ---------- */
function siteImgBlock(label,key,val){
  return '<div class="fld"><label>'+label+'</label><div class="imgs">'
    +(val?thumb(val,'data-act="delSiteImage" data-key="'+key+'"',true):'')
    +uploadTile('site',' data-key="'+key+'"')+'</div></div>';
}
function renderSettings(){
  var s=content.site,im=s.images||{};
  $('settingsBody').innerHTML=
   '<div class="card">'
    +'<div class="grid3">'+fld('Currency symbol',inp('site.currencySymbol',s.currencySymbol||'€'))
      +fld('Contact email','<input type="email" data-path="site.email" value="'+escA(s.email||'')+'">')
      +fld('WhatsApp number','<input type="text" data-path="site.whatsapp" value="'+escA(s.whatsapp||'')+'" placeholder="51999999999">')+'</div>'
    +'<p class="muted" style="font-size:12px;margin:-2px 0 12px">WhatsApp: digits only with country code (Peru = 51). Leave blank to hide the floating button.</p>'
    +'<div class="grid2">'+fld('Instagram link','<input type="url" data-path="site.instagram" value="'+escA(s.instagram||'')+'" placeholder="https://instagram.com/intiara">')
      +fld('Pinterest link','<input type="url" data-path="site.pinterest" value="'+escA(s.pinterest||'')+'" placeholder="https://pinterest.com/intiara">')+'</div>'
   +'</div>'
   +'<div class="card"><div class="langtag" style="font-size:11px">Brand photos</div>'
    +'<p class="muted" style="font-size:12.5px;margin:6px 0 14px">Main images across the site. Leave empty to keep the elegant placeholder.</p>'
    +'<div class="grid3">'+siteImgBlock('Hero (home top)','hero',im.hero)+siteImgBlock('Founder portrait','founder',im.founder)+siteImgBlock('Home — materials','homeMaterial',im.homeMaterial)+'</div>'
   +'</div>';
}

function renderAll(){renderProducts();renderMaterials();renderCopy();renderSettings();}

/* ---------- editing ---------- */
function onFieldInput(el){
  var path=el.getAttribute('data-path');if(!path)return;
  var val=el.value;
  if(el.hasAttribute('data-num'))val=(val===''?0:Number(val));
  setPath(content,path,val);setDirty(true);
  if(el.type==='color'){var sib=el.parentElement.querySelector('input[type=text][data-path="'+path+'"]');if(sib)sib.value=val;}
  else if(/\.hex$/.test(path)&&/^#[0-9a-fA-F]{6}$/.test(val)){var c=el.parentElement.querySelector('input[type=color][data-path="'+path+'"]');if(c)c.value=val;}
  if(/^products\.\d+\.name$/.test(path)){var card=el.closest('.card');if(card)card.querySelector('.nm').textContent=val||'Untitled';}
}
function blankProduct(){return {id:uid(),type:'bag',cat:{en:'',es:''},name:'New piece',colour:{en:'',es:''},hex:'#8a7d6b',price:0,artisan:'',region:{en:'',es:''},loom:'',images:[],desc:{en:'',es:''}};}
function blankMaterial(){var n=content.materials.length+1;return {n:(n<10?'0':'')+n,t:{en:'',es:''},lead:{en:'',es:''},p:{en:'',es:''},ph:{en:'',es:''},image:''};}
function onAct(el){
  var act=el.getAttribute('data-act'),i=+el.getAttribute('data-i'),j=+el.getAttribute('data-j'),key=el.getAttribute('data-key');
  if(act==='addProduct'){content.products.push(blankProduct());renderProducts();setDirty(true);window.scrollTo(0,document.body.scrollHeight);}
  else if(act==='delProduct'){if(confirm('Delete “'+(content.products[i].name||'')+'”? This cannot be undone after publishing.')){content.products.splice(i,1);renderProducts();setDirty(true);}}
  else if(act==='moveUp'&&i>0){var a=content.products;var t=a[i-1];a[i-1]=a[i];a[i]=t;renderProducts();setDirty(true);}
  else if(act==='moveDown'&&i<content.products.length-1){var b=content.products;var u=b[i+1];b[i+1]=b[i];b[i]=u;renderProducts();setDirty(true);}
  else if(act==='delImage'){content.products[i].images.splice(j,1);renderProducts();setDirty(true);}
  else if(act==='addMaterial'){content.materials.push(blankMaterial());renderMaterials();setDirty(true);}
  else if(act==='delMaterial'){if(confirm('Delete this material?')){content.materials.splice(i,1);renderMaterials();setDirty(true);}}
  else if(act==='delMatImage'){content.materials[i].image='';renderMaterials();setDirty(true);}
  else if(act==='delSiteImage'){content.site.images[key]='';renderSettings();setDirty(true);}
}
function handleFile(input){
  var file=input.files&&input.files[0];if(!file)return;
  if(file.size>8*1024*1024&&!confirm('This image is large ('+Math.round(file.size/1048576)+'MB) and may slow the site. Upload anyway? (Web-sized images under ~1MB are best.)')){input.value='';return;}
  var kind=input.getAttribute('data-imgkind'),i=+input.getAttribute('data-i'),key=input.getAttribute('data-key');
  var reader=new FileReader();
  reader.onload=function(){
    var dataUrl=reader.result,base64=dataUrl.split(',')[1];
    var safe=(file.name||'photo.jpg').toLowerCase().replace(/[^a-z0-9.\-_]+/g,'-').replace(/^-+|-+$/g,'');
    var path=IMG_DIR+'/'+Date.now().toString(36)+'-'+(++imgSeq)+'-'+safe;
    pendingImages.push({path:path,base64:base64});localPreviews[path]=dataUrl;
    if(kind==='product'){content.products[i].images=content.products[i].images||[];content.products[i].images.push(path);renderProducts();}
    else if(kind==='material'){content.materials[i].image=path;renderMaterials();}
    else if(kind==='site'){content.site.images[key]=path;renderSettings();}
    setDirty(true);
  };
  reader.readAsDataURL(file);
}

/* ---------- status + publish ---------- */
function setMsg(kind,msg,busy){var el=$('publishMsg');el.className='msg '+(kind||'');el.innerHTML=(busy?'<span class="spin"></span>':'')+esc(msg);}
function setDirty(b){
  dirty=b;$('publishBtn').disabled=!b;
  var s=$('topStatus');
  if(b){s.textContent='● Unsaved changes';s.className='status dirty';if($('publishMsg').className.indexOf('busy')<0)setMsg('','You have unsaved changes.');}
  else{s.textContent='✓ All changes published';s.className='status ok';}
}
function publish(){
  if(!dirty||!content)return;
  $('publishBtn').disabled=true;setMsg('busy','Publishing'+(pendingImages.length?' '+pendingImages.length+' photo(s) + ':' ')+'content…',true);
  var imgs=pendingImages.slice();
  var chain=Promise.resolve();
  imgs.forEach(function(im){chain=chain.then(function(){return ghPut(im.path,im.base64,null,'Add image '+im.path.split('/').pop());});});
  chain.then(function(){
    return ghPut(CONTENT_PATH,b64enc(JSON.stringify(content,null,2)),contentSha,'Update site content via admin');
  }).then(function(res){
    contentSha=res.content.sha;pendingImages=[];
    setDirty(false);
    setMsg('ok','Published! Your site updates in about a minute. Refresh intiara.com.pe to see it.');
  }).catch(function(e){
    $('publishBtn').disabled=false;
    var hint=/409/.test(e.message)?' — the content changed elsewhere. Click “Discard & reload”, then redo your edits.':'';
    setMsg('err','Could not publish: '+e.message+hint);
  });
}

/* ---------- wiring ---------- */
function wire(){
  $('loginBtn').onclick=signIn;
  $('tok').addEventListener('keydown',function(e){if(e.key==='Enter')signIn();});
  $('logoutBtn').onclick=function(){if(!dirty||confirm('You have unsaved changes. Sign out anyway?'))signOut();};
  $('publishBtn').onclick=publish;
  $('reloadBtn').onclick=function(){if(!dirty||confirm('Discard your unsaved changes and reload the latest published content?'))loadContent();};
  $('copySearch').addEventListener('input',function(){filterCopy(this.value);});
  document.querySelectorAll('.tab').forEach(function(tb){tb.onclick=function(){
    document.querySelectorAll('.tab').forEach(function(x){x.classList.remove('active');});tb.classList.add('active');
    document.querySelectorAll('.panel').forEach(function(p){p.classList.remove('active');});
    $('panel-'+tb.getAttribute('data-tab')).classList.add('active');
  };});
  var app=$('app');
  app.addEventListener('input',function(e){if(e.target.matches('[data-path]'))onFieldInput(e.target);});
  app.addEventListener('change',function(e){if(e.target.matches('input[type=file]'))handleFile(e.target);else if(e.target.matches('select[data-path]'))onFieldInput(e.target);});
  app.addEventListener('click',function(e){var a=e.target.closest('[data-act]');if(a){e.preventDefault();onAct(a);}});
  window.addEventListener('beforeunload',function(e){if(dirty){e.preventDefault();e.returnValue='';}});
}

/* ---------- init ---------- */
(function init(){
  wire();
  try{TOKEN=localStorage.getItem(TKEY)||'';}catch(e){}
  if(TOKEN)tryAuth();else showLogin();
})();
