import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'home-page',
    title: 'Home Page',
    loadComponent: () => import('./shared/page/home-page/home-page.component').then( c => c.HomePageComponent ),
  },
  {
    path:'character/:id',
    title: 'Character Page',
    loadComponent: () => import('./character/page/character-page/character-page.component').then( c => c.CharacterPageComponent ),
  },
  {
    path:'not-found',
    title: 'Not Found',
    loadComponent: () => import('./shared/page/not-found-page/not-found-page.component').then( c => c.NotFoundPageComponent ),
  },
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
