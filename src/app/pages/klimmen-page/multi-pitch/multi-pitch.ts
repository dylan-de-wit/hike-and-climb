import { Component } from '@angular/core';
import { RouteDivider, RouteStop } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';

@Component({
  selector: 'app-multi-pitch',
  host: { class: 'thema-klimmen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './multi-pitch.html',
  styleUrl: './multi-pitch.scss',
})
export class MultiPitch {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Route lengte', waarde: '1+ pitches' },
    { label: 'Niveau', waarde: 'gevorderd' },
    { label: 'Tijd', waarde: '½ – hele dag' },
    { label: 'Focus', waarde: 'Ombouwen, abseilen & noodreddingen' },
  ];

  readonly secties: RouteStop[] = [
    { naam: 'Anders', anchor: 'anders' },
    { naam: 'Standplaats', anchor: 'standplaats' },
    { naam: 'Zekeren', anchor: 'zekeren' },
    { naam: 'Prusiken', anchor: 'prusiken' },
    { naam: 'Noodredding', anchor: 'noodredding' },
  ];

  actieveSectie = 0;
}
