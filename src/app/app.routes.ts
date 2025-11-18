import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './views/home/home';
import { Search } from './views/search/search';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
        title: 'Reproductor'
      },
      {
        path: 'search/:query',
        component: Search,
        title: 'Búsqueda'
      }
    ]
  }
];