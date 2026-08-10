import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { HIKEN_ETAPPES } from '../hiken-etappes';

@Component({
  selector: 'app-multiday-hikes',
  host: { class: 'thema-hiken' },
  imports: [RouteDivider],
  templateUrl: './multiday-hikes.html',
  styleUrl: './multiday-hikes.scss',
})
export class MultidayHikes {
  readonly etappes = HIKEN_ETAPPES;
  readonly actief = 3;
}
