import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { KlimmenPage } from './pages/klimmen-page/klimmen-page';
import { HikenPage } from './pages/hiken-page/hiken-page';
import { BoulderenPage } from './pages/boulderen-page/boulderen-page';
import { KennisPage } from './pages/kennis-page/kennis-page';

// Klimmen sub-pagina's
import { TopropeLead } from './pages/klimmen-page/toprope-lead/toprope-lead';
import { MultiPitch } from './pages/klimmen-page/multi-pitch/multi-pitch';
import { KlimmenMateriaal } from './pages/klimmen-page/materiaal/materiaal';
import { Klimgebieden } from './pages/klimmen-page/klimgebieden/klimgebieden';

// Hiken sub-pagina's
import { RoutesGebieden } from './pages/hiken-page/routes-gebieden/routes-gebieden';
import { NavigatiePlanning } from './pages/hiken-page/navigatie-planning/navigatie-planning';
import { HikenUitrusting } from './pages/hiken-page/uitrusting/uitrusting';
import { MultidayHikes } from './pages/hiken-page/multiday-hikes/multiday-hikes';

// Boulderen sub-pagina's
import { BoulderenTechniek } from './pages/boulderen-page/techniek/techniek';
import { Boulderlocaties } from './pages/boulderen-page/boulderlocaties/boulderlocaties';
import { BoulderenMateriaal } from './pages/boulderen-page/materiaal/materiaal';
import { BoulderenTraining } from './pages/boulderen-page/training/training';

// Kennis sub-pagina's
import { KennisKnopen } from './pages/kennis-page/knopen/knopen';
import { KennisTechnieken } from './pages/kennis-page/technieken/technieken';
import { KennisArtikelen } from './pages/kennis-page/artikelen/artikelen';
import { KennisGidsen } from './pages/kennis-page/gidsen/gidsen';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },

  { path: 'klimmen', component: KlimmenPage },
  { path: 'klimmen/toprope-lead', component: TopropeLead },
  { path: 'klimmen/multi-pitch', component: MultiPitch },
  { path: 'klimmen/materiaal', component: KlimmenMateriaal },
  { path: 'klimmen/klimgebieden', component: Klimgebieden },

  { path: 'hiken', component: HikenPage },
  { path: 'hiken/routes-gebieden', component: RoutesGebieden },
  { path: 'hiken/navigatie-planning', component: NavigatiePlanning },
  { path: 'hiken/uitrusting', component: HikenUitrusting },
  { path: 'hiken/multiday-hikes', component: MultidayHikes },

  { path: 'boulderen', component: BoulderenPage },
  { path: 'boulderen/techniek', component: BoulderenTechniek },
  { path: 'boulderen/boulderlocaties', component: Boulderlocaties },
  { path: 'boulderen/materiaal', component: BoulderenMateriaal },
  { path: 'boulderen/training', component: BoulderenTraining },

  { path: 'kennis', component: KennisPage },
  { path: 'kennis/knopen', component: KennisKnopen },
  { path: 'kennis/technieken', component: KennisTechnieken },
  { path: 'kennis/artikelen', component: KennisArtikelen },
  { path: 'kennis/gidsen', component: KennisGidsen },
];
