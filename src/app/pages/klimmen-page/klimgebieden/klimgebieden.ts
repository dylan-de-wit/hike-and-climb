import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouteDivider, RouteStop } from '../../../components/route-divider/route-divider';

interface Klimmuur {
  naam: string;
  adres: string;
  omschrijving: string;
  kenmerken: string[];
  mapUrl: string;
  lat: number;
  lng: number;
  kaartUrl: SafeResourceUrl;
}

interface Klimregio {
  naam: string;
  anchor: string;
  eyebrow: string;
  titel: string;
  intro: string;
  muren: Klimmuur[];
}

type FilterCategorie = 'rots' | 'stijl' | 'land' | 'trip';

@Component({
  selector: 'app-klimgebieden',
  host: { class: 'thema-klimmen' },
  imports: [RouteDivider],
  templateUrl: './klimgebieden.html',
  styleUrl: './klimgebieden.scss',
})
export class Klimgebieden {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  zoekterm = '';
  actieveFilters: Record<FilterCategorie, string> = {
    rots: '',
    stijl: '',
    land: '',
    trip: '',
  };

  readonly filterGroepen: { id: FilterCategorie; label: string; opties: string[] }[] = [
    { id: 'rots', label: 'Rots & terrein', opties: ['Kalksteen'] },
    { id: 'stijl', label: 'Klimstijl', opties: ['Sportklimmen', 'Klassieker', 'Lange routes'] },
    { id: 'land', label: 'Land', opties: ['Belgie'] },
    { id: 'trip', label: 'Lengte trip', opties: ['Dagtrip'] },
  ];

  readonly klimregios: Klimregio[] = [
    {
      naam: 'Dinant',
      anchor: 'dinant',
      eyebrow: 'Belgie',
      titel: 'Dinant en omgeving',
      intro:
        'Kalksteen rond de Maasvallei, met compacte sportklimgebieden en klassieke Belgische rotsen binnen rijafstand van elkaar.',
      muren: [
        {
          naam: 'Pont-a-Lesse',
          adres: 'Pont-a-Lesse',
          omschrijving:
            'Toegankelijk gebied bij Dinant, geschikt als overzichtelijke start voor een klimdag in de Maasvallei.',
          kenmerken: ['Kalksteen', 'Sportklimmen', 'Belgie', 'Dagtrip'],
          mapUrl: this.mapUrl(50.22635798645381, 4.912535162566954),
          lat: 50.22635798645381,
          lng: 4.912535162566954,
          kaartUrl: this.kaartUrl(50.22635798645381, 4.912535162566954),
        },
        {
          naam: 'Freyr',
          adres: 'Chau. des Alpinistes 24, 5500 Dinant, Belgium',
          omschrijving:
            'Een van de bekendste Belgische rotsmassieven, met langere lijnen en een klassiek outdoor-karakter.',
          kenmerken: ['Kalksteen', 'Klassieker', 'Belgie', 'Lange routes'],
          mapUrl: this.mapUrl(50.220558493997586, 4.892200298911721),
          lat: 50.220558493997586,
          lng: 4.892200298911721,
          kaartUrl: this.kaartUrl(50.220558493997586, 4.892200298911721),
        },
        {
          naam: 'Durnal',
          adres: '50°19\'33.4"N 4°58\'28.3"E, Belgium',
          omschrijving:
            'Klimlocatie op coordinaat, handig om vooraf exact op kaart te checken voor parkeren en aanloop.',
          kenmerken: ['Kalksteen', 'Sportklimmen', 'Belgie', 'Dagtrip'],
          mapUrl: this.mapUrl(50.32698234739403, 4.974284930944859),
          lat: 50.32698234739403,
          lng: 4.974284930944859,
          kaartUrl: this.kaartUrl(50.32698234739403, 4.974284930944859),
        },
        {
          naam: 'Mozet',
          adres: 'Chau. de Gramptinne 1-7, 5340 Gesves, Belgium',
          omschrijving:
            'Klimgebied bij Gesves, goed te combineren met andere rotsen in de regio als je meerdere dagen plant.',
          kenmerken: ['Kalksteen', 'Sportklimmen', 'Belgie', 'Dagtrip'],
          mapUrl: this.mapUrl(50.45484056845138, 5.009792013421023),
          lat: 50.45484056845138,
          lng: 5.009792013421023,
          kaartUrl: this.kaartUrl(50.45484056845138, 5.009792013421023),
        },
        {
          naam: 'Grands Malades',
          adres: 'Av. des Champs-Elysees 5000, 5000 Namur, Belgium · FV9X+8V',
          omschrijving:
            'Klimlocatie bij Namur, goed als extra stop wanneer je de Maasvallei breder verkent.',
          kenmerken: ['Kalksteen', 'Sportklimmen', 'Belgie', 'Dagtrip'],
          mapUrl: this.mapUrl(50.470264629104896, 4.899815146692775),
          lat: 50.470264629104896,
          lng: 4.899815146692775,
          kaartUrl: this.kaartUrl(50.470264629104896, 4.899815146692775),
        },
        {
          naam: 'Dave',
          adres: '5100 Namur, Belgium · CVGF+JJ',
          omschrijving:
            'Rotsgebied aan de zuidkant van Namur, passend als tweede locatie in dezelfde regionale rij.',
          kenmerken: ['Kalksteen', 'Sportklimmen', 'Belgie', 'Dagtrip'],
          mapUrl: this.mapUrl(50.42752521303033, 4.874139473971461),
          lat: 50.42752521303033,
          lng: 4.874139473971461,
          kaartUrl: this.kaartUrl(50.42752521303033, 4.874139473971461),
        },
        {
          naam: 'Les Praules',
          adres: '5500 Dinant, Belgium',
          omschrijving:
            'Klimlocatie ten zuiden van Dinant, handig als extra optie binnen dezelfde Maasvallei-planning.',
          kenmerken: ['Kalksteen', 'Sportklimmen', 'Belgie', 'Dagtrip'],
          mapUrl: this.mapUrl(50.20833298105062, 4.963846231183126),
          lat: 50.20833298105062,
          lng: 4.963846231183126,
          kaartUrl: this.kaartUrl(50.20833298105062, 4.963846231183126),
        },
      ],
    },
  ];

  /** Secties op déze pagina — de divider springt ernaartoe (tussen containers). */
  readonly secties: RouteStop[] = [
    { naam: 'Waar', anchor: 'waar' },
    ...this.klimregios.map((regio) => ({ naam: regio.naam, anchor: regio.anchor })),
    { naam: 'Check', anchor: 'gebied-check' },
  ];

  actieveSectie = 0;

  get gefilterdeKlimregios(): Klimregio[] {
    const zoekterm = this.zoekterm.trim().toLowerCase();

    return this.klimregios
      .map((regio) => {
        const muren = regio.muren.filter((muur) => {
          const pastBijFilters =
            this.pastBijKenmerk(muur, 'rots') &&
            this.pastBijKenmerk(muur, 'stijl') &&
            this.pastBijLand(regio) &&
            this.pastBijKenmerk(muur, 'trip');
          const tekst = [
            regio.naam,
            regio.titel,
            muur.naam,
            muur.adres,
            muur.omschrijving,
            ...muur.kenmerken,
          ]
            .join(' ')
            .toLowerCase();
          const pastBijZoekterm = !zoekterm || tekst.includes(zoekterm);

          return pastBijFilters && pastBijZoekterm;
        });

        return { ...regio, muren };
      })
      .filter((regio) => regio.muren.length > 0);
  }

  werkZoektermBij(event: Event): void {
    this.zoekterm = (event.target as HTMLInputElement).value;
  }

  get heeftActieveFilters(): boolean {
    return Boolean(this.zoekterm.trim() || Object.values(this.actieveFilters).some(Boolean));
  }

  wisFilters(): void {
    this.zoekterm = '';
    this.actieveFilters = {
      rots: '',
      stijl: '',
      land: '',
      trip: '',
    };
  }

  stelFilterIn(categorie: FilterCategorie, waarde: string, event: Event): void {
    this.actieveFilters = {
      ...this.actieveFilters,
      [categorie]: waarde,
    };
    (event.currentTarget as HTMLElement).closest('details')?.removeAttribute('open');
  }

  sluitAndereFilters(categorie: FilterCategorie, event: Event): void {
    const details = event.currentTarget as HTMLDetailsElement;
    if (!details.open) {
      return;
    }

    const openDropdowns = this.elementRef.nativeElement.querySelectorAll(
      '.klimgebied-filter__dropdown[open]',
    ) as NodeListOf<HTMLDetailsElement>;

    openDropdowns.forEach((anderDetails) => {
        if (anderDetails.dataset['filter'] !== categorie) {
          anderDetails.removeAttribute('open');
        }
      });
  }

  @HostListener('document:click', ['$event'])
  sluitFiltersBijBuitenKlik(event: MouseEvent): void {
    const doel = event.target as HTMLElement | null;
    if (doel?.closest('.klimgebied-filter__dropdown')) {
      return;
    }

    this.sluitOpenFilters();
  }

  private sluitOpenFilters(): void {
    const openDropdowns = this.elementRef.nativeElement.querySelectorAll(
      '.klimgebied-filter__dropdown[open]',
    ) as NodeListOf<HTMLDetailsElement>;

    openDropdowns.forEach((details) => details.removeAttribute('open'));
  }

  private pastBijKenmerk(muur: Klimmuur, categorie: FilterCategorie): boolean {
    const actief = this.actieveFilters[categorie];
    return !actief || muur.kenmerken.includes(actief);
  }

  private pastBijLand(regio: Klimregio): boolean {
    const actief = this.actieveFilters.land;
    return !actief || regio.eyebrow === actief;
  }

  categorieVoorKenmerk(kenmerk: string): FilterCategorie {
    return this.filterGroepen.find((groep) => groep.opties.includes(kenmerk))?.id ?? 'rots';
  }

  private kaartUrl(lat: number, lng: number): SafeResourceUrl {
    const url = `https://maps.google.com/maps?ll=${lat},${lng}&t=p&z=13&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private mapUrl(lat: number, lng: number): string {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
}
