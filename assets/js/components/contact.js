function initContact() {
  const root = document.getElementById('contact');
  if (!root) return;

  const form = root.querySelector('#contact-form');
  const status = root.querySelector('#form-status');
  const btn = root.querySelector('#submit-btn');
  const btnText = btn?.querySelector('span');

  if (!form || !status || !btn || !btnText) return;
  if (form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    status.style.display = 'none';
    status.textContent = '';

    btn.disabled = true;
    btn.style.opacity = '0.6';
    btnText.innerText = 'Envoi en cours...';

    const data = {
      name: form.querySelector("[name='name']")?.value.trim() || '',
      email: form.querySelector("[name='email']")?.value.trim() || '',
      service: form.querySelector("[name='service']")?.value || '',
      message: form.querySelector("[name='message']")?.value.trim() || '',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi.");
      }

      status.innerText = ' Bien reçu 👌 Je reviens vers vous très vite. ';
      status.style.display = 'block';
      status.style.backgroundColor = '#e8f5e9';
      status.style.color = '#2e7d32';

      form.reset();
      btn.disabled = false;
      btn.style.opacity = '1';
      btnText.innerText = 'Message envoyé';
    } catch (error) {
      console.error('CONTACT ERROR:', error);

      status.innerText = " Hmm... ça n'a pas fonctionné. Réessayez ou contactez-moi directement. ";
      status.style.display = 'block';
      status.style.backgroundColor = '#ffebee';
      status.style.color = '#c62828';

      btn.disabled = false;
      btn.style.opacity = '1';
      btnText.innerText = 'Réessayer';
    }
  });
}

window.initContact = initContact;