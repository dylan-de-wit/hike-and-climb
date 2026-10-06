import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { NATUUR_ETAPPES } from '../natuur-etappes';

@Component({
  selector: 'app-bushcraft',
  host: { class: 'thema-natuur' },
  imports: [RouteDivider],
  templateUrl: './bushcraft.html',
})
export class Bushcraft {
  readonly etappes = NATUUR_ETAPPES;
  readonly actief = 2;
}
