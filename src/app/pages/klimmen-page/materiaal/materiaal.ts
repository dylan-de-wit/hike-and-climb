import { Component } from '@angular/core';
import { RouteDivider, RouteStop } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';

@Component({
  selector: 'app-klimmen-materiaal',
  host: { class: 'thema-klimmen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './materiaal.html',
  styleUrl: './materiaal.scss',
})
export class KlimmenMateriaal {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Basis gear', waarde: '8 items' },
    { label: 'Touw', waarde: 'minstens 1' },
    { label: 'Budget', waarde: '€€+' },
    { label: 'Check', waarde: 'partner' },
  ];

  readonly secties: RouteStop[] = [
    { naam: 'Touwen', anchor: 'touwen' },
    { naam: 'Zekering', anchor: 'zekering' },
    { naam: 'Persoonlijk', anchor: 'persoonlijk' },
    { naam: 'Starten', anchor: 'starten' },
  ];

  actieveSectie = 0;
}
