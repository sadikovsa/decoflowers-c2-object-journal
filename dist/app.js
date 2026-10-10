'use strict';
(() => {
  document.documentElement.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  const motionButton = document.querySelector('.motion-toggle');
  let motionContext;
  // ScrollTrigger temporarily resets scroll during geometry measurement. A CSS
  // smooth scroll would animate that reset and corrupt document coordinates.
  function refreshGeometry() {
    if (!window.ScrollTrigger) return;
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    const x = window.scrollX;
    const y = window.scrollY;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({left:x, top:y, behavior:'instant'});
    ScrollTrigger.refresh();
    window.scrollTo({left:x, top:y, behavior:'instant'});
    root.style.scrollBehavior = previousBehavior;
  }
  function updateMotion() {
    if (motionContext) { motionContext.revert(); motionContext = null; }
    const off = paused || reduced.matches;
    document.body.classList.toggle('motion-off', off);
    motionButton.textContent = off ? 'Анимация: выкл.' : 'Анимация: вкл.';
    motionButton.setAttribute('aria-pressed', String(off));
    if (!off && window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      motionContext = gsap.context(() => {
        const mobile = window.innerWidth < 700;
        gsap.to('.hero-object', {y: mobile ? 35 : 100, x: mobile ? 0 : 28, rotation: mobile ? 0 : 2.4, scale: mobile ? .97 : .93, ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
        gsap.to('.hero-wordmark', {y: mobile ? -15 : -70, ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.1}});
        gsap.to('.editorial-photo', {scale:1.05, ease:'none',scrollTrigger:{trigger:'.editorial',start:'top bottom',end:'bottom top',scrub:1.5}});
      });
    }
  }
  motionButton.addEventListener('click', () => { paused = !paused; updateMotion(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; updateMotion(); });
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(updateMotion, 250); });
  updateMotion();
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      history.pushState(null, '', link.hash);
      target.scrollIntoView({behavior:paused || reduced.matches ? 'instant' : 'smooth',block:'start'});
    });
  });

  const categoryButtons = [...document.querySelectorAll('[data-category]')];
  const panels = [...document.querySelectorAll('[data-panel]')];
  function setCategory(category, animate) {
    categoryButtons.forEach(button => {
      const active = button.dataset.category === category;
      button.setAttribute('aria-expanded', String(active));
      button.querySelector('span').textContent = active ? '−' : '+';
    });
    panels.forEach(panel => {
      const active = panel.dataset.panel === category;
      panel.hidden = !active;
      panel.classList.toggle('is-entering', active && animate && !paused && !reduced.matches);
    });
    refreshGeometry();
  }
  categoryButtons.forEach(button => button.addEventListener('click', () => {
    const selected = button.getAttribute('aria-expanded') === 'true';
    setCategory(selected ? null : button.dataset.category, true);
  }));
  setCategory(null, false);

  const menu = document.getElementById('menu');
  const inquiry = document.getElementById('inquiry');
  let opener;
  function openDialog(dialog, trigger) {
    opener = trigger;
    document.body.classList.add('modal-open');
    dialog.showModal();
  }
  function closeDialog(dialog) { dialog.close(); }
  document.querySelector('.menu-open').addEventListener('click', event => openDialog(menu, event.currentTarget));
  for (const dialog of [menu, inquiry]) {
    dialog.querySelector('[data-close]').addEventListener('click', () => closeDialog(dialog));
    dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); if (opener) opener.focus({preventScroll:true}); });
    dialog.addEventListener('click', event => { if (event.target === dialog) { const box=dialog.getBoundingClientRect(); if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)closeDialog(dialog); } });
  }
  menu.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => closeDialog(menu)));
  const form = document.getElementById('inquiry-form');
  const name = document.getElementById('name');
  const nameError = document.getElementById('name-error');
  const topic = document.getElementById('topic');
  const message = document.getElementById('message');
  const prepared = document.getElementById('prepared');
  const preparedArea = document.getElementById('prepared-area');
  const status = document.getElementById('request-status');
  document.querySelectorAll('[data-inquiry]').forEach(button => button.addEventListener('click', () => {
    topic.value = button.dataset.inquiry;
    preparedArea.hidden = true;
    status.textContent = '';
    openDialog(inquiry, button);
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!name.value.trim()) {nameError.textContent='Введите имя, чтобы представиться команде.';name.setAttribute('aria-invalid','true');name.focus();return;}
    nameError.textContent='';name.removeAttribute('aria-invalid');
    prepared.value = `Здравствуйте, DecoFlowers! Меня зовут ${name.value.trim()}.\n\nИнтересует: ${topic.value.trim() || 'интерьерный акцент'}.\n${message.value.trim() ? '\n' + message.value.trim() + '\n' : ''}\nПодскажите, пожалуйста, актуальное наличие и условия.`;
    preparedArea.hidden = false;
    status.textContent='Текст подготовлен. Передайте его бренду удобным способом.';
    prepared.focus();
  });
  name.addEventListener('input', () => { if(name.value.trim()){nameError.textContent='';name.removeAttribute('aria-invalid');} });
  document.getElementById('copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(prepared.value); status.textContent='Текст скопирован. Теперь его можно вставить в сообщение бренду.'; }
    catch { prepared.focus(); prepared.select(); status.textContent='Копирование недоступно. Текст выделен: скопируйте его вручную или сохраните файл.'; }
  });
  document.getElementById('download').addEventListener('click', () => {
    const url=URL.createObjectURL(new Blob([prepared.value],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='DecoFlowers-обращение.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Текст сохранён в файл. Форма не отправляла данные.';
  });
  document.querySelectorAll('textarea').forEach(field=>field.addEventListener('input',()=>{field.style.height='auto';field.style.height=Math.min(field.scrollHeight,500)+'px';}));
  document.querySelectorAll('.faq details').forEach(details => {
    const summary = details.querySelector('summary');
    let animation;
    summary.addEventListener('click', event => {
      if (paused || reduced.matches || !details.animate) return;
      event.preventDefault();
      const closing = details.open;
      if (animation) animation.cancel();
      const from=details.offsetHeight;
      if(!closing)details.open=true;
      const to=closing?summary.offsetHeight:details.offsetHeight;
      details.style.overflow='hidden';
      animation=details.animate({height:[from+'px',to+'px']},{duration:280,easing:'cubic-bezier(.25,.7,.25,1)'});
      animation.onfinish=()=>{if(closing)details.open=false;details.style.overflow='';animation=null;refreshGeometry();};
      animation.oncancel=()=>{details.style.overflow='';};
    });
  });
})();
