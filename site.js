(() => {
  'use strict';
  const menu = document.querySelector('.menu-button');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => {menu.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');document.body.classList.remove('menu-open');};
  menu.addEventListener('click', () => {const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);document.body.classList.toggle('menu-open',open);});
  navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus({preventScroll:true});}});
  window.addEventListener('resize',()=>{if(window.innerWidth>820)closeMenu();});
  document.querySelector('#year').textContent=String(new Date().getFullYear());
  const status=document.querySelector('.copy-status');
  document.querySelector('[data-copy-phone]').addEventListener('click',async()=>{
    const number='+7 926 216-01-14';
    try {
      if(navigator.clipboard && window.isSecureContext) {await navigator.clipboard.writeText(number);}
      else {const input=document.createElement('textarea');input.value=number;input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();const copied=document.execCommand('copy');input.remove();if(!copied)throw new Error('Copy unavailable');}
      status.textContent='Номер скопирован. Используйте его для связи в MAX.';
    } catch {status.textContent='Номер для MAX: '+number;}
  });
  const dialog=document.querySelector('#screen-dialog');
  document.querySelector('[data-open-screen]').addEventListener('click',()=>{dialog.showModal();document.body.classList.add('has-dialog');});
  const closeDialog=()=>dialog.close();
  dialog.querySelector('[data-close-screen]').addEventListener('click',closeDialog);
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
  dialog.addEventListener('close',()=>document.body.classList.remove('has-dialog'));
  const range=document.querySelector('#demo-position');
  const carriage=document.querySelector('#demo-carriage');
  const head=document.querySelector('#demo-head');
  const output=document.querySelector('#demo-value');
  const play=document.querySelector('#demo-play');
  const playShape=play.querySelector('.play-shape');
  let mode='travel',playing=false,frame=0,started=0,startValue=0;
  const update=()=>{const fraction=Number(range.value)/100;carriage.setAttribute('transform',`translate(${mode==='pan'?320:95+450*fraction} 0)`);head.setAttribute('transform',`rotate(${mode==='travel'?0:-35+70*fraction} 0 117)`);output.value=range.value+'%';};
  const stop=()=>{playing=false;cancelAnimationFrame(frame);play.setAttribute('aria-label','Запустить движение на схеме');playShape.setAttribute('d','m8 5 11 7-11 7z');};
  const animate=time=>{if(!playing)return;if(!started)started=time;const next=startValue+(time-started)/70;range.value=String(Math.min(100,next));update();if(next>=100){stop();return;}frame=requestAnimationFrame(animate);};
  play.addEventListener('click',()=>{if(playing){stop();return;}if(Number(range.value)>=100)range.value='0';startValue=Number(range.value);started=0;playing=true;play.setAttribute('aria-label','Остановить движение на схеме');playShape.setAttribute('d','M7 5h3v14H7zM14 5h3v14h-3z');frame=requestAnimationFrame(animate);});
  range.addEventListener('input',()=>{stop();update();});
  document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{stop();mode=button.dataset.mode;document.querySelectorAll('[data-mode]').forEach(b=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});update();}));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  const contactBar=document.querySelector('.mobile-contact-bar');
  if ('IntersectionObserver' in window) {
    const contactVisibility=new Map();
    const contactObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>contactVisibility.set(entry.target,entry.isIntersecting));
      contactBar.classList.toggle('is-hidden',Array.from(contactVisibility.values()).some(Boolean));
    },{rootMargin:'-68px 0px -80px 0px',threshold:0});
    contactObserver.observe(document.querySelector('.hero-actions .button'));
    contactObserver.observe(document.querySelector('#contacts'));
  }
  update();
})();
