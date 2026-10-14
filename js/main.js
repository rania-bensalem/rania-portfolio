let lang="fr",timer;
const typingEl=document.getElementById("typing");
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;

function startTyping(){
  clearTimeout(timer);
  const roles=I18N[lang].roles;
  if(reduce){typingEl.textContent=roles[0];return}
  let r=0,i=0,del=false;
  (function tick(){
    const w=roles[r];
    typingEl.textContent=w.slice(0,i);
    if(!del&&i===w.length){del=true;timer=setTimeout(tick,1600);return}
    if(del&&i===0){del=false;r=(r+1)%roles.length}
    i+=del?-1:1;
    timer=setTimeout(tick,del?35:80);
  })();
}
function setLang(l){
  if(!I18N[l])l="fr";
  lang=l;document.documentElement.lang=l;
  document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=I18N[l][e.dataset.i18n]);
  document.querySelectorAll("[data-i18n-html]").forEach(e=>e.innerHTML=I18N[l][e.dataset.i18nHtml]);
  document.querySelectorAll("[data-i18n-ph]").forEach(e=>e.placeholder=I18N[l][e.dataset.i18nPh]);
  document.querySelectorAll(".lang button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.lang===l));
  try{localStorage.setItem("lang",l)}catch(e){}
  startTyping();
}
function initialLang(){
  const q=new URLSearchParams(location.search).get("lang");if(I18N[q])return q;
  try{const s=localStorage.getItem("lang");if(I18N[s])return s}catch(e){}
  const n=(navigator.language||"fr").slice(0,2);return I18N[n]?n:"fr";
}
document.querySelectorAll(".lang button").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
document.getElementById("f").addEventListener("submit",e=>{
  e.preventDefault();const d=new FormData(e.target);
  const body=d.get("msg")+"\n\n— "+d.get("name")+" ("+d.get("email")+")";
  location.href="mailto:raniabensalem53@gmail.com?subject="+encodeURIComponent(d.get("subject"))+"&body="+encodeURIComponent(body);
});
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll(".rv").forEach(e=>io.observe(e));
document.getElementById("y").textContent=new Date().getFullYear();

const flip=document.getElementById("flip");
function toggleFlip(){
  const on=flip.classList.toggle("flipped");
  flip.setAttribute("aria-pressed",on);
}
flip.addEventListener("click",toggleFlip);
flip.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggleFlip()}});
setLang(initialLang());