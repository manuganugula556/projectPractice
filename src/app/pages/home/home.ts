import {
Component,
ChangeDetectorRef,
ElementRef,
OnDestroy,
AfterViewInit,
ViewChild
} from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
selector: 'app-home',

standalone: true,

imports: [
RouterLink
],

templateUrl: './home.html',

styleUrl: './home.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {

/* =====================================================
CHANGE DETECTOR
===================================================== */

constructor(
private cdr: ChangeDetectorRef
) {}

/* =====================================================
HERO CAROUSEL
===================================================== */

currentSlide = 0;

private slideInterval?: ReturnType<typeof setInterval>;

slides = [

{
  image: 'assets/images/Gapcoindia-Logo.png',
  title: 'Science & Research',
  description:
    'Advancing knowledge through research and innovation.'
},

{
  image: 'assets/images/Scientist-Photo1.jpg',
  title: 'Innovation & Discovery',
  description:
    'Exploring new ideas and meaningful scientific discoveries.'
},

{
  image: 'assets/images/Scientist-Photo2.jpg',
  title: 'Professional Journey',
  description:
    'A journey dedicated to science, research and excellence.'
}

];

/* =====================================================
FEATURE CARD FLIP
===================================================== */

flippedCard: number | null = null;

toggleCard(index: number): void {

if (this.flippedCard === index) {

  this.flippedCard = null;

} else {

  this.flippedCard = index;

}


}

/* =====================================================
GALLERY
===================================================== */

@ViewChild('photoTrack')
photoTrack!: ElementRef<HTMLDivElement>;

/* =====================================================
VIEW INITIALIZED
===================================================== */

ngAfterViewInit(): void {


/*
 * Start the carousel only after Angular has
 * completely initialized the Home page view.
 */
setTimeout(() => {

  this.startCarousel();

  this.cdr.detectChanges();

}, 100);


}

/* =====================================================
START CAROUSEL
===================================================== */

private startCarousel(): void {

/*
 * Prevent multiple timers from being created.
 */
if (this.slideInterval) {

  clearInterval(this.slideInterval);

}

this.slideInterval = setInterval(() => {

  this.currentSlide =
    (this.currentSlide + 1) %
    this.slides.length;

  this.cdr.detectChanges();

}, 3000);


}

/* =====================================================
RESTART CAROUSEL
===================================================== */

private restartCarousel(): void {

if (this.slideInterval) {

  clearInterval(this.slideInterval);

  this.slideInterval = undefined;

}

this.startCarousel();

}

/* =====================================================
NEXT SLIDE
===================================================== */

nextSlide(
restartTimer: boolean = true
): void {

this.currentSlide =
  (this.currentSlide + 1) %
  this.slides.length;

this.cdr.detectChanges();

if (restartTimer) {

  this.restartCarousel();

}


}

/* =====================================================
PREVIOUS SLIDE
===================================================== */

previousSlide(): void {


this.currentSlide =
  (this.currentSlide - 1 + this.slides.length) %
  this.slides.length;

this.cdr.detectChanges();

this.restartCarousel();

}

/* =====================================================
GO TO SLIDE
===================================================== */

goToSlide(index: number): void {


if (
  index < 0 ||
  index >= this.slides.length
) {

  return;

}

this.currentSlide = index;

this.cdr.detectChanges();

this.restartCarousel();

}

/* =====================================================
GALLERY NEXT
===================================================== */

nextGalleryPhoto(): void {

if (!this.photoTrack) {

  return;

}

this.photoTrack.nativeElement.scrollBy({

  left: 350,

  behavior: 'smooth'

});

}

/* =====================================================
GALLERY PREVIOUS
===================================================== */

previousGalleryPhoto(): void {

if (!this.photoTrack) {

  return;

}

this.photoTrack.nativeElement.scrollBy({

  left: -350,

  behavior: 'smooth'

});

}

/* =====================================================
DESTROY
===================================================== */

ngOnDestroy(): void {

if (this.slideInterval) {

  clearInterval(this.slideInterval);

  this.slideInterval = undefined;

}

}

}
