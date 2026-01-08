import { Component } from '@angular/core';
import { Home } from './sections/home/home';
import { About } from './sections/about/about';
import { Projects } from './sections/projects/projects';
import { Contacts } from './sections/contacts/contacts';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [Home, About, Projects, Contacts],
})
export class App {}
