# JanDawai (जन दवाई) 💊

**Type a branded medicine name. See the Jan Aushadhi generic equivalent. Save up to 90%.**

JanDawai is an offline-first, mobile-web app that helps Indian patients and caregivers find the
Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP) equivalent of a branded medicine — along
with the exact price difference.

> **Dolo 650** → Paracetamol 650 mg · 15 tablets
> **₹204 → ₹52** — save **₹152 (74%)**

Most Indians pay a heavy premium for brand names when the same molecule is available at a
Janaushadhi Kendras (generic medicine store) for a fraction of the price. JanDawai closes that
awareness gap in seconds, on a phone, with no internet required after first load.

---

## Key Features

- **Typo-tolerant search** — type "Dolo", "Dollo", "Dol0" or "dolu" and still get the right match
  (powered by [Fuse.js](https://fusejs.io/) fuzzy matching).
- **Instant price comparison** — branded MRP vs. Janaushadhi MRP, with the absolute and percentage
  savings shown prominently.
- **Generic molecule name** — the unbranded salt/salt-combo you should look for on the shelf.
- **Hindi usage note** — a short `use_hi` line in plain Hindi so the medicine makes sense even if
  the English generic name does not.
- **Chronic flag** — chronic-condition medicines (BP, sugar, thyroid, cholesterol, heart) are
  tagged so patients know a substitution should be discussed with their doctor.
- **Offline-first** — the dataset is bundled and cached by a service worker, so the app works
  with no network at the point of use (important in rural pharmacies and low-connectivity areas).
- **Zero build step** — plain HTML, CSS and vanilla JavaScript. Open `index.html` and it runs.

---

## Tech Stack

| Layer   | Choice                             | Why                                             |
| ------- | ---------------------------------- | ----------------------------------------------- |
| Markup  | HTML5                              | Semantic, mobile-first, no framework overhead   |
| Styling | CSS3 (custom properties)            | One stylesheet, light/dark friendly             |
| Logic   | Vanilla JavaScript (ES modules)     | No framework, no bundler, no `node_modules`     |
| Search  | [Fuse.js](https://fusejs.io/) (MIT) | Best-in-class fuzzy matching for typos           |
| Data    | `data/medicines.json`               | Human-readable, diff-able, easy to contribute to |
| Offline | Service Worker + App Cache          | Cache-first for the shell and dataset           |

---

## Getting Started

```bash
git clone https://github.com/CYBERTony786/jandawai.git
cd jandawai
```

Serve the folder over HTTP (a service worker will not register from `file://`):

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser. On a phone, use your machine's LAN IP
(e.g. `http://192.168.1.5:8000`) and install it as a PWA from the browser menu.

---

## Dataset

All medicine data lives in [`data/medicines.json`](data/medicines.json). Each record follows a
flat, stable schema:

```json
{
  "id": "JA-01",
  "brand_name": "Dolo 650",
  "common_typos": "dolo,dollo,dolu,dol650,dolo65",
  "generic_name": "Paracetamol",
  "strength": "650 mg",
  "pack_size": "15 tablets",
  "branded_mrp": 204,
  "janaushadhi_mrp": 52,
  "use_hi": "बुखार और दर्द में इस्तेमाल होने वाली दवा",
  "is_chronic": false
}
```

| Field             | Type    | Notes                                                       |
| ----------------- | ------- | ----------------------------------------------------------- |
| `id`              | string  | `JA-NN`, stable and unique — never renumber existing IDs    |
| `brand_name`      | string  | The marketed name as printed on the pack                     |
| `common_typos`    | string  | Comma-separated misspellings / colloquial forms for search  |
| `generic_name`    | string  | Salt or salt-combo, INN names preferred                      |
| `strength`        | string  | Dosage with unit, e.g. `500 mg`, `1 g`                      |
| `pack_size`       | string  | Units per marketed pack, e.g. `10 tablets`                   |
| `branded_mrp`     | number  | MRP of the branded pack, in INR                             |
| `janaushadhi_mrp` | number  | MRP of the PMBJP equivalent, in INR                         |
| `use_hi`          | string  | One-line Hindi description of what it is used for            |
| `is_chronic`      | boolean | `true` for long-term condition medicines                    |

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to add or correct a record.

---

## Roadmap

- [x] **Phase 1 — Foundation** (this repo state): licence, docs, verified starter dataset
- [ ] **Phase 2 — App shell**: mobile-first HTML/CSS layout, search input, result cards
- [ ] **Phase 3 — Search**: Fuse.js index over brand name, typos and generic name
- [ ] **Phase 4 — Offline**: service worker precache, installable PWA, last-synced indicator
- [ ] **Phase 5 — Extras**: nearby Kendras locator, medicine reminders for chronic meds, share
      the savings as an image

---

## Contributing

Contributions are welcome — especially new medicine records and corrections. Please read
[`CONTRIBUTING.md`](CONTRIBUTING.md) first.

## License

[MIT](LICENSE) © 2026 JanDawai Contributors

---

**Disclaimer:** JanDawai is an informational tool, not medical advice. Always confirm the
substitution with a qualified pharmacist or your doctor, and never stop a prescribed medication
based on this information.
