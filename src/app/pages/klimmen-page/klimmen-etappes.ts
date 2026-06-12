import { RouteStop } from '../../components/route-divider/route-divider';

/**
 * Het "leerpad" door de klim-subpagina's. Eén bron, gedeeld door alle
 * subpagina's: elke pagina geeft deze lijst mee en zet zijn eigen index
 * als `actief`. De volgorde hier = de volgorde op de route-divider.
 */
export const KLIMMEN_ETAPPES: RouteStop[] = [
  { naam: 'Top-rope & Lead', label: '01 · Basis', link: '/klimmen/toprope-lead' },
  { naam: 'Multi-pitch', label: '02 · Gevorderd', link: '/klimmen/multi-pitch' },
  { naam: 'Materiaal', label: '03 · Gear', link: '/klimmen/materiaal' },
  { naam: 'Klimgebieden', label: '04 · Buiten', link: '/klimmen/klimgebieden' },
];
