import { KruisKeuze, Punt } from './knoop-geometrie';
import knopenJson from './knopen.json';

/** Eén stap in de uitleg; `bij` is de scrub-positie (0..1) waarop de stap actief wordt. */
export interface KnoopStap {
  bij: number;
  titel: string;
  tekst: string;
}

export interface KnoopLabel {
  x: number;
  y: number;
  tekst: string;
}

export type TouwPatroon = 'dunne-strepen' | 'ruitjes' | 'gestipt' | 'dubbele-stippen';

/**
 * Eén knoop als pure data. De vorm zit volledig in `waypoints` (de hartlijn van
 * het touw, van het ene eind naar het andere); de geometrie + kruisingen worden
 * daaruit berekend. `keuzes` overschrijft per kruising welke streng bovenop ligt.
 * Knopen maak/bewerk je in de editor (/kennis/knopen/editor) en plak je hier.
 */
export interface Knoop {
  naam: string;
  ondertitel: string;
  /** Korte beschrijving van de knoop (waarvoor je 'm gebruikt). */
  beschrijving?: string;
  tag: string;
  vbW: number;
  vbH: number;
  /** Hoofdkleur van het touw (hex). Valt terug op het thema-accent. */
  kleur?: string;
  /** Tweede kleur voor de 'flecks' (touw-look). Leeg = effen touw. */
  kleur2?: string;
  /** Eén of twee parallelle strengen in de viewer. */
  strengen?: 1 | 2;
  /** Patroon waarmee kleur2 over het touw ligt. */
  patroon?: TouwPatroon;
  /** Hartlijn van het touw als sleutelpunten. */
  waypoints: Punt[];
  /** Per kruising-index: welke streng over ligt (standaard de late streng). */
  keuzes?: Record<number, KruisKeuze>;
  staandLabel?: KnoopLabel;
  tampLabel?: KnoopLabel;
  stappen: KnoopStap[];
}

/**
 * Alle knopen komen uit `knopen.json` — dat bestand schrijft de editor direct
 * weg (File System Access). Bewerk knopen dus in de editor (/kennis/knopen/editor),
 * niet hier met de hand.
 */
export const KNOPEN: Knoop[] = knopenJson as unknown as Knoop[];

/** De eerste knoop is de standaard voor de viewer. */
export const ACHTKNOOP: Knoop = KNOPEN[0];
