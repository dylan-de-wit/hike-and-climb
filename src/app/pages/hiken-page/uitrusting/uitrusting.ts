import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { HIKEN_ETAPPES } from '../hiken-etappes';

@Component({
  selector: 'app-hiken-uitrusting',
  host: { class: 'thema-hiken' },
  imports: [RouteDivider],
  templateUrl: './uitrusting.html',
})
export class HikenUitrusting {
  readonly etappes = HIKEN_ETAPPES;
  readonly actief = 2;
}
