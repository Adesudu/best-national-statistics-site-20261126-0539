// NusaData — the figures behind the site.
// Every number below carries its source and year next to it in the
// interface; the SOURCES list at the bottom is the full ledger.
// Primary source is BPS (Statistics Indonesia); where BPS and another
// source disagree, BPS wins and the page says so.

export const SITE = {
  name: 'NusaData',
  tagline: 'Indonesia in Numbers',
  country: 'Indonesia',
  updated: '26 November 2026',
  blurb:
    'Indonesia at a glance: how many people live here, how the economy is ' +
    'doing, where they live, and how life is changing — every figure with ' +
    'its source and year.',
};

// Headline indicators shown on the overview page.
export const HEADLINE = [
  { label: 'Population', value: '284.44m', detail: '284,438,800 people (mid-year projection)', year: 2025, source: 'BPS' },
  { label: 'GDP (nominal)', value: 'Rp 22,139tn', detail: 'US$ 1.396 trillion — world rank #16', year: 2024, source: 'BPS / World Bank' },
  { label: 'GDP growth', value: '5.03%', detail: 'Real growth, year on year', year: 2024, source: 'BPS' },
  { label: 'GDP per capita', value: 'US$ 4,960', detail: 'Rp 78.62 million per person', year: 2024, source: 'BPS' },
  { label: 'Inflation (CPI)', value: '1.57%', detail: 'Annual average consumer price inflation', year: 2024, source: 'BPS' },
  { label: 'Unemployment', value: '4.85%', detail: 'Open unemployment rate (TPT); 7.46 million people', year: 'Aug 2025', source: 'BPS Sakernas' },
  { label: 'Poverty rate', value: '8.57%', detail: 'Share of people below the poverty line', year: 'Sep 2024', source: 'BPS' },
  { label: 'Life expectancy', value: '71.3 yrs', detail: 'At birth', year: 2024, source: 'World Bank' },
  { label: 'Human Development Index', value: '75.02', detail: 'BPS composite index (0–100)', year: 2024, source: 'BPS' },
];

// Annual real GDP growth, percent (BPS / World Bank).
export const GDP_GROWTH = [
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.69 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
  { year: 2025, value: 5.11 },
];

// Population in millions (BPS; census years marked).
export const POPULATION = [
  { year: 2005, value: 218.9, note: 'Estimate' },
  { year: 2010, value: 237.6, note: 'Census' },
  { year: 2020, value: 270.2, note: 'Census' },
  { year: 2024, value: 281.6, note: 'Projection' },
  { year: 2025, value: 284.44, note: 'Projection' },
];

// Consumer price inflation, annual average percent (BPS; 2025 World Bank).
export const INFLATION = [
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
  { year: 2025, value: 1.9 },
];

// Poverty rate, percent of population (BPS).
export const POVERTY = [
  { year: 2021, value: 9.7 },
  { year: 2022, value: 9.6 },
  { year: 2023, value: 9.4 },
  { year: 2024, value: 8.6 },
  { year: 2026, value: 8.07, note: 'March 2026 — 22.93 million people, the lowest in recent years' },
];

// Open unemployment rate (TPT), percent (BPS Sakernas).
export const UNEMPLOYMENT = [
  { year: 2021, value: 6.5 },
  { year: 2022, value: 5.9 },
  { year: 2023, value: 5.3 },
  { year: 2024, value: 4.9 },
  { year: 2025, value: 4.85, note: 'August 2025' },
  { year: 2026, value: 4.68, note: 'February 2026' },
];

// Age structure, share of population in percent (UN / World Bank, 2025).
export const AGE_STRUCTURE = [
  { label: 'Children (0–14)', value: 24.2, note: 'About 69 million young Indonesians' },
  { label: 'Working age (15–64)', value: 69.03, note: 'About 199 million people (Dukcapil, end 2025)' },
  { label: 'Older (65+)', value: 7.5, note: 'About 21 million people' },
];

// Ten largest provinces by population, mid-2024 (BPS).
// Populations marked approx are rounded in the source table.
export const PROVINCES_TOP10 = [
  { rank: 1, name: 'West Java', capital: 'Bandung', island: 'Java', population: 50345200, density: 1359 },
  { rank: 2, name: 'East Java', capital: 'Surabaya', island: 'Java', population: 41814500, density: 870 },
  { rank: 3, name: 'Central Java', capital: 'Semarang', island: 'Java', population: 37892300, density: 1104 },
  { rank: 4, name: 'North Sumatra', capital: 'Medan', island: 'Sumatra', population: 15588500, density: 215 },
  { rank: 5, name: 'Banten', capital: 'Serang', island: 'Java', population: 12431400, density: 1329 },
  { rank: 6, name: 'Jakarta', capital: 'Jakarta', island: 'Java', population: 10684900, density: 16165, note: 'Smallest province by area: 661 km²' },
  { rank: 7, name: 'South Sulawesi', capital: 'Makassar', island: 'Sulawesi', population: 9500000, density: null, approx: true },
  { rank: 8, name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', population: 9400000, density: null, approx: true },
  { rank: 9, name: 'South Sumatra', capital: 'Palembang', island: 'Sumatra', population: 8837300, density: null },
  { rank: 10, name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', population: 6728100, density: null },
];

// All 38 provinces by island group. Only the ten above carry verified
// population figures in this edition; the rest are listed by name and
// island so the map of the country is complete without invented numbers.
export const PROVINCES_ALL = [
  // Sumatra
  { name: 'Aceh', island: 'Sumatra' },
  { name: 'North Sumatra', island: 'Sumatra' },
  { name: 'West Sumatra', island: 'Sumatra' },
  { name: 'Riau', island: 'Sumatra' },
  { name: 'Riau Islands', island: 'Sumatra' },
  { name: 'Jambi', island: 'Sumatra' },
  { name: 'South Sumatra', island: 'Sumatra' },
  { name: 'Bangka Belitung', island: 'Sumatra' },
  { name: 'Bengkulu', island: 'Sumatra' },
  { name: 'Lampung', island: 'Sumatra' },
  // Java
  { name: 'Banten', island: 'Java' },
  { name: 'Jakarta', island: 'Java' },
  { name: 'West Java', island: 'Java' },
  { name: 'Central Java', island: 'Java' },
  { name: 'Yogyakarta', island: 'Java' },
  { name: 'East Java', island: 'Java' },
  // Kalimantan
  { name: 'West Kalimantan', island: 'Kalimantan' },
  { name: 'Central Kalimantan', island: 'Kalimantan' },
  { name: 'South Kalimantan', island: 'Kalimantan' },
  { name: 'East Kalimantan', island: 'Kalimantan' },
  { name: 'North Kalimantan', island: 'Kalimantan' },
  // Sulawesi
  { name: 'North Sulawesi', island: 'Sulawesi' },
  { name: 'Central Sulawesi', island: 'Sulawesi' },
  { name: 'South Sulawesi', island: 'Sulawesi' },
  { name: 'Southeast Sulawesi', island: 'Sulawesi' },
  { name: 'Gorontalo', island: 'Sulawesi' },
  { name: 'West Sulawesi', island: 'Sulawesi' },
  // Bali & Nusa Tenggara
  { name: 'Bali', island: 'Bali & Nusa Tenggara' },
  { name: 'West Nusa Tenggara', island: 'Bali & Nusa Tenggara' },
  { name: 'East Nusa Tenggara', island: 'Bali & Nusa Tenggara' },
  // Maluku & Papua
  { name: 'Maluku', island: 'Maluku & Papua' },
  { name: 'North Maluku', island: 'Maluku & Papua' },
  { name: 'West Papua', island: 'Maluku & Papua' },
  { name: 'Southwest Papua', island: 'Maluku & Papua' },
  { name: 'Papua', island: 'Maluku & Papua' },
  { name: 'Central Papua', island: 'Maluku & Papua' },
  { name: 'Highland Papua', island: 'Maluku & Papua' },
  { name: 'South Papua', island: 'Maluku & Papua' },
];

export const PROVINCE_FACTS = {
  total: 38,
  landAreaKm2: 1890180,
  largestByArea: 'Central Kalimantan — 153,564 km²',
  smallestByPopulation: 'South Papua — about 542,100 people',
  newestNote: 'The four newest provinces (Central Papua, Highland Papua, South Papua, Southwest Papua) were created in 2022.',
};

// Society page: health, education and inequality figures.
export const SOCIETY = [
  { label: 'Life expectancy at birth', value: '71.3 years', year: 2024, source: 'World Bank' },
  { label: 'Fertility rate', value: '2.12', detail: 'births per woman', year: 2024, source: 'World Bank' },
  { label: 'Median age', value: '31.4 years', year: 2025, source: 'UN / World Bank' },
  { label: 'Human Development Index', value: '75.02', detail: 'on a 0–100 scale', year: 2024, source: 'BPS' },
  { label: 'Gini ratio', value: '0.379', detail: 'income inequality; 0.388 in 2023', year: 2024, source: 'BPS' },
  { label: 'Extreme poverty', value: '0.83%', detail: 'share of the population', year: 2024, source: 'BPS' },
];

// Full source ledger for the Sources page.
export const SOURCES = [
  { figure: 'Population, GDP, inflation, poverty, unemployment, Gini, HDI', source: 'BPS — Statistics Indonesia (bps.go.id)', year: '2024–2026', note: 'Primary source for this site. Population is the mid-year projection; censuses are 2010 and 2020.' },
  { figure: 'GDP in US dollars, GDP (PPP), life expectancy, fertility rate', source: 'World Bank — World Development Indicators', year: 2024, note: 'GDP (PPP) 2024: US$ 4.67 trillion.' },
  { figure: 'Working-age population share', source: 'Dukcapil — Ministry of Home Affairs civil registry', year: 'End 2025', note: 'Registry counts differ slightly from BPS projections; the site says which measure each figure uses.' },
  { figure: 'Median age, age shares', source: 'United Nations / World Bank population estimates', year: 2025, note: 'Age shares are rounded; they sum to about 100%.' },
  { figure: 'Provincial populations', source: 'BPS provincial tables (via Wikipedia, “Provinces of Indonesia”)', year: 'Mid-2024', note: 'Top-10 figures only. South Sulawesi and Lampung are rounded in the source table and marked ≈.' },
  { figure: 'GDP per capita in rupiah', source: 'BPS, reported by ANTARA', year: '5 February 2025', note: 'Rp 78.62 million = US$ 4,960.33; the World Bank figure is US$ 4,925.' },
];

export const METHODS = [
  {
    title: 'Projection vs census vs registry',
    text: 'BPS publishes a mid-year population projection (284.44 million for 2025), full censuses every ten years (270.2 million in 2020), and Dukcapil keeps a live civil registry. The three counts differ by design — a projection is a model, a census is a count on one day, a registry follows registrations — so this site always names the measure beside the number.',
  },
  {
    title: 'Unemployment: TPT vs ILO',
    text: 'The open unemployment rate (TPT) from BPS Sakernas counts people actively looking for work (4.85% in August 2025). The ILO modelled estimate for 2025 is 3.2% under a different definition. This site uses the BPS TPT figure and names it.',
  },
  {
    title: 'Where sources disagree',
    text: 'When BPS and another source give different numbers for the same thing — for example GDP per capita, US$ 4,960 (BPS) vs US$ 4,925 (World Bank) — this site shows the BPS figure first and notes the other.',
  },
];
