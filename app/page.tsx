import Link from "next/link";
import { Icon } from "components/ui/icon";

const navItems = [
  { href: "#hasiera", label: "Hasiera" },
  { href: "#arazoa", label: "Arazoa" },
  { href: "#soluzioa", label: "Soluzioa" },
  { href: "#pri", label: "PRI nola" },
  { href: "#sekzioak", label: "Pantailak" },
  { href: "#amaiera", label: "Ekin" },
];

const heroStats = [
  { label: "Ondarean presioa", value: "73%", ref: "2" },
  { label: "Alertak hilabetean", value: "+15", ref: "6" },
  { label: "Simulazioak", value: "<30 seg", ref: "12" },
];

const problemCards = [
  {
    title: "Klima muturrekoa",
    description:
      "Uholdeak, bero-boladak eta suteak gero eta maizagoak dira, eta ondarea lehenago kaltetzen dute.",
    ref: "1",
  },
  {
    title: "Uraren mehatxua",
    description:
      "UNESCO-WRIk ohartarazi du ondarearen %73a urarekin lotutako arrisku altuan dagoela gaur egun.",
    ref: "2",
  },
  {
    title: "Bisitarien zama",
    description:
      "Venezia edo Rapa Nui bezalako kasuek erakusten dute turismoak eta klimak batera arriskua biderkatzen dutela.",
    ref: "3",
  },
];

const solutionTiles = [
  {
    icon: "map" as const,
    title: "Mapa bisuala",
    description:
      "Semaforo koloreak, cluster adimentsuak eta " +
      "zoom bakarrean ikusiko diren gune kritikoak.",
  },
  {
    icon: "table" as const,
    title: "Triage taula",
    description: "Lehenetsi ekintzak PRI, presio humana eta datu konfiantzarekin.",
  },
  {
    icon: "flask" as const,
    title: "Eszenarioak",
    description:
      "Slider intuitiboekin probatu: ekaitza, uda lehorra edo turismoaren igoera, eta ikus nola aldatzen den arriskua.",
  },
  {
    icon: "report" as const,
    title: "Txostenak",
    description:
      "PDF eta CSV profesionalak automatikoki, mapa eta azalpenekin partekatzeko prest.",
  },
  {
    icon: "settings" as const,
    title: "Pertsonalizazioa",
    description: "Pisuak eta atalaseak egokitu zure errealitatera klik gutxitan.",
  },
];

const calculationSteps = [
  {
    step: "1",
    title: "Bildu",
    description: "Klima, satelite eta bisitari datuak automatikoki batzen dira.",
    ref: "4",
  },
  {
    step: "2",
    title: "Ulertu",
    description: "PRI kalkuluak semaforo kolorea eta 3 driver nagusiak erakusten ditu.",
  },
  {
    step: "3",
    title: "Ekin",
    description: "Ekintza bakoitzak Δ-arriskua, kostua eta denbora etiketa jasotzen du.",
  },
  {
    step: "4",
    title: "Partekatu",
    description: "Txosten eta eszenario gardenei esker, erabakiak koordinatuta heltzen dira.",
  },
];

const screenPreviews = [
  {
    slug: "mapa",
    label: "Mapa",
    blurb:
      "Hemen ikusiko duzu gune bakoitzaren posizioa eta arriskua. Layer botoiekin euriak, deformazioak edo bisitari fluxua piztu daitezke.",
  },
  {
    slug: "triage",
    label: "Triage",
    blurb:
      "Taula adimentsua: arrisku gorenean dauden guneak lehenetsita eta bulk ekintzak prest, CSV esportazioarekin.",
  },
  {
    slug: "scenario",
    label: "Eszenarioak",
    blurb:
      "Slider sinpleekin ikusiko duzu nola aldatzen den PRI euria, tenperatura edo turismoa aldatuta.",
  },
  {
    slug: "reports",
    label: "Txostenak",
    blurb: "PDF eta CSV automatikoki sortuko dira, mapa eta azalpen bisualekin.",
  },
  {
    slug: "settings",
    label: "Ezarpenak",
    blurb:
      "Pisuen kontrol erraza: hazard, human, sat eta site balioek zure errealitatera moldatuko dute PRI.",
  },
];

const impactPoints = [
  {
    title: "Ondarea babesteko abiadura",
    description:
      "Alertak eta eszenarioak 60 segundutik behera prest, kaltea gertatu aurretik erreakzionatzeko.",
  },
  {
    title: "Gardentasuna",
    description:
      "Zergatik dago gune bat gorrian? Top-Driverrek 1 lerrotan erantzuten dute.",
  },
  {
    title: "Interoperabilitatea",
    description:
      "CSV/GeoJSON esportazioak Arches edo EAMENA plataformekin lerrokatuta doaz.",
  },
];

const references = [
  { id: "1", label: "Climate Change and World Heritage (UNESCO)", href: "https://whc.unesco.org/en/climatechange/" },
  { id: "2", label: "Nearly Three-Quarters of World Heritage Sites Are at High Risk (UNESCO-WRI)", href: "https://whc.unesco.org/en/news/2788" },
  { id: "3", label: "UNESCO recommends putting Venice on heritage danger list (The Guardian)", href: "https://www.theguardian.com/world/2023/jul/31/unesco-recommends-putting-venice-on-heritage-danger-list" },
  { id: "4", label: "The ABC Method: a risk management approach to preservation (ICCROM)", href: "https://www.iccrom.org/publication/abc-method-risk-management-approach-preservation-cultural-heritage" },
  { id: "6", label: "Heritage Alerts (ICOMOS)", href: "https://www.icomos.org/advocacy/heritage-alerts/" },
  { id: "12", label: "HeritageWatch.AI announcement", href: "https://heritagewatch.ai/wp-content/uploads/2025/02/10022025_-Microsoft-Planet-Aliph-Iconem_Announcement.pdf" },
  { id: "9", label: "Arches Project (Getty/WMF)", href: "https://www.archesproject.org/" },
];

const referenceLookup = references.reduce<Record<string, string>>((acc, item) => {
  acc[item.id] = item.href;
  return acc;
}, {});

function ReferenceLink({ id }: { id: string }) {
  const href = referenceLookup[id];
  if (!href) {
    return null;
  }
  return (
    <a className="landing-ref" href={href} rel="noreferrer" target="_blank">
      [{id}]
    </a>
  );
}

export default function Home() {
  return (
    <main className="landing">
      <section className="landing-hero" id="hasiera">
        <div className="landing-hero-bg" />
        <div className="landing-hero-grid">
          <div className="landing-hero-copy">
            <p className="landing-eyebrow">ArchéoSense · Klima · Ondarea · Erabakiak</p>
            <h1>Arriskuaren semaforo bisuala, ondarea babesteko.</h1>
            <p className="landing-subtitle">
              Klimaren eta sateliteen datuak, bisitarien presioa eta guneen balioa bateratzen ditugu erabaki
              argiak hartzeko. Helburua? Ondarea babestea kaltea gertatu aurretik.
            </p>
              <div className="landing-actions">
                <Link className="landing-primary" href="/app">
                  Ireki plataforma →
                </Link>
                <a className="landing-secondary" href="#soluzioa">
                  Ezagutu moduluak
                </a>
              </div>
            <dl className="landing-stats">
              {heroStats.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>
                    {item.value}
                    {item.ref ? <ReferenceLink id={item.ref} /> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="landing-hero-card">
            <div className="landing-hero-card-inner">
              <span>Mapa + Triage + Txostenak</span>
              <h2>Ikuspegi bakarra gune kritikoentzat</h2>
              <p>
                Kolore semaforoa, top driver azalpenak eta ekintza-planak, guztiak panel bakarrean. Mugikorretan
                eta ordenagailuetan esperientzia bera.
              </p>
              <div className="landing-hero-preview">
                <div>
                  <span>Scenario Lab</span>
                  <strong>+18%</strong>
                  <small>Turismoaren igoera simulatu eta arriskuari nola eragiten dion ikusi.</small>
                </div>
                <div>
                  <span>Triage board</span>
                  <strong>3 gune</strong>
                  <small>Gorri bihurtu berri diren guneak, ikuskapen azkarra programatzeko.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav aria-label="Landing nabigazioa" className="landing-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="landing-section" id="arazoa">
        <header className="landing-section-header">
          <h2>Zergatik orain?</h2>
          <p>Hiru irudi azkar eta ulerterrazek azaltzen dute zergatik behar dugun alerta eta erantzun azkarreko sistema.</p>
        </header>
        <div className="landing-grid">
          {problemCards.map((item) => (
            <article className="landing-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>
                {item.description} <ReferenceLink id={item.ref} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="soluzioa">
        <header className="landing-section-header">
          <h2>Soluzioaren laburpena</h2>
          <p>Modulu bakoitza klik bakarrean ulertzeko pentsatuta dago: ikus, ulertu eta ekin.</p>
        </header>
        <div className="landing-module-grid">
          {solutionTiles.map((tile) => (
            <article className="landing-card" key={tile.title}>
              <Icon className="landing-card-icon" name={tile.icon} />
              <h3>{tile.title}</h3>
              <p>{tile.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section-split" id="pri">
        <header className="landing-section-header">
          <h2>Nola kalkulatzen dugu PRI?</h2>
          <p>Datuak → semaforoa → ekintza. Lau pausu bisual eta hitz sinpleekin azaltzen dugu.</p>
        </header>
        <div className="landing-pri">
          <ol>
            {calculationSteps.map((step) => (
              <li key={step.step}>
                <span>{step.step}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>
                    {step.description} {step.ref ? <ReferenceLink id={step.ref} /> : null}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="landing-media">
            <div className="landing-media-card">
              <span>PRI formula</span>
              <strong>hazard × vulnerability × exposure × value</strong>
              <p>Normalizatzen dugu (0-100) eta kolore semaforo moduan erakusten dugu.</p>
            </div>
            <div className="landing-media-card">
              <span>Top-Drivers</span>
              <p>
                Kalkuluaren ondoren, ekarpen handiena duten 3 faktoreak bistaratzen ditugu, hizkuntza arruntean.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section" id="sekzioak">
        <header className="landing-section-header">
          <h2>Zer ikusiko duzu /app eremuan?</h2>
          <p>Demoak pantaila bakoitza erakutsiko du, baina hona hemen ikuspegi bisuala.</p>
        </header>
        <div className="landing-screens">
          {screenPreviews.map((screen) => (
            <article className="landing-screen" key={screen.slug}>
              <div className="landing-screen-visual" aria-hidden="true">
                <span>{screen.label}</span>
              </div>
              <h3>{screen.label}</h3>
              <p>{screen.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="impactua">
        <header className="landing-section-header">
          <h2>Zein inpaktu nahi dugu?</h2>
          <p>Helburuak argi eta labur: erabaki azkarrak, azalpen gardenak eta partekatze segurua.</p>
        </header>
        <div className="landing-grid">
          {impactPoints.map((item) => (
            <article className="landing-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="amaiera">
        <div className="landing-cta-card">
          <div>
            <h2>Prest arriskuari aurrea hartzeko?</h2>
            <p>
              Plataforma bisuala, azalpen argiak eta ekintza plan zehatzak eskaintzen ditugu. Probatu demoarekin edo
              jarri gurekin harremanetan pilotua martxan jartzeko.
            </p>
          </div>
          <div className="landing-cta-actions">
            <Link className="landing-primary" href="/app">
              Ireki demo aktiboa
            </Link>
            <a className="landing-secondary" href="mailto:hello@archeosense.io">
              Harremanetan jarri →
            </a>
          </div>
        </div>
      </section>

      <section className="landing-section" id="references">
        <details className="landing-references">
          <summary>Iturriak eta estekak</summary>
          <ul>
            {references.map((item) => (
              <li key={item.id}>
                <a href={item.href} rel="noreferrer" target="_blank">
                  [{item.id}] {item.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </section>
    </main>
  );
}
