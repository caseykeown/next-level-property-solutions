(function () {
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;

  function value(name) {
    return String(new FormData(form).get(name) || '').trim();
  }

  function buildMessage() {
    return [
      'QUOTE REQUEST — Next Level Property Solutions',
      '',
      `Name: ${value('name')}`,
      `Phone: ${value('phone')}`,
      `Job address: ${value('address')}`,
      `Service: ${value('service')}`,
      `Property access: ${value('access')}`,
      `Preferred timing: ${value('timing')}`,
      '',
      'Job details:',
      value('details'),
      '',
      'I can send photos in a follow-up message.'
    ].join('\n');
  }

  function valid() {
    return form.reportValidity();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!valid()) return;
    const body = encodeURIComponent(buildMessage());
    const separator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? '&' : '?';
    window.location.href = `sms:+12702722764${separator}body=${body}`;
  });

  form.querySelector('[data-email-quote]')?.addEventListener('click', () => {
    if (!valid()) return;
    const subject = encodeURIComponent(`Quote request from ${value('name')}`);
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:nextlevelpropertysolutions23@gmail.com?subject=${subject}&body=${body}`;
  });
})();
