// NusaData — the hand-in program for the make.fun national statistics
// bounty (Node 22, standard library only).
//
// The site itself is plain static files in app/ (HTML, CSS and ES
// modules, no build step, no network requests). This program's only job
// is to package it for the grader: copy app/ and screenshots/ next to
// this file into the output directory and write dossier.json there,
// using the vendored make.fun library — vendor/makefun-frontend.ts must
// stay exactly as the kit shipped it, or the dossier will not match.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// In the grader: /output is used instead of MAKEFUN_OUTPUT_DIR, and the
// program runs twice — both runs must write identical bytes, so nothing
// here depends on the clock, on randomness, or on the environment.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// The repository root is the directory this file lives in.
const repoRoot = fileURLToPath(new URL('.', import.meta.url));

// The grader gives us a writable /output; anywhere else, the caller
// points MAKEFUN_OUTPUT_DIR at a directory of its own.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Start from a clean output directory so a stale file from an earlier
// run can never leak into the hand-in. Never remove the output
// directory itself: the grader runs as user 65534 with the output
// directory's parent read-only, so deleting the directory would fail
// with EACCES. Create it if missing, then remove only its contents.
mkdirSync(outputDir, { recursive: true });
for (const entry of readdirSync(outputDir)) {
  rmSync(join(outputDir, entry), { recursive: true, force: true });
}

// The site, exactly as it is in the repository.
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });

// The screenshots, if the maker has taken them yet.
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

// The dossier is the judge's view of the entry: its screenshots, the
// first load's files and bytes, and the site's source. It must be
// byte for byte what the vendored library writes — never hand-edit it.
// The caps mirror the gate: at most 4 screenshots of 256 KiB, app/ at
// most 993 files and 16 MiB, and the dossier text capped at 160 KiB.
writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
