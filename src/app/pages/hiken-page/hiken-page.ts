import { Component } from '@angular/core';
import { RouteDivider } from '../../components/route-divider/route-divider';
import { HIKEN_ETAPPES } from './hiken-etappes';

@Component({
  selector: 'app-hiken-page',
  host: { class: 'thema-hiken' },
  imports: [RouteDivider],
  templateUrl: './hiken-page.html',
  styleUrl: './hiken-page.scss',
})
export class HikenPage {
  readonly etappes = HIKEN_ETAPPES;
  readonly actief = -1;
}
