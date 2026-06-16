import { Component } from '@angular/core';
import { RouteDivider, RouteStop } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';

@Component({
  selector: 'app-single-pitch',
  host: { class: 'thema-klimmen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './single-pitch.html',
  styleUrl: './single-pitch.scss',
})
export class SinglePitch {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Kennis', waarde: 'single-pitch' },
    { label: 'Touw', waarde: '60-70 m' },
    { label: 'Niveau', waarde: 'basis' },
    { label: 'Focus', waarde: 'zekeren & ombouwen' },
  ];

  readonly secties: RouteStop[] = [
    { naam: 'Verschil', anchor: 'verschil' },
    { naam: 'Standplaats', anchor: 'standplaats' },
    { naam: 'Ombouwen', anchor: 'ombouwen' },
    { naam: 'Schoonmaken', anchor: 'schoonmaken' },
    { naam: 'Afdalen', anchor: 'afdalen' },
  ];

  actieveSectie = 0;
}
