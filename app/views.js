// NusaData — hash router and one render function per page.
// Every page is plain HTML built from data.js; every control on a page
// works (search, sort, toggles, detail panel) or it is not there.

import {
  SITE, HEADLINE, GDP_GROWTH, POPULATION, INFLATION, POVERTY,
  UNEMPLOYMENT, AGE_STRUCTURE, PROVINCES_TOP10, PROVINCES_ALL,
  PROVINCE_FACTS, SOCIETY, SOURCES, METHODS,
} from './data.js';
import { lineChart, barChart, hbarChart, fmt } from './charts.js';

const PAGES = [
  { route: '#/', label: 'Overview' },
  { route: '#/population', label: 'Population' },
  { route: '#/economy', label: 'Economy' },
  { route: '#/regions', label: 'Regions' },
  { route: '#/society', label: 'Society' },
  { route: '#/sources', label: 'Sources' },
];

// State for the interactive controls (kept in memory, reset on reload).
const regionState = { query: '', sortKey: 'rank', sortDir: 1, showAll: false, selected: null };
const economyState = { metric: 'growth' };

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function srcLine(source, year) {
  return `<p class="src">Source: ${esc(source)} · ${esc(String(year))}</p>`;
}

function card(h) {
  return `<article class="card">
    <h3>${esc(h.label)}</h3>
    <p class="big">${esc(h.value)}</p>
    <p class="sub">${esc(h.detail || '')}</p>
    ${srcLine(h.source, h.year)}
  </article>`;
}

function sectionHead(title, intro, source, year) {
  return `<h2>${esc(title)}</h2><p class="intro">${esc(intro)}</p>` +
    (source ? srcLine(source, year) : '');
}

// ---- Overview -------------------------------------------------------

function renderOverview() {
  const cards = HEADLINE.map(card).join('');
  return `
  <section class="hero">
    <p class="kicker">BPS · World Bank · Dukcapil — figures with source &amp; year</p>
    <h1>Indonesia in Numbers</h1>
    <p class="lede">${esc(SITE.blurb)}</p>
    <p class="hero-links">
      <a class="btn" href="#/population">People →</a>
      <a class="btn" href="#/economy">Economy →</a>
      <a class="btn" href="#/regions">Provinces →</a>
    </p>
  </section>
  <section>
    <h2>At a glance</h2>
    <div class="cards">${cards}</div>
  </section>
  <section>
    ${sectionHead('The economy keeps growing', 'Real GDP growth bounced back from the 2020 pandemic contraction and has held above 5% for four straight years.', 'BPS / World Bank', '2019–2025')}
    <div class="chart-box">${lineChart(GDP_GROWTH, { unit: '%', label: 'Real GDP growth, percent per year, 2019 to 2025' })}</div>
    <p class="caption">Real GDP growth, % per year. The −2.07% dip in 2020 is the COVID-19 recession; 2025 is the latest full-year figure.</p>
  </section>
  <section>
    ${sectionHead('A growing population', 'From 219 million in 2005 to 284 million in 2025 — about 0.8–1.0% a year in recent years.', 'BPS', '2005–2025')}
    <div class="chart-box">${barChart(POPULATION, { unit: 'm', label: 'Population in millions, 2005 to 2025' })}</div>
    <p class="caption">Population in millions. 2010 and 2020 are census counts; 2024 and 2025 are BPS mid-year projections.</p>
  </section>
  <section class="glance">
    <h2>Find a number fast</h2>
    <ul class="quick-links">
      <li><a href="#/population">Population &amp; age structure →</a> 284.44 million people, median age 31.4</li>
      <li><a href="#/economy">GDP, growth &amp; inflation →</a> Rp 22,139 trillion economy, 1.57% inflation</li>
      <li><a href="#/regions">All 38 provinces →</a> West Java is the largest at 50.3 million people</li>
      <li><a href="#/society">Jobs, poverty &amp; wellbeing →</a> 4.85% unemployment, 8.57% poverty</li>
      <li><a href="#/sources">Sources &amp; methods →</a> where every figure comes from</li>
    </ul>
  </section>`;
}

// ---- Population -----------------------------------------------------

function renderPopulation() {
  const rows = POPULATION.map((p) => `<tr><td>${p.year}</td><td>${fmt(p.value)} million</td><td>${esc(p.note || '')}</td></tr>`).join('');
  return `
  <section>
    ${sectionHead('Population', 'Indonesia is the world’s fourth most populous country. Growth has slowed to under 1% a year, and the working-age share is near its peak.', 'BPS', '2025')}
    <div class="stat-strip">
      <div><strong>284.44m</strong><span>people, mid-2025 projection (BPS)</span></div>
      <div><strong>31.4 yrs</strong><span>median age (UN / World Bank, 2025)</span></div>
      <div><strong>69.03%</strong><span>aged 15–64 — about 199 million people (Dukcapil)</span></div>
    </div>
    <div class="chart-box">${barChart(POPULATION, { unit: 'm', label: 'Population in millions, 2005 to 2025' })}</div>
    <p class="caption">Population in millions. Census years are 2010 and 2020; the rest are estimates and projections.</p>
  </section>
  <section>
    <h2>Who lives here — age structure</h2>
    <p class="intro">Almost seven in ten Indonesians are of working age. The child share is falling and the older share is rising, slowly.</p>
    <div class="chart-box">${hbarChart(AGE_STRUCTURE, { unit: '%', label: 'Share of population by age group, 2025' })}</div>
    ${srcLine('UN / World Bank; working-age count: Dukcapil', 2025)}
  </section>
  <section>
    <h2>Population over time</h2>
    <table class="data-table">
      <thead><tr><th>Year</th><th>Population</th><th>Measure</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="note">BPS projections, censuses and the Dukcapil registry count slightly different things — see <a href="#/sources">Sources &amp; methods</a> for why the numbers differ.</p>
  </section>`;
}

// ---- Economy --------------------------------------------------------

function renderEconomy() {
  const metric = economyState.metric;
  const series = metric === 'growth' ? GDP_GROWTH : INFLATION;
  const label = metric === 'growth'
    ? 'Real GDP growth, percent per year, 2019 to 2025'
    : 'Consumer price inflation, annual average percent, 2021 to 2025';
  const title = metric === 'growth' ? 'GDP growth, 2019–2025' : 'Inflation, 2021–2025';
  const intro = metric === 'growth'
    ? 'Real GDP growth, year on year. The 2020 dip is the pandemic recession; growth has held above 5% since 2022.'
    : 'Consumer price inflation, annual average. The 2022 spike (5.51%) followed the fuel-price adjustment; by 2024 it was back to 1.57%.';
  return `
  <section>
    ${sectionHead('Economy', 'A US$ 1.396 trillion economy — the world’s 16th largest — growing a little over 5% a year.', 'BPS / World Bank', 2024)}
    <div class="cards">
      ${card({ label: 'GDP (nominal)', value: 'Rp 22,139tn', detail: 'US$ 1.396 trillion, world rank #16', year: 2024, source: 'BPS / World Bank' })}
      ${card({ label: 'GDP per capita', value: 'US$ 4,960', detail: 'Rp 78.62 million per person', year: 2024, source: 'BPS' })}
      ${card({ label: 'GDP (PPP)', value: 'US$ 4.67tn', detail: 'Purchasing-power parity basis', year: 2024, source: 'World Bank' })}
      ${card({ label: 'Inflation (CPI)', value: '1.57%', detail: 'Annual average, 2024', year: 2024, source: 'BPS' })}
    </div>
  </section>
  <section>
    <h2>${title}</h2>
    <p class="intro">${intro}</p>
    <div class="toggle" role="group" aria-label="Choose series">
      <button type="button" data-metric="growth" class="${metric === 'growth' ? 'on' : ''}">GDP growth</button>
      <button type="button" data-metric="inflation" class="${metric === 'inflation' ? 'on' : ''}">Inflation</button>
    </div>
    <div class="chart-box">${lineChart(series, { unit: '%', label })}</div>
    ${srcLine(metric === 'growth' ? 'BPS / World Bank' : 'BPS (2025: World Bank)', metric === 'growth' ? '2019–2025' : '2021–2025')}
    <p class="note">How to read this: growth is real (inflation-adjusted) GDP change on the previous year; inflation is the annual average change in consumer prices.</p>
  </section>`;
}

// ---- Regions ----------------------------------------------------------

function provinceRow(p) {
  const pop = p.approx ? '≈ ' + fmt(p.population) : fmt(p.population);
  const density = p.density ? fmt(p.density) + '/km²' : '—';
  return `<tr data-province="${esc(p.name)}" class="${regionState.selected === p.name ? 'selected' : ''}">
    <td>${p.rank}</td><td>${esc(p.name)}</td><td>${esc(p.capital)}</td>
    <td>${esc(p.island)}</td><td class="num">${pop}</td><td class="num">${density}</td>
  </tr>`;
}

function renderRegions() {
  const q = regionState.query.trim().toLowerCase();
  let rows = PROVINCES_TOP10.filter((p) =>
    !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q) || p.island.toLowerCase().includes(q));
  const key = regionState.sortKey;
  const dir = regionState.sortDir;
  rows = [...rows].sort((a, b) => {
    const av = key === 'name' || key === 'capital' || key === 'island' ? a[key] : (a[key] ?? -1);
    const bv = key === 'name' || key === 'capital' || key === 'island' ? b[key] : (b[key] ?? -1);
    return (av < bv ? -1 : av > bv ? 1 : 0) * dir;
  });
  const arrow = (k) => (regionState.sortKey === k ? (dir === 1 ? ' ▲' : ' ▼') : '');
  const selected = PROVINCES_TOP10.find((p) => p.name === regionState.selected);
  const allList = regionState.showAll
    ? `<div class="all-provinces"><h3>All 38 provinces</h3>
       <p class="intro">Population figures are published here only for the ten largest; the other 28 are listed by name and island group so the country map is complete without invented numbers.</p>
       <ul class="prov-list">${PROVINCES_ALL.map((p) => `<li><strong>${esc(p.name)}</strong> <span>${esc(p.island)}</span></li>`).join('')}</ul></div>`
    : '';
  return `
  <section>
    ${sectionHead('Regions', 'Indonesia has 38 provinces across six island groups. More than half the country lives on Java — the three Javanese provinces alone hold 130 million people.', 'BPS', 'Mid-2024')}
    <div class="stat-strip">
      <div><strong>38</strong><span>provinces (2025)</span></div>
      <div><strong>${fmt(PROVINCE_FACTS.landAreaKm2)} km²</strong><span>land area</span></div>
      <div><strong>16,165/km²</strong><span>Jakarta’s density — the densest province</span></div>
    </div>
    <div class="chart-box">${hbarChart(PROVINCES_TOP10.map((p) => ({ label: p.name, value: Math.round(p.population / 1000000) })), { unit: 'm', label: 'Population of the ten largest provinces, millions' })}</div>
    <p class="caption">Population of the ten largest provinces, in millions (BPS, mid-2024). Tap a row in the table below for its details.</p>
  </section>
  <section>
    <h2>Largest provinces</h2>
    <div class="controls">
      <label>Search provinces <input type="search" id="prov-search" placeholder="Name, capital or island…" value="${esc(regionState.query)}" aria-label="Search provinces"></label>
      <button type="button" id="toggle-all" class="btn small">${regionState.showAll ? 'Hide the other 28' : 'Show all 38 provinces'}</button>
    </div>
    <div class="table-wrap">
    <table class="data-table sortable">
      <thead><tr>
        <th data-sort="rank">#${arrow('rank')}</th>
        <th data-sort="name">Province${arrow('name')}</th>
        <th data-sort="capital">Capital${arrow('capital')}</th>
        <th data-sort="island">Island${arrow('island')}</th>
        <th data-sort="population">Population${arrow('population')}</th>
        <th data-sort="density">Density${arrow('density')}</th>
      </tr></thead>
      <tbody>${rows.length ? rows.map(provinceRow).join('') : '<tr><td colspan="6" class="empty">No province matches that search.</td></tr>'}</tbody>
    </table>
    </div>
    <p class="caption">Click a column heading to sort. “≈” marks a figure rounded in the source table; “—” means no verified density is published here.</p>
    ${selected ? `<aside class="detail" id="prov-detail">
      <h3>${esc(selected.name)}</h3>
      <dl>
        <dt>Capital</dt><dd>${esc(selected.capital)}</dd>
        <dt>Island group</dt><dd>${esc(selected.island)}</dd>
        <dt>Population</dt><dd>${selected.approx ? '≈ ' : ''}${fmt(selected.population)} (BPS, mid-2024)</dd>
        <dt>Density</dt><dd>${selected.density ? fmt(selected.density) + ' people per km²' : 'Not published in this edition'}</dd>
        ${selected.note ? `<dt>Note</dt><dd>${esc(selected.note)}</dd>` : ''}
      </dl>
      <button type="button" id="close-detail" class="btn small">Close</button>
    </aside>` : ''}
    ${allList}
    <p class="note">${esc(PROVINCE_FACTS.newestNote)} Smallest province by population: ${esc(PROVINCE_FACTS.smallestByPopulation)}. Largest by area: ${esc(PROVINCE_FACTS.largestByArea)}.</p>
  </section>`;
}

// ---- Society ----------------------------------------------------------

function renderSociety() {
  const rows = SOCIETY.map((s) => `<tr><td>${esc(s.label)}</td><td class="num"><strong>${esc(s.value)}</strong>${s.detail ? ` <span class="muted">${esc(s.detail)}</span>` : ''}</td><td>${esc(String(s.year))}</td><td>${esc(s.source)}</td></tr>`).join('');
  return `
  <section>
    ${sectionHead('Society', 'Jobs, poverty and wellbeing: unemployment and poverty are both at their lowest in years, and Indonesians live longer than ever.', 'BPS / World Bank', '2024–2026')}
    <div class="cards">
      ${card({ label: 'Unemployment (TPT)', value: '4.85%', detail: '7.46 million people looking for work', year: 'Aug 2025', source: 'BPS Sakernas' })}
      ${card({ label: 'Poverty rate', value: '8.57%', detail: 'Fell to 8.07% by March 2026', year: 'Sep 2024', source: 'BPS' })}
      ${card({ label: 'Gini ratio', value: '0.379', detail: 'Income inequality, down from 0.388 in 2023', year: 2024, source: 'BPS' })}
      ${card({ label: 'Extreme poverty', value: '0.83%', detail: 'Share of the population', year: 2024, source: 'BPS' })}
    </div>
  </section>
  <section>
    <h2>Unemployment is falling</h2>
    <p class="intro">The open unemployment rate (TPT) has fallen every year since the 2021 pandemic peak.</p>
    <div class="chart-box">${lineChart(UNEMPLOYMENT, { unit: '%', label: 'Open unemployment rate, percent, 2021 to 2026' })}</div>
    ${srcLine('BPS Sakernas', '2021–Feb 2026')}
    <p class="note">The ILO modelled estimate for 2025 is 3.2% — a different definition of unemployment. This site uses the BPS TPT figure throughout.</p>
  </section>
  <section>
    <h2>Poverty is falling too</h2>
    <p class="intro">The poverty rate fell from 9.7% in 2021 to 8.07% in March 2026 — 22.93 million people, the lowest in recent years.</p>
    <div class="chart-box">${lineChart(POVERTY, { unit: '%', label: 'Poverty rate, percent of population, 2021 to 2026' })}</div>
    ${srcLine('BPS', '2021–Mar 2026')}
  </section>
  <section>
    <h2>Health, education &amp; wellbeing</h2>
    <table class="data-table">
      <thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>`;
}

// ---- Sources ----------------------------------------------------------

function renderSources() {
  const rows = SOURCES.map((s) => `<tr><td>${esc(s.figure)}</td><td>${esc(s.source)}</td><td>${esc(String(s.year))}</td><td>${esc(s.note)}</td></tr>`).join('');
  const methods = METHODS.map((m) => `<article class="method"><h3>${esc(m.title)}</h3><p>${esc(m.text)}</p></article>`).join('');
  return `
  <section>
    ${sectionHead('Sources & methods', 'Every figure on this site comes from one of the sources below. BPS is the primary source; where sources disagree, the site says so.', null, null)}
    <div class="table-wrap">
    <table class="data-table">
      <thead><tr><th>Figures</th><th>Source</th><th>Year</th><th>Note</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    </div>
  </section>
  <section>
    <h2>How to read the numbers</h2>
    <div class="methods">${methods}</div>
    <p class="note">Last updated ${esc(SITE.updated)}. Figures are rounded as published; shares may not sum to exactly 100%.</p>
  </section>`;
}

// ---- Router -----------------------------------------------------------

const RENDERERS = {
  '#/': renderOverview,
  '#/population': renderPopulation,
  '#/economy': renderEconomy,
  '#/regions': renderRegions,
  '#/society': renderSociety,
  '#/sources': renderSources,
};

export function currentRoute() {
  const hash = window.location.hash || '#/';
  return RENDERERS[hash] ? hash : '#/';
}

export function renderNav() {
  const route = currentRoute();
  return PAGES.map((p) => `<a href="${p.route}" class="${p.route === route ? 'active' : ''}" ${p.route === route ? 'aria-current="page"' : ''}>${p.label}</a>`).join('');
}

export function renderPage(root) {
  const route = currentRoute();
  root.innerHTML = RENDERERS[route]();
  bindControls(root, route);
}

// Wire up the interactive controls after each render.
function bindControls(root, route) {
  if (route === '#/economy') {
    root.querySelectorAll('[data-metric]').forEach((btn) => {
      btn.addEventListener('click', () => {
        economyState.metric = btn.getAttribute('data-metric');
        renderPage(root);
      });
    });
  }
  if (route === '#/regions') {
    const search = root.querySelector('#prov-search');
    if (search) {
      search.addEventListener('input', () => {
        regionState.query = search.value;
        renderPage(root);
        const again = root.querySelector('#prov-search');
        if (again) { again.focus(); again.setSelectionRange(again.value.length, again.value.length); }
      });
    }
    root.querySelectorAll('th[data-sort]').forEach((th) => {
      th.addEventListener('click', () => {
        const key = th.getAttribute('data-sort');
        if (regionState.sortKey === key) regionState.sortDir *= -1;
        else { regionState.sortKey = key; regionState.sortDir = 1; }
        renderPage(root);
      });
    });
    root.querySelectorAll('tbody tr[data-province]').forEach((tr) => {
      tr.addEventListener('click', () => {
        regionState.selected = tr.getAttribute('data-province');
        renderPage(root);
        const detail = root.querySelector('#prov-detail');
        if (detail) detail.scrollIntoView({ block: 'nearest' });
      });
    });
    const closeBtn = root.querySelector('#close-detail');
    if (closeBtn) closeBtn.addEventListener('click', () => { regionState.selected = null; renderPage(root); });
    const toggle = root.querySelector('#toggle-all');
    if (toggle) toggle.addEventListener('click', () => { regionState.showAll = !regionState.showAll; renderPage(root); });
  }
}
