import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  inject
} from '@angular/core';


export const authGuard: CanActivateFn = () => {

  const router = inject(Router);


  // ==========================================
  // CHECK LOGIN
  // ==========================================

  const token =
    sessionStorage.getItem('token');

  const role =
    sessionStorage.getItem('role');


  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!token || role !== 'Admin') {

    return router.createUrlTree([
      '/admin/login'
    ]);

  }


  // ==========================================
  // ALLOW NAVIGATION IMMEDIATELY AFTER LOGIN
  // ==========================================

  const justLoggedIn =
    sessionStorage.getItem(
      'justLoggedIn'
    );


  if (justLoggedIn === 'true') {

    // Remove the flag after using it

    sessionStorage.removeItem(
      'justLoggedIn'
    );

    return true;

  }


  // ==========================================
  // CHECK BROWSER REFRESH
  // ==========================================

  const navigationEntries =
    performance.getEntriesByType(
      'navigation'
    ) as PerformanceNavigationTiming[];


  const navigationType =
    navigationEntries.length > 0
      ? navigationEntries[0].type
      : 'navigate';


  // ==========================================
  // REFRESH DETECTED
  // ==========================================

  if (navigationType === 'reload') {

    sessionStorage.removeItem('token');

    sessionStorage.removeItem('role');

    sessionStorage.removeItem('fullName');

    sessionStorage.removeItem('justLoggedIn');


    return router.createUrlTree([
      '/admin/login'
    ]);

  }


  // ==========================================
  // NORMAL NAVIGATION
  // ==========================================

  return true;

};
