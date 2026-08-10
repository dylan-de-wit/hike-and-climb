import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { HIKEN_ETAPPES } from '../hiken-etappes';

@Component({
  selector: 'app-routes-gebieden',
  host: { class: 'thema-hiken' },
  imports: [RouteDivider],
  templateUrl: './routes-gebieden.html',
  styleUrl: './routes-gebieden.scss',
})
export class RoutesGebieden {
  readonly etappes = HIKEN_ETAPPES;
  readonly actief = 0;
}
