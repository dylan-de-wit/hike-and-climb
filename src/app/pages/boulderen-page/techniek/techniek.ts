import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { BOULDEREN_ETAPPES } from '../boulderen-etappes';

@Component({
  selector: 'app-boulderen-techniek',
  host: { class: 'thema-boulderen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './techniek.html',
  styleUrl: './techniek.scss',
})
export class BoulderenTechniek {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Focus', waarde: 'voetenwerk' },
    { label: 'Stijl', waarde: 'balans' },
    { label: 'Grip', waarde: 'slopers' },
    { label: 'Niveau', waarde: 'basis' },
  ];

  readonly etappes = BOULDEREN_ETAPPES;
  readonly actief = 0;
}
