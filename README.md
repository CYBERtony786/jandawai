# JanDawai 💊
**Sahi Molecule, Sahi Daam. 100% Offline Generic Medicine Finder.**

## 🚀 Project Overview & Problem Fit
Patients unknowingly pay premium prices for branded medicines because they cannot read prescriptions or don't know the generic salt. JanDawai bridges this gap instantly by mapping expensive brands to affordable PMBI Jan Aushadhi generic alternatives, completely offline in under 3 seconds. 

## 🛡️ Medical Safety Guardrails (Zero Hallucination)
- **No LLM Guesswork:** We strictly use a deterministic Fuse.js local search on a verified JSON dataset. No AI guessing means 100% patient safety.
- **LASA Protection:** Built-in disambiguation for Look-Alike, Sound-Alike drugs by enforcing strength and pack size checks.
- **Mandatory Disclaimer:** The UI always advises consulting a doctor/pharmacist. Unrecognized drugs trigger a safe fallback message.

## 📊 Official Data Credits
Our verified dataset is responsibly curated from open government sources:
- **PMBI (Jan Aushadhi):** Generic product codes and prices (janaushadhi.gov.in).
- **NPPA:** Indicative ceiling prices for scheduled branded formulations (nppa.gov.in).
