import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-terminologie',
  host: { class: 'thema-kennis' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './terminologie.html',
  styleUrl: './terminologie.scss',
})
export class KennisTerminologie {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Type', waarde: 'woordenlijst' },
    { label: 'Focus', waarde: 'klimtaal' },
    { label: 'Gebruik', waarde: 'naslag' },
    { label: 'Niveau', waarde: 'basis' },
  ];

  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 2;
}
