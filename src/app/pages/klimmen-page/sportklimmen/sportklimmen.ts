import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hoofdstuk, HoofdstukNav } from '../../../components/hoofdstuk-nav/hoofdstuk-nav';

interface TabelRij {
  naam: string;
  waardeEen: string;
  waardeTwee: string;
  waardeDrie?: string;
  tab?: string;
  route?: string;
}

@Component({
  selector: 'app-sportklimmen',
  host: { class: 'thema-klimmen' },
  imports: [RouterLink, HoofdstukNav],
  templateUrl: './sportklimmen.html',
  styleUrl: './sportklimmen.scss',
})
export class Sportklimmen implements AfterViewInit, OnDestroy {
  readonly hoofdstukken: Hoofdstuk[] = [
    { naam: 'Beginnen', anchor: 'beginnen' },
    { naam: 'Veilig klimmen', kort: 'Veilig', anchor: 'veilig-klimmen' },
    { naam: 'Klimcultuur', anchor: 'klimcultuur' },
    { naam: 'FAQ', anchor: 'faq' },
  ];

  readonly tabs = [
    { id: 'toprope', naam: 'Toprope' },
    { id: 'voorklimmen', naam: 'Voorklimmen' },
    { id: 'auto-belay', naam: 'Auto belay' },
    { id: 'vallen', naam: 'Vallen' },
    { id: 'opwarmen', naam: 'Opwarmen' },
  ] as const;

  readonly tab = signal<string>('toprope');

  readonly toproperegels = [
    {
      kop: 'Haal op tijd in',
      tekst: 'Zo zakt de klimmer bij een val maar een klein stukje.',
    },
    {
      kop: 'Let goed op',
      tekst: 'Een val komt vaak onverwacht.',
    },
    {
      kop: 'Leg een knoop in het touweinde',
      tekst: 'Dan kan het touw nooit door je zekeringsapparaat glippen.',
    },
    {
      kop: 'Zeker met twee handen',
      tekst: 'Je remhand blijft altijd aan het touw.',
    },
  ];

  readonly klimvormen = [
    {
      naam: 'Toprope',
      tab: 'toprope',
      label: 'meest in NL',
      tekst:
        'Het touw hangt al door een omlooppunt boven aan de wand. Val je, dan zak je maar een klein stukje in het touw.',
    },
    {
      naam: 'Voorklimmen',
      tab: 'voorklimmen',
      label: 'ook buiten',
      tekst:
        'Je neemt het touw zelf mee naar boven en clipt het onderweg in de setjes. Dat geeft vrijheid, maar vallen wordt serieuzer.',
    },
    {
      naam: 'Auto belay',
      tab: 'auto-belay',
      label: 'zonder zekeraar',
      tekst:
        'Een apparaat boven aan de wand houdt het touw strak en laat je rustig zakken als je loslaat.',
    },
  ];

  readonly cursussen: TabelRij[] = [
    {
      naam: 'Auto Belay',
      waardeEen: 'Zelfstandig klimmen aan een auto belay',
      waardeTwee: 'minimaal 1 uur',
      waardeDrie: 'vanaf 8 jaar',
      tab: 'auto-belay',
    },
    {
      naam: 'Indoor Toprope',
      waardeEen: 'Zelfstandig topropen en zekeren',
      waardeTwee: 'minimaal 3 lessen, 8 uur',
      waardeDrie: 'vanaf 8 jaar',
      tab: 'toprope',
    },
    {
      naam: 'Indoor Voorklimmen',
      waardeEen: 'Voorklimmen en een voorklimmer zekeren',
      waardeTwee: 'minimaal 3 lessen, 8 uur',
      waardeDrie: 'vanaf 12 jaar',
      tab: 'voorklimmen',
    },
    {
      naam: 'Outdoor Single pitch',
      waardeEen: 'Zelfstandig buiten klimmen',
      waardeTwee: 'verschilt per cursus',
      waardeDrie: 'vanaf 14 jaar',
      route: '/klimmen/single-pitch',
    },
  ];

  readonly zekeringsapparaten: TabelRij[] = [
    { naam: 'Dynamisch', waardeEen: 'Remt met je remhand', waardeTwee: 'tuber, halve mastworp' },
    {
      naam: 'Autotuber',
      waardeEen: 'Remt als je remhand goed zit',
      waardeTwee: 'Smart, Click-Up, Jul2',
    },
    {
      naam: 'Halfautomaat',
      waardeEen: 'Remt los van waar je remhand zit',
      waardeTwee: 'GriGri, Matik',
    },
  ];

  readonly graden = [
    ['4c', '5', '5.6'],
    ['5b', '6-', '5.8'],
    ['5c', '6', '5.9'],
    ['6a', '6+', '5.10a'],
    ['6a+', '7-', '5.10b'],
    ['6b', '7', '5.10c'],
    ['6b+', '7+', '5.10d'],
    ['6c+', '8-', '5.11d'],
    ['7a', '8', '5.12a'],
  ];

  readonly faqs = [
    {
      vraag: 'Heb ik een klimvaardigheidsbewijs nodig om in de hal te klimmen?',
      antwoord:
        'Dat verschilt per hal. Veel hallen vragen voor zelfstandig topropen het KVB Indoor Toprope, en voor voorklimmen het KVB Indoor Voorklimmen. Sommige hallen laten je ook klimmen als je kunt laten zien dat je ervaring hebt.',
    },
    {
      vraag: 'Hoeveel mag mijn klimpartner zwaarder zijn dan ik?',
      antwoord:
        'Het fijnst is als jullie ongeveer even zwaar zijn. Is de klimmer 30 procent of meer zwaarder dan de zekeraar, vraag dan in de hal welke oplossing ze hebben, zoals een Edelrid Ohm in de eerste haak.',
    },
    {
      vraag: 'Vanaf welke leeftijd kan ik leren klimmen?',
      antwoord:
        'De cursussen Auto Belay en Indoor Toprope kun je vanaf 8 jaar volgen, Indoor Voorklimmen vanaf 12 jaar. Ben je jonger dan 14, of bij voorklimmen 16, klim dan bij voorkeur onder deskundig toezicht.',
    },
    {
      vraag: 'Kan ik met mijn KVB ook in het buitenland klimmen?',
      antwoord:
        'Er bestaat geen Europees klimbewijs. Of een hal in het buitenland je NKBV-bewijs erkent, verschilt per hal en per land.',
    },
    {
      vraag: 'Moet ik roepen als ik val?',
      antwoord:
        'Waarschuw je zekeraar als je denkt dat je gaat vallen, bijvoorbeeld met "Let op". Dan kan die zich klaarmaken om je op te vangen.',
    },
  ];

  readonly navZichtbaar = signal(false);

  private readonly sentinel = viewChild<ElementRef<HTMLElement>>('sentinel');
  private ticking = false;

  private readonly onScroll = (): void => {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      const el = this.sentinel()?.nativeElement;
      if (!el) return;
      const zichtbaar = el.getBoundingClientRect().bottom <= 0;
      if (zichtbaar !== this.navZichtbaar()) {
        this.zone.run(() => this.navZichtbaar.set(zichtbaar));
      }
    });
  };

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { capture: true, passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
    });
    this.onScroll();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll, { capture: true });
    window.removeEventListener('resize', this.onScroll);
  }

  kiesTab(id: string, event?: KeyboardEvent): void {
    if (event) {
      const volgorde = this.tabs.map((t) => t.id as string);
      const nu = volgorde.indexOf(this.tab());
      const stap = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!stap) return;
      event.preventDefault();
      id = volgorde[(nu + stap + volgorde.length) % volgorde.length];
      queueMicrotask(() => document.getElementById('tab-' + id)?.focus());
    }
    this.tab.set(id);
  }

  naarTab(id: string, event: Event): void {
    event.preventDefault();
    this.tab.set(id);
    setTimeout(() => this.scrollNaar('veilig-klimmen'), 0);
  }

  scrollNaar(anchor: string, event?: Event): void {
    event?.preventDefault();
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
