# ArchéoSense — MVP

ArchéoSense arkeologia guneen arrisku indize adimentsuaren erakusgarri funtzionala da. Next.js 14, Tailwind CSS eta Mapbox GL erabiliz eraikia, euskarazko esperientzia poetiko-teknologikoa eskaintzen du, arriskuaren monitorizazioa eta lehentasunen kudeaketa uztartuz.

## Ezaugarri nagusiak

- **Mapa sentikorra**: Mapbox GL bidezko bisualizazioa, heatmap geruzarekin eta PRI kolore semaforoarekin.
- **Lehentasun taula osoa**: Triage ikuspegia, bulk-ekintzak eta datu-konfiantza labelak.
- **Gune-fitxa sakona**: Top-driver faktoreak, sparkline grafikoak Recharts-ekin eta ekintza planeko ΔPRI kalkulu sinpleak.
- **Eszenario laborategia**: Slider eta preset poetikoak; 150 ms-ko debouncea duten kalkuluak `simulateScenario` funtzioarekin.
- **Txosten PDFak**: jsPDF + AutoTable bidez sortutako laburpenak eta datu-taulak.
- **Ezarpenak + Interoperabilitatea**: Atalase egokitzapena eta JSON/CSV/GeoJSON import/export prozesuaren abiapuntua.
- **PWA + Offline cachea**: Workbox inspirazioko service worker sinplea, azken datu eta map tile eskaera nagusiak cachean gordetzeko.
- **i18n prest**: i18next euskaraz aktibatuta, en/es hizkuntzetarako egitura prestatua.

## Proiektua abiaraztea

1. **Instalazioa**

   ```bash
   pnpm install
   ```

2. **Ingurune aldagaia**

   `.env.local` fitxategian zure Mapbox tokena gehitu:

   ```bash
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.XXXXX
   ```

3. **Garapen zerbitzaria**

   ```bash
   pnpm dev
   ```

   Aplikazioa `http://localhost:3000` helbidean ikusiko duzu.

4. **Eraikuntza**

   ```bash
   pnpm build
   pnpm start
   ```

5. **Service Worker berreraikitzea**

   Service worker-ean aldaketak egiten badituzu:

   ```bash
   pnpm generate-sw
   ```

## Egitura

```
app/                Next.js App Router orriak (landing, mapa, triage, eszenarioak...)
components/         UI osagai poetiko-teknologikoak (mapa, taulak, grafikoak...)
data/               Demo GeoJSON eta time-series datuak
hooks/              Zustand storea eta debounce utilitateak
i18n/               i18next konfigurazioak (lib/)
lib/                Arrisku kalkuluak, datu utilitateak eta obfuskatzea
public/             Service worker, texture eta i18n fitxategiak
styles/             Tailwind eta estilo globalak
```

## Arrisku kalkuluak

`lib/risk.ts` fitxategiak PRI (Priority Risk Index) kalkulatzen du:

- **Hazard**: euri intentsitatea, tenperatura eta deformazio proxy-a uztartzen ditu.
- **Vulnerability**: materialaren arabera eta NDVI joeraren arabera egokitzen da.
- **Exposure**: bisitari indizea, deformazioa eta bioma berezitasuna.
- **Value**: balio kulturalaren maila (lokala/nazionala/UNESCO).

Preset-ek (kostaldea, ibarbidea, basamortua, hirigunea) pisuak aldatzen dituzte. `simulateScenario` funtzioak parametroen aldaketa azkar aztertzen du, Top-Drivers berriak kalkulatuz.

## Interoperabilitatea eta Arches mapping

Exportatutako JSONek honako mapeoa jarraitzen du:

- `name` → `izena`
- `type` → `mota`
- `material` → `materiala`
- `sensitive` → `sentsiblea`
- `value` → `balioa`
- `geometry` → `kokalekua`

Arches-era eramateko, CSV/GeoJSON fitxategietan zutabe horiek prestatu behar dira.


## Despliegue en Vercel

- `package.json` fitxategia `web/` azpidirektorioan badago, Vercel-eko **Project Settings → Root Directory** aukeran `web` ezarri.
- Hasiera orria eta `/app` ibilbidea bermatzeko, exekutatu auto-konpontzailea: `pnpm run fix:vercel`.
- Deploy egin aurretik, ikus Next.js-ek zer ibilbide sortzen dituen: `pnpm run routes` (irteeran `/` eta `/app` agertu behar dute).
- Ingurune aldagaiak: `NEXT_PUBLIC_MAPBOX_TOKEN` gehitu Vercel-en Environment Variables atalean.
- Komando erabilgarriak:
  ```bash
  pnpm run fix:vercel
  pnpm run routes
  pnpm dev
  pnpm build && pnpm start
  ```


## Fitxategi binarioak eta Git LFS

ArchéoSense proiektuak LFS (Large File Storage) erabiltzen du irudi, bideo eta bestelako fitxategi astunak modu seguruan partekatzeko. Horrela, PR-ek ez dituzte 100MB-ko muga gainditzen eta repoaren historia arin mantentzen da.

### Pauso azkarrak

```bash
bash scripts/setup-lfs.sh
bash scripts/migrate-lfs.sh    # aurretik binarioak commit eginda bazeunden
# migratu baduzu, zure adarra igotzeko:
git push -u origin <zure-adarra>    # beharrezkoa bada soilik gehitu --force zure adarrerako
```

### Hook lokalak aktibatzea

```
git config core.hooksPath .githooks
```

### Arazo ohikoak konpontzea

- Errorea ikusiz gero (`check-binaries` scriptak seinalatzen badu):
  ```bash
  git rm --cached RUTA
  git lfs track '*.ext'
  git add .
  git commit
  ```
- Fitxategi bat indizetik kentzeko baina diskotik ezabatu gabe: `bash scripts/unstage-binary.sh RUTA`
- Gogoratu GitHub-ek 100MB-ko muga duela LFS gabe: baliabide handiak LFSn edo GitHub Releases-etan gorde.

Scripts guztiak POSIX bash-en idatzita daude eta `set -euo pipefail` erabiltzen dute; exekuzio mezuak kontsultatu erroreak diagnostikatzeko.

## Lizentzia

[MIT](./LICENSE)
