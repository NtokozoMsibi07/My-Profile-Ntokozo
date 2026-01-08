import { Routes } from '@angular/router';

import { Home } from './sections/home/home';
import { About } from './sections/about/about';
import { Projects } from './sections/projects/projects';
import { Contacts } from './sections/contacts/contacts';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'contacts', component: Contacts },
];
