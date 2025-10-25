import Link from "next/link";

const navItems = [
  { href: "#contexto", label: "1) Testuingurua" },
  { href: "#solucion", label: "2) Soluzioa" },
  { href: "#problema", label: "3) Konponbideak" },
  { href: "#funcionamiento", label: "4) Funtzionamendua" },
  { href: "#datos", label: "5) Datuak" },
  { href: "#app", label: "6) Aplikazioa" },
  { href: "#seguridad", label: "7) Etika" },
  { href: "#alertas", label: "8) Alertak" },
  { href: "#comparativa", label: "9) Beste ekimenak" },
  { href: "#hoja-de-ruta", label: "Hoja de ruta" },
  { href: "#expertos", label: "Adituak" },
  { href: "#exceeds", label: "EXCEEDS/5" },
  { href: "#extra", label: "Extra" },
  { href: "#cierre", label: "Amaiera" },
];

const references = [
  { id: "1", label: "Climate Change and World Heritage (UNESCO)", href: "https://whc.unesco.org/en/climatechange/" },
  { id: "2", label: "Nearly Three-Quarters of World Heritage Sites Are at High Risk (UNESCO-WRI)", href: "https://whc.unesco.org/en/news/2788" },
  { id: "3", label: "UNESCO recommends putting Venice on heritage danger list (The Guardian)", href: "https://www.theguardian.com/world/2023/jul/31/unesco-recommends-putting-venice-on-heritage-danger-list" },
  { id: "4", label: "The ABC Method: a risk management approach to preservation (ICCROM)", href: "https://www.iccrom.org/publication/abc-method-risk-management-approach-preservation-cultural-heritage" },
  { id: "5", label: "ABC Method manual (ICCROM)", href: "https://www.iccrom.org/sites/default/files/2017-12/risk_manual_2016-eng.pdf" },
  { id: "6", label: "Heritage Alerts (ICOMOS)", href: "https://www.icomos.org/advocacy/heritage-alerts/" },
  { id: "7", label: "Analysis of SAR-derived products to support emergency response (ScienceDirect)", href: "https://www.sciencedirect.com/science/article/pii/S0034425723002195" },
  { id: "8", label: "StaMPS — School of Earth and Environment (University of Leeds)", href: "https://homepages.see.leeds.ac.uk/~earahoo/stamps/" },
  { id: "9", label: "Arches Project (Getty/WMF)", href: "https://www.archesproject.org/" },
  { id: "10", label: "EAMENA Database", href: "https://eamena.org/database" },
  { id: "11", label: "EAMENA Project", href: "https://eamena.org/" },
  { id: "12", label: "HeritageWatch.AI announcement", href: "https://heritagewatch.ai/wp-content/uploads/2025/02/10022025_-Microsoft-Planet-Aliph-Iconem_Announcement.pdf" },
  { id: "13", label: "Maxar Open Data Program", href: "https://registry.opendata.aws/maxar-open-data/" },
  { id: "14", label: "Institute for Sustainable Heritage (UCL)", href: "https://www.ucl.ac.uk/bartlett/environment-energy-resources/heritage/people-institute-sustainable-heritage" },
  { id: "15", label: "Professor Andy Hooper (University of Leeds)", href: "https://environment.leeds.ac.uk/see/staff/1334/professor-andy-hooper" },
  { id: "16", label: "Ask an Archaeologist – AIA", href: "https://www.archaeological.org/programs/educators/first-lego-league-challenge-2025-2026/" },
  { id: "17", label: "May Cassar profile", href: "https://profiles.ucl.ac.uk/2305-may-cassar" },
  { id: "18", label: "Current perspectives on risks of climate change for cultural heritage", href: "https://www.heritagescienceforum.org.uk/documents/Orr_2024_01_24.pdf" },
  { id: "19", label: "Prof. Andrew Wilson", href: "https://eamena.org/people/prof-andrew-wilson" },
  { id: "20", label: "Dr Robert Bewley", href: "https://www.cbrl.ac.uk/robert_bewley/" },
  { id: "21", label: "Francesca Cigna (CNR-ISAC)", href: "https://www.isac.cnr.it/index.php/en/users/francesca-cigna" },
  { id: "22", label: "Keynote Deodato Tapete", href: "https://www.metroarcheo.com/ma2024/keynote-tapete" },
  { id: "23", label: "ICEYE Flood Insights", href: "https://www.iceye.com/solutions/insurance/flood-insights" },
  { id: "24", label: "Capella Space SAR insights", href: "https://www.capellaspace.com/blog/sar-uncovers-critical-data-on-storm-damage" },
  { id: "25", label: "Iconem", href: "https://iconem.com/" },
  { id: "26", label: "FLL UNEARTHED rúbricas", href: "https://firstinspires.blob.core.windows.net/fll/challenge/2025-26/fll-challenge-unearthed-rubrics-color.pdf" },
];

export default function Home() {
  return (
    <main className="landing">
      <section className="landing-hero" id="hasiera">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">ArchéoSense · Klima + Arkeologia + Ekintza</p>
          <h1>ArchéoSense — arriskuaren semaforo adimentsua ondarearentzat</h1>
          <p className="landing-subtitle">
            Klimak, sateliteek, bisitariek eta aztarnategiaren ezaugarriek arriskuari buruz esaten duten
            guztia batu, azaldu eta lehenetsi egiten dugu. Helburua: kaltea iritsi baino lehen erabaki zehatzak
            hartzea.
          </p>
          <div className="landing-actions">
            <Link className="landing-primary" href="/app">
              Ireki plataforma →
            </Link>
            <a className="landing-secondary" href="#contexto">
              Ikusi zergatik
            </a>
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

      <section className="landing-section" id="contexto">
        <h2>1) Testuingurua — zergatik da beharrezkoa?</h2>
        <p>
          Ondare arkeologikoa gero eta mehatxu handiagoen menpe dago: klima aldaketak, uraren zikloak,
          turismo masiboak edo lur mugimenduek ehunka gune arriskuan jartzen dituzte. Hona hemen egoeraren
          hiru irudi azkar:
        </p>
        <ul>
          <li>
            Klima aldaketak munduko ondareari eragiten dion mehatxu nagusietako bat bihurtu du UNESCOk:
            olatu beroak, suteak, uholdeak edo lehorteak gero eta ugariagoak dira.
            <a href={references[0].href} rel="noreferrer" target="_blank">
              [1]
            </a>
          </li>
          <li>
            2025ean UNESCOk eta WRIk ohartarazi zuten ondarearen %73 urarekin lotutako mehatxuen menpe dagoela
            eta %21ek gainera arrisku konbinatuak jasaten dituela; horrek erabaki azkarrak eskatzen ditu.
            <a href={references[1].href} rel="noreferrer" target="_blank">
              [2]
            </a>
          </li>
          <li>
            Kasu erreala: Veneziak eta Rapa Nuik jasaten dute klima + presio turistikoaren konbinazioa,
            arrisku gomendio iraunkorrak jasoz.
            <a href={references[2].href} rel="noreferrer" target="_blank">
              [3]
            </a>
          </li>
        </ul>
        <p>
          Arazo nagusia? Datu asko daude baina sakabanatuta: klimaren, sateliteen, bisitarien edo material
          ahulen datuak ez dira erabakietan bihurtzen. ICCROMen ABC metodoak (Arriskua, Ahultasuna, Esposizioa)
          argi uzten du behar dela datuak &quot;zer egin&quot; bilakatzea.
          <a href={references[4].href} rel="noreferrer" target="_blank">
            [4]
          </a>
        </p>
      </section>

      <section className="landing-section" id="solucion">
        <h2>2) Soluzioa laburbilduta</h2>
        <p>
          <strong>ArchéoSense</strong> aplikazioak arriskuaren seinale goiztiarrak detektatzen ditu, azalpen
          gardenak eskaintzen ditu eta ekintza zehatzak gomendatzen ditu kaltea iritsi baino lehen.
        </p>
      </section>

      <section className="landing-section" id="problema">
        <h2>3) Zein arazo konpontzen ditugu?</h2>
        <ol>
          <li>
            <strong>Datu sakabanatuak → erabaki motelak.</strong> Iturri ugari batu eta PRI semaforo bakarrean
            laburbiltzen dugu.
          </li>
          <li>
            <strong>Erreakzio berantiarra.</strong> Alertak eta eszenario simulazioak eskaintzen ditugu.
          </li>
          <li>
            <strong>Azalpen faltak konfiantza jaisten du.</strong> Top-Driverrek zergatia azaltzen dute hizkera
            argian.
          </li>
          <li>
            <strong>Pribatutasuna arriskuan.</strong> Gune sentikorren koordenatuak ofuskatu eta balioztapen
            eskuzkoa eskatzen dugu.
            <a href={references[5].href} rel="noreferrer" target="_blank">
              [6]
            </a>
          </li>
          <li>
            <strong>Presupuesto mugatuak.</strong> Ekintza bakoitzak zenbat jaitsiko duen arriskua adierazten dugu.
          </li>
        </ol>
      </section>

      <section className="landing-section" id="funcionamiento">
        <h2>4) Nola funtzionatzen du?</h2>
        <p>
          PRI (Priority Risk Index) 0 eta 1 artean dagoen balioa da. Peligro (hazard), Ahultasun, Esposizio eta
          Balioa kontuan hartzen dituen kalkulu bakarra da, ICCROMen ABC metodologian oinarritua.
        </p>
        <ul>
          <li>
            <strong>Peligroa:</strong> euria, lur hezetasuna, tenperatura, deformazioak (InSAR), uraren hurbiltasuna.
            <a href={references[6].href} rel="noreferrer" target="_blank">
              [7]
            </a>
          </li>
          <li>
            <strong>Ahultasuna:</strong> materiala, kontserbazio egoera, orientazioa.
          </li>
          <li>
            <strong>Esposizioa:</strong> malda, bibrazioak, irisgarritasuna.
          </li>
          <li>
            <strong>Balioa:</strong> tokiko, nazio edo UNESCO garrantzia.
          </li>
        </ul>
      </section>

      <section className="landing-section" id="datos">
        <h2>5) Zein datu integratzen ditugu?</h2>
        <p>
          Ingurumeneko neurketak, satelite bidezko behaketak eta giza presioaren indizeak uztartzen ditugu,
          baita aztarnategiaren deskribapen historiko eta materialak ere.
        </p>
        <ul>
          <li>Klima: euri intentsitatea, tenperatura, lur hezetasuna, deformazio seinaleak.</li>
          <li>Satela: NDVI, SAR/InSAR deformazioak, altimetria.
            <a href={references[7].href} rel="noreferrer" target="_blank">
              [7]
            </a>
          </li>
          <li>Presio antropikoa: turismoa, obrak, irisgarritasuna.</li>
          <li>Ondarearen atributuak: materiala, egoera, balioa.</li>
        </ul>
      </section>

      <section className="landing-section" id="app">
        <h2>6) Aplikazioaren modulu nagusiak</h2>
        <div className="landing-cards">
          <article className="landing-card">
            <h3>Mapa operatiboa</h3>
            <p>
              Kolorez kodeatutako puntuak, heatmap leuna, denbora barra eta Top-Driver azalpenak. Filtroek materiala,
              bioma edo arrisku tartea aukeratzen dute.
            </p>
          </article>
          <article className="landing-card">
            <h3>Triage Board</h3>
            <p>
              Lehentasun taula ordenatua: PRI, denboraren joera, konfiantza maila eta bulk-ekintzak (ikuskapena,
              txostena, eszenarioak).
            </p>
          </article>
          <article className="landing-card">
            <h3>Gune-fitxa</h3>
            <p>
              Egoera laburra, Top-Driver azalpenak, sparkline grafikoak, ekintza plana Δ-PRI balioekin eta historia.
            </p>
          </article>
          <article className="landing-card">
            <h3>Scenario Lab</h3>
            <p>
              Euri/tenperatura/ bisita aldaketak eta presetak (ekaitza, turismo gailurra, uda lehorra) berehala
              kalkulatzeko.
            </p>
          </article>
          <article className="landing-card">
            <h3>Txostenak eta interoperabilitatea</h3>
            <p>
              PDF profesionalak eta CSV/GeoJSON esportazioa Arches/EAMENA formatuetara lerrokatuta.
            </p>
          </article>
        </div>
      </section>

      <section className="landing-section" id="seguridad">
        <h2>7) Segurtasuna eta etika</h2>
        <ul>
          <li>Gune sentikorrak lehenetsita ofuskatzen dira eta zooma mugatzen da.</li>
          <li>Hallazkoen aurkikuntzak berrikusi egiten dira publiko egin aurretik.</li>
          <li>Ekintza garrantzitsu guztiek audit log-a uzten dute.</li>
        </ul>
      </section>

      <section className="landing-section" id="alertas">
        <h2>8) Alerten logika</h2>
        <ul>
          <li><strong>Gorria:</strong> PRI &gt; 0.60 edo astean +0.15 → berehala jardun.</li>
          <li><strong>Horia:</strong> 0.30–0.60 → mitigazioa eta jarraipena.</li>
          <li><strong>Berdea:</strong> &lt; 0.30 → jarraipen erregularra.</li>
          <li>Asteko laburpena gomendatutako ekintzekin.</li>
        </ul>
      </section>

      <section className="landing-section" id="comparativa">
        <h2>9) Zer dago gaur eta nola osatzen dugu?</h2>
        <ul>
          <li>
            <strong>Arches</strong>: datu estandarrak kudeatzeko bikaina, baina ez du predikzio eta eszenario dinamiko
            azaldukorik.
            <a href={references[8].href} rel="noreferrer" target="_blank">
              [9]
            </a>
          </li>
          <li>
            <strong>EAMENA</strong>: mehatxuen erregistro masiboa, baina ez du Δ-PRI kalkulurik tokiko erabakietarako.
            <a href={references[9].href} rel="noreferrer" target="_blank">
              [10]
            </a>
          </li>
          <li>
            <strong>ICOMOS Heritage Alerts</strong>: abisu eta sentsibilizazioa, ez operazio tresna.
            <a href={references[5].href} rel="noreferrer" target="_blank">
              [6]
            </a>
          </li>
          <li>
            <strong>HeritageWatch.AI</strong>: EO + IA alerta azkarra; ArchéoSensek eguneroko erabakia eta azalpena
            gehitzen ditu.
            <a href={references[11].href} rel="noreferrer" target="_blank">
              [12]
            </a>
          </li>
        </ul>
      </section>

      <section className="landing-section" id="hoja-de-ruta">
        <h2>Hoja de ruta (8–10 aste)</h2>
        <div className="landing-roadmap">
          <article className="landing-card">
            <h3>1-2 aste · Diseinua</h3>
            <ul>
              <li>10 gune erreal edo fikzio errealistak biltzea.</li>
              <li>Arches ↔ ArchéoSense mapaketa definitzea.</li>
              <li>PRI eta alerta irizpideak ixtea (ABC).</li>
            </ul>
          </article>
          <article className="landing-card">
            <h3>3-5 aste · Prototipoa</h3>
            <ul>
              <li>Mapa, Triage, Fitxa, Scenario Lab, PDF.</li>
              <li>EO datu irekiak integratzea (Maxar, SAR adibideak).
                <a href={references[12].href} rel="noreferrer" target="_blank">
                  [13]
                </a>
              </li>
              <li>Gune sentikorren politika ezartzea.</li>
            </ul>
          </article>
          <article className="landing-card">
            <h3>6-7 aste · Feedbacka</h3>
            <ul>
              <li>EAMENA/Arches: datuen fluxua.</li>
              <li>UCL-ISH: arrisku bisualizazioa.
                <a href={references[13].href} rel="noreferrer" target="_blank">
                  [14]
                </a>
              </li>
              <li>InSAR adituak: konfiantza semaforoa.
                <a href={references[14].href} rel="noreferrer" target="_blank">
                  [15]
                </a>
              </li>
              <li>FLL komunitatea (AIA) narratibarako.
                <a href={references[15].href} rel="noreferrer" target="_blank">
                  [16]
                </a>
              </li>
            </ul>
          </article>
          <article className="landing-card">
            <h3>8-10 aste · Pilota</h3>
            <ul>
              <li>2 kasu praktiko (kostaldea eta hiri gunea).</li>
              <li>Bi txosten eszenarioekin.</li>
              <li>Demo bideoa (1 min).</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="landing-section" id="expertos">
        <h2>Aditu eta erakunde gomendatuak</h2>
        <div className="landing-grid">
          <article className="landing-card">
            <h3>Unibertsitateak</h3>
            <ul>
              <li>
                May Cassar (UCL) — kontserbazio prebentiboa.
                <a href={references[16].href} rel="noreferrer" target="_blank">
                  [17]
                </a>
              </li>
              <li>
                Scott Allan Orr (UCL) — arrisku klimatikoa.
                <a href={references[17].href} rel="noreferrer" target="_blank">
                  [18]
                </a>
              </li>
              <li>
                Andrew Wilson (Oxford) — EAMENA eta interoperabilitatea.
                <a href={references[18].href} rel="noreferrer" target="_blank">
                  [19]
                </a>
              </li>
              <li>
                Robert Bewley — mehatxu protokoloak.
                <a href={references[19].href} rel="noreferrer" target="_blank">
                  [20]
                </a>
              </li>
            </ul>
          </article>
          <article className="landing-card">
            <h3>EO / SAR</h3>
            <ul>
              <li>Andy Hooper (Leeds) — StaMPS.
                <a href={references[14].href} rel="noreferrer" target="_blank">
                  [15]
                </a>
              </li>
              <li>Francesca Cigna (CNR-ISAC).
                <a href={references[20].href} rel="noreferrer" target="_blank">
                  [21]
                </a>
              </li>
              <li>Deodato Tapete (ASI).
                <a href={references[21].href} rel="noreferrer" target="_blank">
                  [22]
                </a>
              </li>
            </ul>
          </article>
          <article className="landing-card">
            <h3>Erakunde eta aliatuak</h3>
            <ul>
              <li>Arches (Getty/WMF).
                <a href={references[8].href} rel="noreferrer" target="_blank">
                  [9]
                </a>
              </li>
              <li>EAMENA sareak.
                <a href={references[10].href} rel="noreferrer" target="_blank">
                  [11]
                </a>
              </li>
              <li>ICOMOS Heritage Alerts.
                <a href={references[5].href} rel="noreferrer" target="_blank">
                  [6]
                </a>
              </li>
              <li>Planet · Microsoft · ALIPH · Iconem (HeritageWatch.AI).
                <a href={references[11].href} rel="noreferrer" target="_blank">
                  [12]
                </a>
              </li>
              <li>ICEYE eta Capella (SAR datu azkarrak).
                <a href={references[22].href} rel="noreferrer" target="_blank">
                  [23]
                </a>
                <a href={references[23].href} rel="noreferrer" target="_blank">
                  [24]
                </a>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="landing-section" id="exceeds">
        <h2>FLL UNEARTHED — EXCEEDS/5 lortzeko plan argia</h2>
        <div className="landing-grid">
          <article className="landing-card">
            <h3>IDENTIFY</h3>
            <ul>
              <li>UNESCOren eta kasu errealen froga sendoak bildu.
                <a href={references[0].href} rel="noreferrer" target="_blank">
                  [1]
                </a>
              </li>
              <li>Arches/EAMENA hutsunea azaltzen duen taula konparatiboa.
                <a href={references[8].href} rel="noreferrer" target="_blank">
                  [9]
                </a>
              </li>
              <li>ABC markoa diapositiba batean laburbildu.
                <a href={references[4].href} rel="noreferrer" target="_blank">
                  [4]
                </a>
              </li>
            </ul>
          </article>
          <article className="landing-card">
            <h3>DESIGN</h3>
            <ul>
              <li>Arkitektura diagrama + &quot;Sitio sentikorra&quot; politika.</li>
              <li>Rolak eta arrisku nagusiak identifikatu.</li>
            </ul>
          </article>
          <article className="landing-card">
            <h3>CREATE</h3>
            <ul>
              <li>Prototipo interaktiboa 4 pantailarekin eta PDFarekin.</li>
              <li>EO kasu irekiak gehitu (SAR/optikoa).
                <a href={references[12].href} rel="noreferrer" target="_blank">
                  [13]
                </a>
              </li>
            </ul>
          </article>
          <article className="landing-card">
            <h3>ITERATE</h3>
            <ul>
              <li>Gutxienez hiru feedback ziklo dokumentatu (AIA, EO, EAMENA).
                <a href={references[15].href} rel="noreferrer" target="_blank">
                  [16]
                </a>
              </li>
              <li>Konfiantza semaforoa gehitu gomendioz.</li>
            </ul>
          </article>
          <article className="landing-card">
            <h3>COMMUNICATE</h3>
            <ul>
              <li>Kasu istorio bat (PRI igoera eta jaitsiera ekintzekin).</li>
              <li>Esaldi nagusia: “datuak → semaforo → azalpena → ekintza”.</li>
              <li>Iturri guztiak oharretan.
                <a href={references[25].href} rel="noreferrer" target="_blank">
                  [26]
                </a>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="landing-section" id="extra">
        <h2>Extra gomendioak</h2>
        <ul>
          <li>Datuen gobernantza orria: sarbide mailak, ofuskazioa, audit trail.</li>
          <li>Hezkuntza posterra: “zer gertatu da / zergatik / zer egingo genuke”.</li>
          <li>Lotura HeritageWatch.AI eta antzeko ekimenekin.
            <a href={references[11].href} rel="noreferrer" target="_blank">
              [12]
            </a>
          </li>
        </ul>
      </section>

      <section className="landing-section" id="cierre">
        <h2>Mezu nagusia</h2>
        <p className="landing-quote">
          ArchéoSensek klimaren, satelitearen, pertsonen eta aztarnategiaren datuak elkartzen ditu arriskuaren
          semaforo ulerterraza emateko, “zergatik” azaltzeko eta “zer egin orain” proposatzeko — gune sentikorrak
          babestuz eta komunitateari balioa itzuliz.
        </p>
        <p>
          Prest bazaude, eska iezadazu dossier PDF laburra edo bost minutuko pitch gidatua: hero pantailak + mapa +
          Scenario Lab + txostenak.
        </p>
      </section>

      <section className="landing-section">
        <h2>Iturriak eta loturak</h2>
        <ol className="landing-references">
          {references.map((item) => (
            <li key={item.id}>
              <span>[{item.id}] </span>
              <a href={item.href} rel="noreferrer" target="_blank">
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
