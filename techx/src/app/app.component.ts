import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherAirplay, featherCheckSquare, featherEdit, featherFilePlus, featherPlusSquare, featherXSquare } from '@ng-icons/feather-icons';
import { heroCog6Tooth, heroUsers } from '@ng-icons/heroicons/outline';

import { TodoComponent } from './components/todo/todo.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  host: {ngSkipHydration: 'true'},
  imports: [NgIconComponent, FormsModule, TodoComponent, HttpClientModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  viewProviders: [provideIcons({ featherAirplay, heroUsers, featherFilePlus, featherEdit, featherXSquare, featherCheckSquare, featherPlusSquare, heroCog6Tooth })]
})
export class AppComponent {
  title = 'techx';
}
