const dialog = document.getElementById('lightbox');
const image = document.getElementById('lightbox-image');
const caption = document.getElementById('lightbox-caption');
document.querySelectorAll('.photo').forEach(button => {
  button.addEventListener('click', () => {
    image.src = button.dataset.src;
    image.alt = button.querySelector('img').alt;
    caption.textContent = button.dataset.title;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.open(image.src, '_blank', 'noopener');
  });
});
dialog.querySelector('.close-lightbox').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });

// On GitHub Pages serve the large files from the latest GitHub Release.
// GitHub owner and repository are detected from the published URL,
// so no personal login is hardcoded into the page.
if (location.hostname.toLowerCase().endsWith('.github.io')) {
  const owner = location.hostname.split('.')[0];
  const repo = location.pathname.split('/').filter(Boolean)[0];
  if (owner && repo) {
    document.querySelectorAll('[data-release-file]').forEach(link => {
      const filename = link.getAttribute('data-release-file');
      link.href = `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/latest/download/${encodeURIComponent(filename)}`;
      link.removeAttribute('download');
    });
  }
}
