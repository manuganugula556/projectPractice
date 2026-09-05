import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { ResearchComponent } from './pages/research/research';
import { GalleryComponent } from './pages/gallery/gallery';
import { ContactComponent } from './pages/contact/contact';

import { EducationComponent } from './pages/about/education/education';
import { AwardsComponent } from './pages/about/awards/awards';
import { PublicationsComponent } from './pages/about/publications/publications';

import { LoginComponent } from './admin/login/login';
import { DashboardComponent } from './admin/dashboard/dashboard';
import { authGuard } from './auth.guard';

export const routes: Routes = [

  // =====================================================
  // MAIN PAGES
  // =====================================================

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  // =====================================================
  // ABOUT SUB-PAGES
  // =====================================================

  {
    path: 'about/education',
    component: EducationComponent
  },

  {
    path: 'about/awards',
    component: AwardsComponent
  },

  {
    path: 'about/publications',
    component: PublicationsComponent
  },

  // =====================================================
  // OTHER PAGES
  // =====================================================

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

  // =====================================================
  // ADMIN
  // =====================================================

  {
    path: 'admin/login',
    component: LoginComponent
  },

  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  // =====================================================
  // FALLBACK
  // =====================================================

  {
    path: '**',
    redirectTo: ''
  }

];
