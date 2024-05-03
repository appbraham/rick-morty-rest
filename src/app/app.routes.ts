import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./shared/page/home-page/home-page.component').then( c => c.HomePageComponent ),
  },
  {
    path:'character/:id',
    loadComponent: () => import('./character/page/character-page/character-page.component').then( c => c.CharacterPageComponent ),
  },
  {
    path:'not-found',
    loadComponent: () => import('./shared/page/not-found-page/not-found-page.component').then( c => c.NotFoundPageComponent ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
