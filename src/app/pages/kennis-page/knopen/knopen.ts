import { Component } from '@angular/core';
import { KnoopViewer } from '../../../components/knoop-viewer/knoop-viewer';
import { KNOPEN, Knoop } from '../../../components/knoop-viewer/knopen-data';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-knopen',
  host: { class: 'thema-kennis' },
  imports: [Veldstrip, RouteDivider, KnoopViewer],
  templateUrl: './knopen.html',
  styleUrl: './knopen.scss',
})
export class KennisKnopen {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Type', waarde: 'basis' },
    { label: 'Gebruik', waarde: 'zekeren' },
    { label: 'Check', waarde: 'dubbel' },
    { label: 'Oefenen', waarde: 'droog' },
  ];

  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 0;
  readonly knopen = KNOPEN;
  readonly knoopBlokken: (Knoop | null)[] = Array.from(
    { length: Math.max(9, KNOPEN.length) },
    (_, index) => KNOPEN[index] ?? null,
  );
}
