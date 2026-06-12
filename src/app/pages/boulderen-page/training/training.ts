import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { BOULDEREN_ETAPPES } from '../boulderen-etappes';

@Component({
  selector: 'app-boulderen-training',
  host: { class: 'thema-boulderen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './training.html',
  styleUrl: './training.scss',
})
export class BoulderenTraining {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Sessies', waarde: '2-3 p/w' },
    { label: 'Focus', waarde: 'kracht + flow' },
    { label: 'Rust', waarde: '48 uur' },
    { label: 'Doel', waarde: 'project' },
  ];

  readonly etappes = BOULDEREN_ETAPPES;
  readonly actief = 3;
}
