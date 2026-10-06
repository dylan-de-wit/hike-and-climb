import { KeuzeOptie } from '../../../components/keuzelijst/keuzelijst';

export type Discipline = 'boulderen' | 'sport' | 'hike';
export type TripFilter = 'alles' | Discipline | 'beginners';

export const DISCIPLINE_NAAM: Record<Discipline, string> = {
  boulderen: 'Boulderen',
  sport: 'Sportklimmen',
  hike: 'Wildline',
};

export interface Trip {
  id: string;
  titel: string;

  discipline: Discipline;

  start: string;
  eind: string;

  datumLabel: string;

  datumBereik: string;
  dagen: number;
  niveau: string;
  beginnersvriendelijk: boolean;
  verzamelen: string;
  vervoer: string;
  prijs: number;
  plekken: number;
  bezet: number;

  noot?: string;
  samenvatting: string;
  foto: string;

  link: string;
  linkTekst: string;
}

export const NIVEAUS: Record<Discipline, string[]> = {
  boulderen: ['t/m 5', '5+ – 6b', '6c+'],
  sport: ['t/m 5c', '6a – 6b', '6c+'],
  hike: ['t/m 5c', '6a – 6b', '6c+'],
};

export const ERVARING: KeuzeOptie[] = [
  { waarde: 'eerste', label: 'Eerste keer buiten' },
  { waarde: 'paar', label: 'Een paar trips' },
  { waarde: 'ervaren', label: 'Ervaren buitenklimmer' },
];

export const ALLE_GEAR = 'alle-gear';
const KLIM = 'Klimmateriaal';
const WEEKEND = 'Weekend & kamperen';

const GEAR_SPORT: KeuzeOptie[] = [
  { waarde: ALLE_GEAR, label: 'Alle klimgear (complete set)', groep: KLIM },
  { waarde: 'touw', label: 'Touw', groep: KLIM },
  { waarde: 'setjes', label: 'Setjes (quickdraws)', groep: KLIM },
  { waarde: 'gordel', label: 'Gordel', groep: KLIM },
  { waarde: 'schoenen', label: 'Klimschoenen', groep: KLIM },
  { waarde: 'helm', label: 'Helm', groep: KLIM },
  { waarde: 'zekerapparaat', label: 'Zekerapparaat', groep: KLIM },
  { waarde: 'schroefkarabiners', label: 'Schroefkarabiners', groep: KLIM },
  { waarde: 'sling', label: 'Sling of lifeline', groep: KLIM },
  { waarde: 'prusik', label: 'Prusiktouwtje', groep: KLIM },
];

const GEAR_BOULDER: KeuzeOptie[] = [
  { waarde: ALLE_GEAR, label: 'Alle bouldergear (complete set)', groep: KLIM },
  { waarde: 'crashpad', label: 'Crashpad', groep: KLIM },
  { waarde: 'schoenen', label: 'Klimschoenen', groep: KLIM },
  { waarde: 'pofzak', label: 'Pofzak & magnesium', groep: KLIM },
  { waarde: 'borstel', label: 'Borstel', groep: KLIM },
];

const GEAR_WEEKEND: KeuzeOptie[] = [
  { waarde: 'tent', label: 'Tent', groep: WEEKEND },
  { waarde: 'slaapzak', label: 'Slaapzak & matje', groep: WEEKEND },
  { waarde: 'kookset', label: 'Brander & kookset', groep: WEEKEND },
  { waarde: 'hoofdlamp', label: 'Hoofdlamp', groep: WEEKEND },
  { waarde: 'ehbo', label: 'EHBO-kit', groep: WEEKEND },
];

export function gearOpties(t: Trip): KeuzeOptie[] {
  const klim = t.discipline === 'boulderen' ? GEAR_BOULDER : GEAR_SPORT;
  return t.dagen > 1 ? [...klim, ...GEAR_WEEKEND] : klim;
}

export const TRIPS: Trip[] = [
  {
    id: 'fontainebleau-okt',
    titel: 'Fontainebleau-weekend',
    discipline: 'boulderen',
    start: '2026-10-03',
    eind: '2026-10-04',
    datumLabel: 'Za 03 okt',
    datumBereik: 'za 3 – zo 4 okt',
    dagen: 2,
    niveau: 'Font 4 – 7a',
    beginnersvriendelijk: false,
    verzamelen: '07:00',
    vervoer: 'busje vanaf de hal',
    prijs: 95,
    plekken: 12,
    bezet: 8,
    samenvatting:
      'Twee dagen zandsteen in het bos ten zuiden van Parijs. We slapen op de camping in Milly-la-Forêt en kiezen per dag een gebied dat past bij de groep.',
    foto: 'images/bouldering.jpg',
    link: '/boulderen/boulderlocaties',
    linkTekst: 'Meer over boulderlocaties',
  },
  {
    id: 'berdorf-okt',
    titel: 'Dagje Berdorf',
    discipline: 'boulderen',
    start: '2026-10-11',
    eind: '2026-10-11',
    datumLabel: 'Zo 11 okt',
    datumBereik: 'zo 11 okt',
    dagen: 1,
    niveau: 'Font 3 – 6a',
    beginnersvriendelijk: true,
    verzamelen: '08:30',
    vervoer: 'carpool',
    prijs: 35,
    plekken: 14,
    bezet: 5,
    samenvatting:
      'Een rustige eerste kennismaking met buiten boulderen in het Müllerthal. Veel lage blokken, zachte landingen en tijd voor uitleg over spotten en crashpads.',
    foto: 'images/onrocks.jpg',
    link: '/boulderen/techniek',
    linkTekst: 'Lees over boulder-techniek',
  },
  {
    id: 'ceuse-okt',
    titel: 'Ceüse lang weekend',
    discipline: 'sport',
    start: '2026-10-09',
    eind: '2026-10-12',
    datumLabel: 'Vr 09 okt',
    datumBereik: 'vr 9 – ma 12 okt',
    dagen: 4,
    niveau: '6a – 7b',
    beginnersvriendelijk: false,
    verzamelen: 'vliegveld Marseille, 10:00',
    vervoer: 'huurauto vanaf het vliegveld',
    prijs: 240,
    plekken: 10,
    bezet: 10,
    noot: 'Vluchten niet inbegrepen',
    samenvatting:
      'Vier dagen op de beroemde blauwgrijze kalkmuur. Lange, technische routes met een flinke aanloop — alleen voor wie al zelfstandig voorklimt.',
    foto: 'images/cragoverhang.jpg',
    link: '/klimmen/klimgebieden',
    linkTekst: 'Meer over klimgebieden',
  },
  {
    id: 'freyr-okt',
    titel: 'Freyr sportklimweekend',
    discipline: 'sport',
    start: '2026-10-17',
    eind: '2026-10-18',
    datumLabel: 'Za 17 okt',
    datumBereik: 'za 17 – zo 18 okt',
    dagen: 2,
    niveau: '5c – 6c',
    beginnersvriendelijk: false,
    verzamelen: '07:30',
    vervoer: 'carpool',
    prijs: 110,
    plekken: 10,
    bezet: 7,
    samenvatting:
      'Klassieke kalksteen aan de Maas bij Dinant. Single- en multi-pitch routes, overnachting in de gîte aan de voet van de rotsen.',
    foto: 'images/dinant.jpg',
    link: '/klimmen/multi-pitch',
    linkTekst: 'Lees over multi-pitch',
  },
  {
    id: 'clinic-okt',
    titel: 'Single-pitch clinic',
    discipline: 'sport',
    start: '2026-10-24',
    eind: '2026-10-24',
    datumLabel: 'Za 24 okt',
    datumBereik: 'za 24 okt',
    dagen: 1,
    niveau: '4 – 6a',
    beginnersvriendelijk: true,
    verzamelen: '09:00',
    vervoer: 'eigen vervoer',
    prijs: 45,
    plekken: 8,
    bezet: 2,
    samenvatting:
      'Een dag oefenen met standplaats maken, ombouwen en afdalen, onder begeleiding van een instructeur. Ideaal als je net buiten begint te klimmen.',
    foto: 'images/buitenklimmen.jpg',
    link: '/klimmen/single-pitch',
    linkTekst: 'Lees over single pitch',
  },
  {
    id: 'eifel-nov',
    titel: 'Wildline Eifel',
    discipline: 'hike',
    start: '2026-11-07',
    eind: '2026-11-08',
    datumLabel: 'Za 07 nov',
    datumBereik: 'za 7 – zo 8 nov',
    dagen: 2,
    niveau: '4 – 6b',
    beginnersvriendelijk: true,
    verzamelen: '08:00',
    vervoer: 'carpool',
    prijs: 120,
    plekken: 12,
    bezet: 11,
    samenvatting:
      'Zaterdag een dagtocht door de vulkaaneifel, zondag klimmen op de basaltwanden. Overnachting in een hut met gezamenlijk eten.',
    foto: 'images/hikeup.jpg',
    link: '/hiken/routes-gebieden',
    linkTekst: 'Meer over hikeroutes',
  },
];
