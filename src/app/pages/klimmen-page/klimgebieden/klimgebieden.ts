import { Component } from '@angular/core';
import { RouteDivider, RouteStop } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';

@Component({
  selector: 'app-klimgebieden',
  host: { class: 'thema-klimmen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './klimgebieden.html',
  styleUrl: './klimgebieden.scss',
})
export class Klimgebieden {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Rots', waarde: 'kalk · tuf' },
    { label: 'Seizoen', waarde: 'voorjaar' },
    { label: 'Aanloop', waarde: '10-35 min' },
    { label: 'Routes', waarde: 'sport' },
  ];

  /** Secties op déze pagina — de divider springt ernaartoe (tussen containers). */
  readonly secties: RouteStop[] = [
    { naam: 'Overzicht', anchor: 'overzicht' },
    { naam: 'Gebieden', anchor: 'gebieden' },
    { naam: 'Seizoen', anchor: 'seizoen' },
    { naam: 'Tips', anchor: 'tips' },
  ];

  actieveSectie = 0;
}
