import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { KLIMMEN_ETAPPES } from '../klimmen-etappes';

@Component({
  selector: 'app-klimmen-materiaal',
  host: { class: 'thema-klimmen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './materiaal.html',
  styleUrl: './materiaal.scss',
})
export class KlimmenMateriaal {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Set', waarde: 'helm · gordel' },
    { label: 'Touw', waarde: 'dynamisch' },
    { label: 'Rack', waarde: 'setjes' },
    { label: 'Check', waarde: 'partner' },
  ];

  readonly etappes = KLIMMEN_ETAPPES;
  readonly actief = 2;
}
