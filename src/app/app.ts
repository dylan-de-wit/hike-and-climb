import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NavigationMenu } from './components/navigation-menu/navigation-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
