document.addEventListener('DOMContentLoaded', ()=>{ const overlay=document.createElement('div'); overlay.className='overlay'; document.body.appendChild(overlay); overlay.addEventListener('click', ()=>{ document.getElementById('nav-links')?.classList.remove('nav-active'); document.getElementById('hamburger-menu')?.classList.remove('toggle'); overlay.classList.remove('active'); });

  const contactForm=document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', (event)=>{
      event.preventDefault();
      const name=document.getElementById('contact-name')?.value.trim();
      const email=document.getElementById('contact-email')?.value.trim();
      const message=document.getElementById('contact-message')?.value.trim();
      if(!name || !email || !message){ showToast('Harap lengkapi semua kolom kontak.', 'error'); return; }
      const messages=JSON.parse(localStorage.getItem('intan_contact_messages') || '[]');
      messages.unshift({ name, email, message, createdAt:new Date().toISOString() });
      localStorage.setItem('intan_contact_messages', JSON.stringify(messages.slice(0,10)));
      contactForm.reset();
      showToast('Pesan Anda berhasil dikirim. Tim INTAN SHOP akan menghubungi Anda.', 'success');
    });
  }

  const newsletterInput=document.getElementById('newsletter-email');
  const newsletterButton=document.getElementById('newsletter-button');
  const handleNewsletterSubmit=()=>{
    const email=(newsletterInput?.value || '').trim();
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showToast('Masukkan email valid untuk langganan.', 'error'); return; }
    const subscribers=JSON.parse(localStorage.getItem('intan_newsletter') || '[]');
    if(!subscribers.includes(email)){ subscribers.unshift(email); localStorage.setItem('intan_newsletter', JSON.stringify(subscribers.slice(0,20))); }
    if(newsletterInput) newsletterInput.value='';
    showToast('Email Anda telah terdaftar untuk update eksklusif.', 'success');
  };
  newsletterButton?.addEventListener('click', handleNewsletterSubmit);
  newsletterInput?.addEventListener('keydown', (event)=>{ if(event.key==='Enter'){ event.preventDefault(); handleNewsletterSubmit(); } });
});