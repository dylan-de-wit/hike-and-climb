import { Component, input } from '@angular/core';

export interface VeldItem {
  label: string;
  waarde: string;
}

@Component({
  selector: 'app-veldstrip',
  imports: [],
  templateUrl: './veldstrip.html',
  styleUrl: './veldstrip.scss',
})
export class Veldstrip {
  readonly kicker = input('Veldgegevens');

  readonly items = input<VeldItem[]>([]);

  readonly meta = input<string | null>(null);
}
