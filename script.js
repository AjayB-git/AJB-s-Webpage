
document.documentElement.classList.add('js');


document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      history.replaceState(null,null,href);
    }
  });
});


(function typing(){
  const el = document.getElementById('typed');
  const CURSOR = document.querySelector('.cursor');
  if(!el || !CURSOR) return;
  const phrases = ["Student • Web Developer • Designer", "Learning HTML, CSS & JavaScript", "Building small, useful projects"];
  let i = 0, pos = 0, forward = true;
  function tick(){
    const p = phrases[i];
    if(forward){
      pos++;
      el.textContent = p.slice(0,pos);
      if(pos >= p.length){ forward = false; setTimeout(tick, 1100); return; }
    } else {
      pos--;
      el.textContent = p.slice(0,pos);
      if(pos <= 0){ forward = true; i = (i+1) % phrases.length; setTimeout(tick, 250); return; }
    }
    setTimeout(tick, forward?60:30);
  }
  tick();
  setInterval(()=>CURSOR.style.opacity = CURSOR.style.opacity === '0' ? '1' : '0', 500);
})();


const ham = document.querySelector('.hamburger');
const links = document.querySelector('.links');
if(ham && links){
  ham.addEventListener('click', ()=> {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  });
  ham.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') ham.click(); });
}


function animateSkills(){
  document.querySelectorAll('.bar-inner').forEach(el=>{
    if(el.dataset.animated) return;
    const rect = el.getBoundingClientRect();
    if(rect.top < (window.innerHeight || document.documentElement.clientHeight) - 80){
      const perc = parseInt(el.dataset.perc,10) || 0;
      el.style.width = perc + '%';
      el.dataset.animated = '1';
    }
  });
}
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);
setTimeout(animateSkills, 700);


const cta = document.getElementById('ctaBtn');
const photo = document.querySelector('.photo');
if(cta && photo){
  cta.addEventListener('mouseenter', ()=> photo.style.transform = 'scale(1.02)');
  cta.addEventListener('mouseleave', ()=> photo.style.transform = '');
}


document.querySelectorAll('.contact-pill').forEach(a=>a.setAttribute('tabindex','0'));


window.addEventListener('load', ()=>{
  const cards = document.querySelectorAll('.card, .hero');
  cards.forEach((c,i)=>{
    c.style.opacity = 0;
    c.style.transform = 'translateY(10px)';
    setTimeout(()=>{ c.style.transition = 'opacity .35s ease, transform .35s ease'; c.style.opacity = 1; c.style.transform = ''; }, 120 * i);
  });
});


(function setupFadeInObserver(){
  const fadeElements = document.querySelectorAll('.cert-card, .project-card');
  if(fadeElements.length === 0) return;

  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    
    fadeElements.forEach(el => el.classList.add('fade-in'));
  }

  
  setTimeout(() => {
    document.querySelectorAll('.cert-card:not(.fade-in), .project-card:not(.fade-in)').forEach(el=>{
      el.classList.add('fade-in');
    });
  }, 900);
})();


(function setupLazyImages(){
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    img.classList.add('lazy-img');
    if(img.complete){
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
      img.addEventListener('error', () => img.classList.add('loaded'));
    }
  });
})();


