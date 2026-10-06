import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavigationMenu } from './components/navigation-menu/navigation-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NavigationMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly currentYear = new Date().getFullYear();

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
