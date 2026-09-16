export type KnoopFamilie = 'Steek' | 'Verbinding' | 'Lus' | 'Wrijvingsknoop';

export interface Knoop {
  naam: string;
  slug: string;
  familie: KnoopFamilie;
  gebruik: string[];
  moeilijkheid: 1 | 2 | 3 | 4 | 5;
  samenvatting: string;
  /** Een of meer Engelse namen/synoniemen. */
  engelseNaam: string[];
  typeKnoop: string;
  gebruikBij: string;
  toepassingen: string[];
  goed: string[];
  letOp: string[];
  alternatieven: string[];
  /** Eigen foto's (optioneel) — als deze ontbreken toont de kaart de dashed placeholder. */
  fotos?: string[];
}

export const GEBRUIK_VOLGORDE = [
  'Klimmen & abseilen',
  'Onderdak & tarp',
  'Hijsen & belasten',
  'Vissen & vallen',
  'Redden & EHBO',
];

export const FAMILIE_VOLGORDE: KnoopFamilie[] = ['Steek', 'Verbinding', 'Lus', 'Wrijvingsknoop'];

export const KNOPEN: Knoop[] = [
  {
    naam: 'Mastworp',
    slug: 'mastworp',
    familie: 'Steek',
    gebruik: ['Klimmen & abseilen', 'Onderdak & tarp'],
    moeilijkheid: 1,
    samenvatting: 'Snelle verankering die je nog kunt bijstellen terwijl hij belast is.',
    engelseNaam: ['Clove hitch'],
    typeKnoop: 'Steek (aanslagknoop)',
    gebruikBij: 'Klimmen, kamperen, bootvaren',
    toepassingen: [
      'Zelfzekering aan een anker tijdens het klimmen',
      'Een tarp of zeil strak vastzetten tussen twee ankerpunten',
      'Een fender of lijn snel vastmaken aan een reling',
    ],
    goed: ['Razendsnel te leggen', 'Bijstelbaar onder spanning', 'Weinig touw nodig'],
    letOp: ['Kan doorschuiven bij wisselende trekrichting', 'Nooit als enige zekering op één ankerpunt'],
    alternatieven: ['ankersteek', 'hele-mastworp'],
  },
  {
    naam: 'Halve mastworp',
    slug: 'halve-mastworp',
    familie: 'Wrijvingsknoop',
    gebruik: ['Klimmen & abseilen', 'Redden & EHBO'],
    moeilijkheid: 2,
    samenvatting: 'Een wrijvingsknoop op een brede vergrendelbare (HMS-)karabiner waarmee je iemand kunt zekeren of laten afdalen zonder zekeringsapparaat.',
    engelseNaam: ['Munter hitch', 'Italian hitch', 'HMS knot', 'Crossing hitch'],
    typeKnoop: 'Wrijvingsknoop (op een karabiner)',
    gebruikBij: 'Klimmen, bergredding, alpinisme',
    toepassingen: [
      'Iemand zekeren of laten afdalen zonder zekeringsapparaat',
      'Touwspanning beheersen bij een redding',
      'Een noodabseil opzetten als je zekeringsapparaat kwijt bent',
    ],
    goed: ['Werkt met alleen een HMS-karabiner, geen extra materiaal nodig', 'Werkt in beide richtingen'],
    letOp: ['Draait het touw flink op, wat kink kan geven', 'Vraagt een brede vergrendelbare (HMS-)karabiner'],
    alternatieven: ['hele-mastworp', 'prusik'],
    fotos: ['Knopen/halvemastworp.png'],
  },
  {
    naam: 'Schootsteek',
    slug: 'schootsteek',
    familie: 'Verbinding',
    gebruik: ['Hijsen & belasten', 'Vissen & vallen'],
    moeilijkheid: 1,
    samenvatting: 'Verbindt twee touwen van verschillende dikte snel en betrouwbaar.',
    engelseNaam: ['Sheet bend'],
    typeKnoop: 'Verbindingsknoop',
    gebruikBij: 'Vissen, bushcraft, sjorren',
    toepassingen: [
      'Twee touwen van verschillende dikte aan elkaar knopen',
      'Een vislijn verlengen met een stuk extra lijn',
      'Restjes touw hergebruiken bij het bouwen van een sjorconstructie',
    ],
    goed: ['Werkt ook bij ongelijke diktes', 'Vlot te leggen zonder geheugensteuntje'],
    letOp: ['Kan losschieten als beide touwen helemaal slap hangen', 'Niet geschikt voor lastdragend klimwerk'],
    alternatieven: ['dubbele-vissersknoop'],
  },
  {
    naam: 'Ankersteek',
    slug: 'ankersteek',
    familie: 'Steek',
    gebruik: ['Onderdak & tarp', 'Hijsen & belasten'],
    moeilijkheid: 1,
    samenvatting: 'Snelle steek om een gesloten lus direct te verankeren aan paaltjes, bomen, rotsen of uitrusting.',
    engelseNaam: ['Girth hitch', "Lark's foot", 'Cow hitch'],
    typeKnoop: 'Steek',
    gebruikBij: 'Bergbeklimmen, varen, bushcraften',
    toepassingen: [
      'Slinge bevestigen aan een boom, rots of gordel.',
      'Een boot aanmeren aan een ring of bolder',
      'Materiaal ophangen aan de standplaats',
    ],
    goed: ['Zeer stabiel onder langdurige trek', 'Makkelijk te leggen en te controleren'],
    letOp: ['Vermindert de breeksterkte van de lus met 30% tot 50%', 'Geld niet als inbindlus of klemknoop'],
    alternatieven: ['mastworp', 'prusik'],
    fotos: ['Knopen/ankersteek1.jpeg', 'Knopen/ankersteek2.jpeg'],
  },
  {
    naam: 'Hele mastworp',
    slug: 'hele-mastworp',
    familie: 'Steek',
    gebruik: ['Klimmen & abseilen', 'Onderdak & tarp'],
    moeilijkheid: 2,
    samenvatting: 'Dezelfde mastworp, maar gelegd met twee losse lussen in het midden van het touw — handig als je niet bij de uiteinden kunt.',
    engelseNaam: ['Clove hitch in the bight', 'Clove hitch (two loop)', "Builder's knot"],
    typeKnoop: 'Steek (aanslagknoop, in de bocht gelegd)',
    gebruikBij: 'Klimmen, brandweer & redding, speleologie',
    toepassingen: [
      'Een touw in een karabiner bevestigen zonder de uiteinden te gebruiken',
      'Inhaken op een ankerpunt en zelfzekering aanpassen op de standplaats',
      'Materiaal aan een lijn hangen zonder de uiteinden los te maken',
    ],
    goed: ['Ook te leggen zonder bij de touwuiteinden te kunnen', 'Nog bijstelbaar nadat hij vastzit'],
    letOp: ['Zelfde beperking als de gewone mastworp: kan doorschuiven', 'Nooit als enige zekering op één ankerpunt'],
    alternatieven: ['mastworp', 'halve-mastworp'],
    fotos: ['Knopen/helemastworp.png'],
  },
  {
    naam: 'Paalsteek',
    slug: 'paalsteek',
    familie: 'Lus',
    gebruik: ['Klimmen & abseilen', 'Redden & EHBO'],
    moeilijkheid: 2,
    samenvatting: 'Een vaste lus die nooit strakker trekt dan je hem legt en na belasting nog los te maken is.',
    engelseNaam: ['Bowline'],
    typeKnoop: 'Lus (vaste lus)',
    gebruikBij: 'Klimmen, redden, zeilen',
    toepassingen: [
      'Een vaste lus leggen om een paal of boom',
      'Iemand ophalen of laten zakken bij een reddingssituatie',
      'Een schoot bevestigen aan het zeil',
    ],
    goed: ['Blijft losmaakbaar na zware belasting', 'Snel te leggen zodra je de beweging kent'],
    letOp: ['Kan onbelast losschudden zonder achterzetknoop', 'Niet als enige knoop bij levensbelangrijke borging'],
    alternatieven: ['teruggestoken-achtknoop'],
  },
  {
    naam: 'Teruggestoken achtknoop',
    slug: 'teruggestoken-achtknoop',
    familie: 'Lus',
    gebruik: ['Klimmen & abseilen'],
    moeilijkheid: 2,
    samenvatting: 'De knoop waarmee je jezelf in het gordel lijnt: een achtknoop die je terugvlecht door het gordel. Sterk, visueel te checken, lastig fout te leggen.',
    engelseNaam: ['Figure-eight follow-through', 'Figure eight retrace', 'Rerouted figure eight loop'],
    typeKnoop: 'Lus (teruggestoken aanlijnknoop)',
    gebruikBij: 'Sportklimmen, alpinisme, abseilen',
    toepassingen: [
      'Jezelf vastknopen in het klimgordel',
      'Een vaste eindlus leggen om een boom, paal of ring',
      'Een abseiltouw verankeren aan een vast ankerpunt',
    ],
    goed: ['Visueel goed te controleren', 'Erg sterk', 'Vergevingsgezind bij kleine afwijkingen'],
    letOp: ['Loopt na een val vast — lastig weer los te maken', 'Neemt relatief veel touw in beslag'],
    alternatieven: ['paalsteek', 'alpine-vlinderknoop'],
    fotos: ['Knopen/teruggestokenachtknoop.png'],
  },
  {
    naam: 'Prusik',
    slug: 'prusik',
    familie: 'Wrijvingsknoop',
    gebruik: ['Klimmen & abseilen', 'Hijsen & belasten'],
    moeilijkheid: 2,
    samenvatting: 'Een lus die vastgrijpt zodra je hem belast, maar zonder last met de hand te verschuiven blijft.',
    engelseNaam: ['Prusik knot'],
    typeKnoop: 'Wrijvingsknoop',
    gebruikBij: 'Klimmen, abseilen, boomklimmen',
    toepassingen: [
      'Een back-up maken tijdens het abseilen',
      'Zelfstandig omhoog klimmen langs een vast touw',
      'Een lastverdeler of grijppunt maken op een gespannen lijn',
    ],
    goed: ['Grijpt direct vast bij belasting', 'Symmetrisch, dus in elke richting bruikbaar'],
    letOp: ['Kan verglazen op nat of ijzig touw', 'Grijpt slecht op een even dik of glad touw'],
    alternatieven: ['mastworp'],
  },
  {
    naam: 'Alpine vlinderknoop',
    slug: 'alpine-vlinderknoop',
    familie: 'Lus',
    gebruik: ['Klimmen & abseilen', 'Hijsen & belasten'],
    moeilijkheid: 3,
    samenvatting: 'Een lus in het midden van een touw die vanuit drie richtingen belast kan worden zonder te verzwakken.',
    engelseNaam: ['Alpine butterfly loop'],
    typeKnoop: 'Lus (middenlus)',
    gebruikBij: 'Alpinisme, gletsjertochten, hijswerk',
    toepassingen: [
      'Een middenlus maken voor een tweede klimmer op het touw',
      'Een beschadigd stuk touw isoleren',
      'Een vast aanslagpunt maken midden op een lijn',
    ],
    goed: ['Blijft sterk bij belasting uit elke richting', 'Ook na een val nog los te maken'],
    letOp: ['Kost even oefening om de handbeweging te onthouden', 'Niet zelf-checkend als hij verkeerd wordt afgewerkt'],
    alternatieven: ['teruggestoken-achtknoop'],
  },
  {
    naam: 'Platte overhandse knoop',
    slug: 'platte-overhandse',
    familie: 'Verbinding',
    gebruik: ['Klimmen & abseilen'],
    moeilijkheid: 1,
    samenvatting: 'De simpelste manier om twee abseiltouwen aan elkaar te knopen, plat genoeg om over een rand te halen.',
    engelseNaam: ['Flat overhand bend (EDK)'],
    typeKnoop: 'Verbindingsknoop',
    gebruikBij: 'Abseilen, sportklimmen',
    toepassingen: [
      'Twee abseiltouwen aan elkaar knopen',
      'Een knoop leggen die soepel over een rand rolt',
      'Snel en tijdelijk twee lijnen verbinden',
    ],
    goed: ['Rolt soepel over de rotsrand', 'Supersnel te leggen en te checken'],
    letOp: ['Altijd minstens 30 cm staart laten', 'Alleen bedoeld om over te halen, niet als algemene verbindingsknoop'],
    alternatieven: ['dubbele-vissersknoop'],
  },
  {
    naam: 'Dubbele vissersknoop',
    slug: 'dubbele-vissersknoop',
    familie: 'Verbinding',
    gebruik: ['Klimmen & abseilen'],
    moeilijkheid: 3,
    samenvatting: 'Verbindt twee touwuiteinden (of sluit een prusiklus) met een knoop die niet meer loslaat.',
    engelseNaam: ["Double fisherman's knot"],
    typeKnoop: 'Verbindingsknoop',
    gebruikBij: 'Klimmen, prusiklussen maken',
    toepassingen: [
      'Twee touwuiteinden permanent aan elkaar verbinden',
      'Een prusiklus of sling dichtmaken',
      'Een noodlijn maken die niet meer loslaat',
    ],
    goed: ['Blijft potdicht onder belasting', 'Compact genoeg om door een ring te halen'],
    letOp: ['Bijna onmogelijk los te maken na zware belasting', 'Kost wat oefening om vlot te leggen'],
    alternatieven: ['platte-overhandse'],
  },
];
