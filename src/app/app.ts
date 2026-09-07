import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';

@Component({
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('gapco-client');
  protected readonly showNavbar = signal(true);
  protected readonly showFooter = signal(true);

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.updateShellVisibility(this.router.url);

    const routerEvents = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.updateShellVisibility(event.urlAfterRedirects);
      });

    this.destroyRef.onDestroy(() => routerEvents.unsubscribe());
  }

  private isAdminLogin(url: string): boolean {
    return url.split('?')[0].split('#')[0] === '/admin/login';
  }

  private updateShellVisibility(url: string): void {
    const isAdminLogin = this.isAdminLogin(url);
    this.showNavbar.set(!isAdminLogin);
    this.showFooter.set(!isAdminLogin);
  }
}
