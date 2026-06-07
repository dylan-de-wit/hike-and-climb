import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-angular-placeholder',
  imports: [],
  templateUrl: './angular-placeholder.html',
  styleUrl: './angular-placeholder.scss',
})
export class AngularPlaceholder {
  protected readonly title = signal('Hike&Climb')
}
