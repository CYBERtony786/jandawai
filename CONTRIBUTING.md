# Contributing to JanDawai

Thanks for helping Indian patients find affordable generic medicines. Every contribution —
a new medicine record, a price correction, a better typo list — directly reduces someone's
out-of-pocket healthcare cost.

## Ways to contribute

1. **Add a medicine** to [`data/medicines.json`](data/medicines.json)
2. **Fix a price or strength** that has drifted since prices changed
3. **Add common typos** so fuzzy search finds a brand people actually type
4. **Improve the app** — search behaviour, offline support, accessibility, UI

## Quick start

```bash
git clone https://github.com/CYBERTony786/jandawai.git
cd jandawai
python3 -m http.server 8000   # open http://localhost:8000
```

There is no build step and no dependency install. The app is plain HTML, CSS and vanilla
JavaScript with Fuse.js.

## Adding a medicine record

1. Create a branch: `git checkout -b feat/add-<brand-name>`
2. Add one object to the array in `data/medicines.json`, keeping the file's existing 2-space
   indentation and key order.
3. Validate the JSON:
   ```bash
   python3 -m json.tool data/medicines.json > /dev/null && echo "JSON OK"
   ```
4. Commit and open a pull request.

### Schema

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

| Field             | Type    | Rules                                                                |
| ----------------- | ------- | -------------------------------------------------------------------- |
| `id`              | string  | `JA-NN`. Take the next unused number. Never renumber existing IDs.   |
| `brand_name`      | string  | Name as printed on the pack, including the strength when it is part of the brand ("Dolo 650"). |
| `common_typos`    | string  | Comma-separated, no spaces. Include real-world misspellings, Indian-English spellings and local brand variants. |
| `generic_name`    | string  | INN salt name, or salt-combo joined with `+`. Same molecule as the brand. |
| `strength`        | string  | Dose with a space before the unit: `500 mg`, `1 g`, `50 mcg`.       |
| `pack_size`       | string  | Units in the marketed pack: `10 tablets`, `100 ml`.                  |
| `branded_mrp`     | number  | Integer INR MRP of the branded pack. No symbols, no decimals.       |
| `janaushadhi_mrp` | number  | Integer INR MRP of the equivalent PMBJP product. No symbols.        |
| `use_hi`          | string  | One short Hindi sentence, plain language, no medical jargon.        |
| `is_chronic`      | boolean | `true` for long-term medicines (BP, diabetes, thyroid, cholesterol, heart, mental health). `false` for acute/OTC. |

### Validation checklist

Before opening a pull request, confirm:

- [ ] `id` is unique and follows `JA-NN` (append only — do not renumber)
- [ ] `generic_name` + `strength` genuinely match the branded product's active ingredient(s)
- [ ] `branded_mrp` and `janaushadhi_mrp` are the MRPs of **the same pack size** and are
      **plain integers in INR**
- [ ] `janaushadhi_mrp` is lower than `branded_mrp` (add a note in the PR if the PMBJP
      product is temporarily unavailable or priced higher)
- [ ] `common_typos` contains only realistic mistakes a patient would actually type
- [ ] `use_hi` reads naturally in Hindi and fits on one line
- [ ] `is_chronic` is set correctly — this drives a warning for long-term medicines
- [ ] The JSON still parses (`python3 -m json.tool data/medicines.json`)

# Contributing to JanDawai (Hacktoberfest) 🎃

We welcome contributions to expand our offline medicine database!

## How to submit a verified drug:
1. Fork the repository.
2. Open `data/medicines.json`.
3. Add a new JSON object following our strict schema (`brand_name`, `generic_name`, `strength`, `branded_mrp`, and `janaushadhi_mrp`).
4. **CRITICAL:** You MUST link an official PMBI product code or NPPA reference in your PR description. Unverified medical data will be rejected immediately to ensure patient safety.
5. Submit your Pull Request.

### Where prices come from

Prefer, in order:

1. The **PMBJP Janaushadhi price list** published by the Department of Pharmaceuticals
   (Ministry of Health & Family Welfare, Government of India).
2. The MRP printed on the branded pack (or a retail pharmacy listing).

If you cannot verify a price, **do not guess** — open an issue describing the medicine you
want added and let a maintainer source the numbers. Unverified prices are worse than a
missing record, because patients make purchase decisions from this data.

## Commit message convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(data): add record for Dolo 650
fix(data): correct janaushadhi price for Telma 40
docs: clarify how to source MRP values
feat(search): add fuzzy matching on generic_name
```

## Pull requests

- Keep one logical change per PR.
- For data changes, list the medicines added or changed in the PR description.
- Note the source of any price you looked up.
- CI must pass and the JSON must validate before merge.

## Code of conduct

Be respectful and constructive. Medicine data is sensitive — people use it when they are
worried about cost, so accuracy and kindness both matter.

## License

By contributing, you agree that your contributions are licensed under the
[MIT License](LICENSE).
