// NusaData — hand-drawn SVG charts. No chart library, no images:
// every chart is a few dozen lines of SVG built from the data.

// Shared number formatting used by the charts.
export function fmt(n) {
  return n.toLocaleString('en-US');
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

// A line chart with labelled points. `series` is [{year, value}].
// `opts` carries the unit label and the colour.
export function lineChart(series, opts = {}) {
  const w = 640, h = 300, padL = 52, padR = 16, padT = 18, padB = 34;
  const values = series.map((p) => p.value);
  let lo = Math.min(...values, 0);
  let hi = Math.max(...values);
  if (hi - lo < 1) { hi += 0.5; lo -= 0.5; }
  const x = (i) => padL + (i * (w - padL - padR)) / (series.length - 1);
  const y = (v) => padT + ((hi - v) * (h - padT - padB)) / (hi - lo);
  const color = opts.color || '#0f5f5c';
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const dots = series
    .map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5" fill="${color}" stroke="#fff" stroke-width="1.5"><title>${p.year}: ${p.value}${opts.unit || ''}</title></circle>`)
    .join('');
  const labels = series
    .map((p, i) => `<text x="${x(i).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="12" fill="#5a5648">${p.year}</text>`)
    .join('');
  const valuesText = series
    .map((p, i) => `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="600" fill="#33302a">${p.value}${opts.unit || ''}</text>`)
    .join('');
  const grid = [0, 0.5, 1].map((f) => {
    const gv = lo + f * (hi - lo);
    const gy = y(gv);
    return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${w - padR}" y2="${gy.toFixed(1)}" stroke="#e3ddd0" stroke-width="1"/><text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#8a8474">${gv.toFixed(1)}${opts.unit || ''}</text>`;
  }).join('');
  const zero = lo < 0 ? `<line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${w - padR}" y2="${y(0).toFixed(1)}" stroke="#b9b2a0" stroke-width="1" stroke-dasharray="4 3"/>` : '';
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Line chart')}" class="chart">${grid}${zero}<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${valuesText}${labels}</svg>`;
}

// A vertical bar chart. `series` is [{year, value}] or [{label, value}].
export function barChart(series, opts = {}) {
  const w = 640, h = 300, padL = 52, padR = 16, padT = 24, padB = 34;
  const values = series.map((p) => p.value);
  const hi = Math.max(...values) * 1.12;
  const slot = (w - padL - padR) / series.length;
  const bw = Math.min(64, slot * 0.62);
  const y = (v) => padT + ((hi - v) * (h - padT - padB)) / hi;
  const color = opts.color || '#e8a33d';
  const bars = series
    .map((p, i) => {
      const cx = padL + slot * i + slot / 2;
      const label = p.year || p.label;
      return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${y(p.value).toFixed(1)}" width="${bw.toFixed(1)}" height="${(h - padB - y(p.value)).toFixed(1)}" rx="3" fill="${color}"><title>${label}: ${fmt(p.value)}${opts.unit || ''}</title></rect>` +
        `<text x="${cx.toFixed(1)}" y="${(y(p.value) - 7).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="#33302a">${fmt(p.value)}${opts.unit || ''}</text>` +
        `<text x="${cx.toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="12" fill="#5a5648">${label}</text>`;
    })
    .join('');
  const grid = [0.5, 1].map((f) => {
    const gy = y(hi * f);
    return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${w - padR}" y2="${gy.toFixed(1)}" stroke="#e3ddd0" stroke-width="1"/>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Bar chart')}" class="chart">${grid}${bars}</svg>`;
}

// Horizontal bars for shares (age structure) or ranked lists.
export function hbarChart(rows, opts = {}) {
  const w = 640, rowH = 56, padL = 170, padR = 64, padT = 8;
  const h = padT + rows.length * rowH + 8;
  const hi = Math.max(...rows.map((r) => r.value)) * 1.08;
  const color = opts.color || '#0f5f5c';
  const bars = rows
    .map((r, i) => {
      const yTop = padT + i * rowH;
      const bw = ((r.value / hi) * (w - padL - padR)).toFixed(1);
      return `<text x="${padL - 10}" y="${yTop + 20}" text-anchor="end" font-size="13.5" fill="#33302a">${esc(r.label)}</text>` +
        `<rect x="${padL}" y="${yTop}" width="${bw}" height="26" rx="4" fill="${color}"><title>${esc(r.label)}: ${r.value}${opts.unit || ''}</title></rect>` +
        `<text x="${padL + Number(bw) + 8}" y="${yTop + 20}" font-size="13.5" font-weight="700" fill="#33302a">${r.value}${opts.unit || ''}</text>` +
        (r.note ? `<text x="${padL}" y="${yTop + 44}" font-size="11.5" fill="#8a8474">${esc(r.note)}</text>` : '');
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Horizontal bar chart')}" class="chart">${bars}</svg>`;
}
