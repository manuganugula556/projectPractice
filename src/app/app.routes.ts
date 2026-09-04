import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { GalleryComponent } from './pages/gallery/gallery';
import { ContactComponent } from './pages/contact/contact';

import { LoginComponent } from './admin/login/login';
import { DashboardComponent } from './admin/dashboard/dashboard';
import { ResearchComponent } from './pages/research/research';
import { authGuard } from './auth.guard';

export const routes: Routes = [

  // Public pages
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent   
  },
  {
  path: 'research',
  component: ResearchComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },

  // Admin pages
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
  path: 'admin/dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
},

  // Unknown URL → Home
  {
    path: '**',
    redirectTo: ''
  },


];