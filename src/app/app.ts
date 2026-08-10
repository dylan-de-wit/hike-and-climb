import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavigationMenu } from './components/navigation-menu/navigation-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(router: Router) {
    router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const anker = event.urlAfterRedirects.split('#')[1];
        if (anker) {
          this.scrollNaarAnker(decodeURIComponent(anker));
        } else {
          this.scrollToTop();
        }
      });
  }

  /**
   * Handmatige anker-scroll: deze app draait zonder zone.js, waardoor Angular's
   * ingebouwde anchorScrolling (die op zone-stabilisatie leunt) niet betrouwbaar
   * scrolt. Zelfde rAF/timeout-retrypatroon als scrollToTop hieronder.
   */
  private scrollNaarAnker(id: string): void {
    const ga = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    requestAnimationFrame(() => {
      ga();
      requestAnimationFrame(ga);
    });
    setTimeout(ga, 100);
  }

  private scrollToTop(): void {
    const scroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scroll();
    requestAnimationFrame(() => {
      scroll();
      requestAnimationFrame(scroll);
    });
    setTimeout(scroll, 50);
  }
}
