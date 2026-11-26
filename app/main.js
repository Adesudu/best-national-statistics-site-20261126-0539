// NusaData — boot: render the page for the current hash, re-render on
// hash change, and tell the screenshot tool the page is ready.
import { renderNav, renderPage } from './views.js';

const nav = document.getElementById('nav');
const page = document.getElementById('page');

function render() {
  nav.innerHTML = renderNav();
  renderPage(page);
  document.title = 'NusaData — Indonesia in Numbers';
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
