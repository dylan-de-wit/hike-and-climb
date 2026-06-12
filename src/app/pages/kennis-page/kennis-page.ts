import { Component } from '@angular/core';
import { RouteDivider } from '../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../components/veldstrip/veldstrip';
import { KENNIS_ETAPPES } from './kennis-etappes';

@Component({
  selector: 'app-kennis-page',
  host: { class: 'thema-kennis' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './kennis-page.html',
  styleUrl: './kennis-page.scss',
})
export class KennisPage {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Focus', waarde: 'Skills' },
    { label: 'Niveau', waarde: 'basis → verdiepend' },
    { label: 'Gebruik', waarde: 'veld & wand' },
    { label: 'Type', waarde: 'gidsen · verhalen' },
  ];

  readonly etappes = KENNIS_ETAPPES;
  readonly actief = -1;
}
