import { Component } from '@angular/core';
import { KnoopViewer } from '../../../components/knoop-viewer/knoop-viewer';
import { KNOPEN, Knoop } from '../../../components/knoop-viewer/knopen-data';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-knopen',
  host: { class: 'thema-kennis' },
  imports: [RouteDivider, KnoopViewer],
  templateUrl: './knopen.html',
  styleUrl: './knopen.scss',
})
export class KennisKnopen {
  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 0;
  readonly knopen = KNOPEN;
  readonly knoopBlokken: (Knoop | null)[] = Array.from(
    { length: Math.max(9, KNOPEN.length) },
    (_, index) => KNOPEN[index] ?? null,
  );
}
