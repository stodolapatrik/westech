# pivot-table-demo

Táto aplikácia bola vypracovaná približne do 3 hodín. Jedinou externou knižnicou použitou v projekte je **Tailwind CSS**, ktorá umožňuje rýchle a konzistentné štýlovanie komponentov pomocou utility tried.

Projekt zároveň obsahuje provizórnu cache v **Local Storage**, ktorá ukladá dáta z endpointu `https://hiring.wdev.sk/fe-data` na **10 minút**. Po uplynutí tejto doby sa pri ďalšom obnovení stránky načítajú čerstvé dáta.

## Štruktúra repozitára

- `README.md` – tento súbor  
- `package.json` – definícia závislostí a základných skriptov  
- `vite.config.js`, `postcss.config.js`, `tailwind.config.js` – konfigurácie nástrojov  
- `src/` – zdrojové súbory:
  - `main.js`, `App.vue` – vstupná logika aplikácie  
  - `composables/usePivotData.js` – logika načítania, cache a pivot transformácie  
  - `components/` – komponenty `PivotTable.vue`, `SortableHeader.vue`, `CategoryRow.vue`

## Inštalácia a spustenie

1. Klonujte repozitár alebo rozbaľte zip archív.  
2. Spustite inštaláciu závislostí:
   ```bash
   npm install
   npm run dev
