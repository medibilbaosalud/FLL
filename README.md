# ArchéoSense (demo minimo)

Demo honek Next.js 14 aplikazio sinple bat erakusten du. Helburua da oinarrizko
orria Vercel-en ondo bistaratzen dela egiaztatzea, gerora funtzionalitate
gehiago gehitu aurretik.

## Nola exekutatu

```bash
pnpm install
pnpm dev
```

Produksiorako eraikitzeko:

```bash
pnpm build
pnpm start
```

Vercel-en hedatzeak erro-direktorio honetara (`/`) apuntatu behar du eta
`vercel.json` fitxategiak Next.js eraikuntza estandarra erabiltzera behartzen
du (`.next` direktorioa). Ez ezazu `Output Directory` eskuz aldatu webeko
ezarpenetan; fitxategi honek beharrezko balioak ezartzen ditu automatikoki.
