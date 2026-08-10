import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { BOULDEREN_ETAPPES } from '../boulderen-etappes';

@Component({
  selector: 'app-boulderen-training',
  host: { class: 'thema-boulderen' },
  imports: [RouteDivider],
  templateUrl: './training.html',
  styleUrl: './training.scss',
})
export class BoulderenTraining {
  readonly etappes = BOULDEREN_ETAPPES;
  readonly actief = 3;
}
