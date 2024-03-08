import { Component } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherAirplay, featherFilePlus, featherEdit, featherXSquare, featherCheckSquare, featherPlusSquare } from '@ng-icons/feather-icons';
import { heroUsers, heroCog6Tooth } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  viewProviders: [provideIcons({ featherAirplay, heroUsers, featherFilePlus, featherEdit, featherXSquare, featherCheckSquare, featherPlusSquare, heroCog6Tooth })]
})
export class AppComponent {
  title = 'techx';
}
