import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-technieken',
  host: { class: 'thema-kennis' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './technieken.html',
  styleUrl: './technieken.scss',
})
export class KennisTechnieken {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Focus', waarde: 'bewegen' },
    { label: 'Context', waarde: 'wand · trail' },
    { label: 'Tempo', waarde: 'rustig' },
    { label: 'Doel', waarde: 'zekerheid' },
  ];

  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 1;
}
