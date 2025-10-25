import Link from "next/link";
import { Icon } from "components/ui/icon";

const navItems = [
  { href: "#beharra", label: "Beharra" },
  { href: "#produktua", label: "Produktua" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#impactua", label: "Impactua" },
  { href: "#amaiera", label: "Ekiteko garaia" },
];

const heroStats = [
  { label: "Ondarea arriskuan", value: "73%", ref: "2" },
  { label: "Alertak abian", value: "+15", ref: "6" },
  { label: "Eszenario azkarrak", value: "< 30s", ref: "12" },
];

const contextHighlights = [
  {
    title: "Klima aldaketaren presioa",
    description:
      "UNESCOk ohartarazi du olatu beroak, suteak eta uholdeak gero eta handiagoak direla ondarearentzat.",
    ref: "1",
  },
  {
    title: "Urari lotutako mehatxuak",
    description:
      "UNESCO-WRIk 2025ean zabaldu zuen ondarearen %73ak urarekin lotutako arrisku handia duela.",
    ref: "2",
  },
  {
    title: "Klima + turismoaren talkak",
    description:
      "Venezia eta Rapa Nui bezalako kasuek erakusten dute presio konbinatuak erabaki azkarrak eskatzen dituela.",
    ref: "3",
  },
];

const modules = [
  {
    icon: "map" as const,
    title: "Mapa adimentsua",
    description:
      "Cluster eta semaforo koloreekin arrisku eremuen ikuspegia. Layer interaktiboek euriak, deformazioak eta bisitari fluxua erakusten dute.",
  },
  {
    icon: "table" as const,
    title: "Triage mahaia",
    description:
      "PRI arabera ordenatutako taula bizia: denboran goraka doazen guneak, bulk ekintzak eta esportazio azkarrak CSVra.",
  },
  {
    icon: "flask" as const,
    title: "Eszenario laborategia",
    description:
      "Slider eta preset-ekin jolastu: ekaitza, turismo puntakoa edo uda lehorra. Segundu gutxian PRI berria eta Top-Drivers agertzen dira.",
  },
  {
    icon: "report" as const,
    title: "Txosten automatikoak",
    description:
      "PDF profesionalak eta CSV esportazioak, mapa laburpenarekin, arriskuaren azalpenarekin eta ekintza-planekin.",
  },
  {
    icon: "settings" as const,
    title: "Ezarpen aurreratuak",
    description:
      "Pisu eta atalase pertsonalizagarriak (hazard, human, sat...). Konfigurazioa partekatu eta eguneratzeak gordeta.",
  },
];

const workflowSteps = [
  {
    title: "1 · Datuak bateratu",
    description: "Klima, satelite eta bisitari datuak murgiltzen dira PRI kalkulu bakarrean.",
    ref: "4",
  },
  {
    title: "2 · Arriskua azaldu",
    description: "Top-Driverrek argi azaltzen dute zergatik dagoen gunea gorrian edo horian.",
  },
  {
    title: "3 · Ekintza aukeratu",
    description: "Ekintza planak Δ-riesgo estimatua eta kostu/denbora etiketa erakusten du.",
  },
  {
    title: "4 · Simulatu eta partekatu",
    description: "Scenario Laben hipotesiak gordeta PDFan sartzen dira, interesdunekin partekatzeko.",
  },
];

const roadmap = [
  {
    title: "1-2 aste — Ikerketa",
    description: "ABC metodologiaren eta UNESCO/WRI gomendioen berrikuspena, gune demoen bilketa.",
    ref: "5",
  },
  {
    title: "3-5 aste — Prototipoa",
    description: "Mapa, triage taula, fitxa eta PDF sortzailea. SAR/NDVI adibide irekiak integratuta.",
    ref: "7",
  },
  {
    title: "6-7 aste — Feedbacka",
    description: "Arches/EAMENA, UCL-ISH eta InSAR adituekin berrikuspenak eta iterazioak.",
    ref: "9",
  },
  {
    title: "8-10 aste — Pilotoa",
    description: "Bi kasu erreal, eszenario gordetako txostenak eta 1 minutuko demo bideoa.",
  },
];

const expertNetwork = [
  {
    name: "May Cassar",
    role: "UCL · Institute for Sustainable Heritage",
    focus: "Prebentziozko kontserbazioa eta klima-arriskua.",
    ref: "17",
  },
  {
    name: "Scott Allan Orr",
    role: "UCL · Klima arriskuen ikerlaria",
    focus: "Arriskuen metrika eta atalase adimendunak.",
    ref: "18",
  },
  {
    name: "Andrew Wilson",
    role: "Oxford · EAMENA",
    focus: "Interoperabilitatea eta lehentasunak eskala handian.",
    ref: "19",
  },
  {
    name: "Andy Hooper",
    role: "University of Leeds · COMET",
    focus: "InSAR deformazioaren validazioa eta konfiantza semaforoa.",
    ref: "15",
  },
  {
    name: "HeritageWatch.AI",
    role: "Planet · Microsoft · ALIPH · Iconem",
    focus: "EO + IA alarmen esperientzia errealak.",
    ref: "12",
  },
];

const rubricPlan = [
  {
    title: "Identify",
    description:
      "UNESCO, WRI eta kasu errealen datuekin frogatzen dugu beharra. Arches/EAMENA konparaketa laburra.",
    ref: "2",
  },
  {
    title: "Design",
    description:
      "Architektura argia + politika: gune sentikorren ofuskazioa eta audit log sinplea.",
    ref: "6",
  },
  {
    title: "Create",
    description:
      "Mapa, Triage, Fitxa eta Scenario Lab erabilgarriak, Δ-riesgo ikuspegiarekin.",
  },
  {
    title: "Iterate",
    description:
      "3 feedback ziklo dokumentatu: AIA mentoria, EO/SAR adituak eta Arches/EAMENA.",
    ref: "16",
  },
  {
    title: "Communicate",
    description:
      "Narratiba bisuala + kasu bakarra: 0,28tik 0,66ra igo eta jarduerekin jaisteko istorioa.",
  },
];

const references = [
  { id: "1", label: "Climate Change and World Heritage (UNESCO)", href: "https://whc.unesco.org/en/climatechange/" },
  { id: "2", label: "Nearly Three-Quarters of World Heritage Sites Are at High Risk (UNESCO-WRI)", href: "https://whc.unesco.org/en/news/2788" },
  { id: "3", label: "UNESCO recommends putting Venice on heritage danger list (The Guardian)", href: "https://www.theguardian.com/world/2023/jul/31/unesco-recommends-putting-venice-on-heritage-danger-list" },
  { id: "4", label: "The ABC Method: a risk management approach to preservation (ICCROM)", href: "https://www.iccrom.org/publication/abc-method-risk-management-approach-preservation-cultural-heritage" },
  { id: "5", label: "ABC Method manual (ICCROM)", href: "https://www.iccrom.org/sites/default/files/2017-12/risk_manual_2016-eng.pdf" },
  { id: "6", label: "Heritage Alerts (ICOMOS)", href: "https://www.icomos.org/advocacy/heritage-alerts/" },
  { id: "7", label: "Analysis of SAR-derived products to support emergency response (ScienceDirect)", href: "https://www.sciencedirect.com/science/article/pii/S0034425723002195" },
  { id: "9", label: "Arches Project (Getty/WMF)", href: "https://www.archesproject.org/" },
  { id: "12", label: "HeritageWatch.AI announcement", href: "https://heritagewatch.ai/wp-content/uploads/2025/02/10022025_-Microsoft-Planet-Aliph-Iconem_Announcement.pdf" },
  { id: "15", label: "Professor Andy Hooper (University of Leeds)", href: "https://environment.leeds.ac.uk/see/staff/1334/professor-andy-hooper" },
  { id: "16", label: "Ask an Archaeologist – AIA", href: "https://www.archaeological.org/programs/educators/first-lego-league-challenge-2025-2026/" },
  { id: "17", label: "May Cassar profile", href: "https://profiles.ucl.ac.uk/2305-may-cassar" },
  { id: "18", label: "Current perspectives on risks of climate change for cultural heritage", href: "https://www.heritagescienceforum.org.uk/documents/Orr_2024_01_24.pdf" },
  { id: "19", label: "Prof. Andrew Wilson", href: "https://eamena.org/people/prof-andrew-wilson" },
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
              <a className="landing-secondary" href="#produktua">
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

      <section className="landing-section" id="beharra">
        <header className="landing-section-header">
          <h2>Zergatik orain?</h2>
          <p>
            Ondare arkeologikoa presio konbinatuen menpe dago: klima muturrekoak, uraren zikloak eta bisitari
            masiboak. Hiru datu azkar hauek erakusten dute zergatik behar dugun erabaki sistema azkarra.
          </p>
        </header>
        <div className="landing-grid">
          {contextHighlights.map((item) => (
            <article className="landing-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>
                {item.description} <ReferenceLink id={item.ref} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="produktua">
        <header className="landing-section-header">
          <h2>Zer egiten du ArchéoSensek?</h2>
          <p>
            Plataforma bakarrean batu ditugu datuak, azalpenak eta ekintza gomendioak. Modulu bakoitza bereziki
            diseinatu dugu erabiltzaile ez-teknikoek erraz ulertu eta partekatu dezaten.
          </p>
        </header>
        <div className="landing-module-grid">
          {modules.map((module) => (
            <article className="landing-card" key={module.title}>
              <Icon className="landing-card-icon" name={module.icon} />
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="flow">
        <header className="landing-section-header">
          <h2>Nola pasatzen dira datuak → ekintza?</h2>
          <p>4 pauso bisualek erakusten dute gure metodologia: datuak, azalpena, ekintza eta partekatzea.</p>
        </header>
        <ol className="landing-timeline">
          {workflowSteps.map((step) => (
            <li key={step.title}>
              <div>
                <strong>{step.title}</strong>
                <p>
                  {step.description} {step.ref ? <ReferenceLink id={step.ref} /> : null}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="landing-section" id="roadmap">
        <header className="landing-section-header">
          <h2>Roadmap · 8-10 astetan pilotua</h2>
          <p>Iterazio azkarra eta aditu sarearekin ko-diseinua, arrisku kalkulu argia frogatzeko.</p>
        </header>
        <div className="landing-roadmap">
          {roadmap.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>
                {item.description} {item.ref ? <ReferenceLink id={item.ref} /> : null}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="impactua">
        <header className="landing-section-header">
          <h2>Aliatu sare globala</h2>
          <p>
            Ikerketa, satelite eta ondare erakundeekin harreman zuzena bilatzen dugu validazio azkarra eta inpaktu
            neurgarria lortzeko.
          </p>
        </header>
        <div className="landing-experts">
          {expertNetwork.map((expert) => (
            <article key={expert.name}>
              <h3>{expert.name}</h3>
              <p className="landing-expert-role">{expert.role}</p>
              <p>{expert.focus}</p>
              {expert.ref ? <ReferenceLink id={expert.ref} /> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="exceeds">
        <header className="landing-section-header">
          <h2>FLL UNEARTHED · EXCEEDS/5 plan argia</h2>
          <p>Rúbrica ofizialeko bost irizpideak betetzen dituen checklista ikusgarria.</p>
        </header>
        <div className="landing-grid">
          {rubricPlan.map((item) => (
            <article className="landing-card" key={item.title}>
              <span className="landing-badge">{item.title}</span>
              <p>
                {item.description} {item.ref ? <ReferenceLink id={item.ref} /> : null}
              </p>
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
