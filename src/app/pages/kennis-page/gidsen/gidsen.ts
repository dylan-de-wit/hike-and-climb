import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-gidsen',
  host: { class: 'thema-kennis' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './gidsen.html',
  styleUrl: './gidsen.scss',
})
export class KennisGidsen {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Bestand', waarde: 'PDF' },
    { label: 'Gebruik', waarde: 'offline' },
    { label: 'Niveau', waarde: 'basis+' },
    { label: 'Update', waarde: '2026' },
  ];

  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 3;
}
