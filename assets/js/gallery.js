(function () {
  const grid = document.querySelector('[data-gallery-grid]');
  if (!grid) return;

  const fallback = [
    {
      title: 'Residential finish grading',
      category: 'Finish Grading',
      location: 'Kentucky',
      summary: 'Rough, uneven ground cut and shaped into a smooth, usable grade.',
      image: '../assets/images/finish-grade-02.webp',
      alt: 'Finished residential grade beside a fenced yard and screened porch'
    },
    {
      title: 'Site preparation in progress',
      category: 'Site Preparation',
      location: 'Kentucky',
      summary: 'Material opened up and prepared before the final grading pass.',
      image: '../assets/images/finish-grade-01.webp',
      alt: 'Residential property during earthwork and site preparation'
    }
  ];

  const dialog = document.querySelector('[data-lightbox]');
  const dialogImage = dialog?.querySelector('[data-lightbox-image]');
  const dialogTitle = dialog?.querySelector('[data-lightbox-title]');

  function normalizeImage(path) {
    if (!path) return '';
    if (/^https?:\/\//.test(path)) return path;
    const repoPrefix = '/next-level-property-solutions/';
    if (location.hostname.endsWith('github.io') && path.startsWith('/assets/')) {
      return `${repoPrefix}${path.slice(1)}`;
    }
    if (!location.hostname.endsWith('github.io') && path.startsWith(repoPrefix)) {
      return `/${path.slice(repoPrefix.length)}`;
    }
    return path;
  }

  function card(project) {
    const article = document.createElement('article');
    article.className = 'gallery-card';
    article.dataset.category = project.category.toLowerCase();
    const image = normalizeImage(project.image);
    article.innerHTML = `
      <button type="button" aria-label="Open ${project.title} photo">
        <div class="gallery-card-image">
          <img src="${image}" alt="${project.alt}" loading="lazy" width="1280" height="960">
        </div>
        <div class="gallery-card-copy">
          <small>${project.category} · ${project.location}</small>
          <h2>${project.title}</h2>
          <p>${project.summary}</p>
        </div>
      </button>`;
    article.querySelector('button').addEventListener('click', () => {
      if (!dialog || !dialogImage || !dialogTitle) return;
      dialogImage.src = image;
      dialogImage.alt = project.alt;
      dialogTitle.textContent = project.title;
      dialog.showModal();
    });
    return article;
  }

  function render(projects) {
    grid.replaceChildren(...projects.map(card));
    const categories = [...new Set(projects.map((project) => project.category))];
    const controls = document.querySelector('[data-gallery-controls]');
    categories.forEach((category) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'filter-button';
      button.dataset.filter = category.toLowerCase();
      button.setAttribute('aria-pressed', 'false');
      button.textContent = category;
      controls?.append(button);
    });
  }

  fetch('../content/gallery.json')
    .then((response) => {
      if (!response.ok) throw new Error('Gallery content unavailable');
      return response.json();
    })
    .then((data) => render(data.projects?.length ? data.projects : fallback))
    .catch(() => render(fallback));

  document.querySelector('[data-gallery-controls]')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelectorAll('.gallery-card').forEach((item) => {
      item.hidden = filter !== 'all' && item.dataset.category !== filter;
    });
  });

  dialog?.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
