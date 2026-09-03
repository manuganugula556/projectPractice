import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {


  // =========================
  // HERO CAROUSEL
  // =========================

  currentSlide = 0;


  private slideInterval:
    ReturnType<typeof setInterval> | null = null;


  slides = [

    {
      image: 'assets/images/Scientist-Photo.jpg',

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


  // =========================
  // GALLERY
  // =========================

  @ViewChild('photoTrack')
  photoTrack!: ElementRef<HTMLDivElement>;


  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.startAutoSlide();

  }


  // =========================
  // DESTROY
  // =========================

  ngOnDestroy(): void {

    this.stopAutoSlide();

  }


  // =========================
  // HERO AUTO SLIDE
  // =========================

  startAutoSlide(): void {

    this.stopAutoSlide();


    this.slideInterval = setInterval(() => {

      this.currentSlide =
        (this.currentSlide + 1) %
        this.slides.length;


      this.changeDetectorRef.detectChanges();

    }, 3000);

  }


  // =========================
  // STOP AUTO SLIDE
  // =========================

  stopAutoSlide(): void {

    if (this.slideInterval !== null) {

      clearInterval(this.slideInterval);

      this.slideInterval = null;

    }

  }


  // =========================
  // HERO NEXT
  // =========================

  nextSlide(): void {

    this.currentSlide =
      (this.currentSlide + 1) %
      this.slides.length;

  }


  // =========================
  // HERO PREVIOUS
  // =========================

  previousSlide(): void {

    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) %
      this.slides.length;

  }


  // =========================
  // HERO DOT
  // =========================

  goToSlide(index: number): void {

    this.currentSlide = index;

  }


  // =========================
  // GALLERY NEXT
  // =========================

  nextGalleryPhoto(): void {

    if (!this.photoTrack) {
      return;
    }


    const track =
      this.photoTrack.nativeElement;


    track.scrollBy({

      left: 350,

      behavior: 'smooth'

    });

  }


  // =========================
  // GALLERY PREVIOUS
  // =========================

  previousGalleryPhoto(): void {

    if (!this.photoTrack) {
      return;
    }


    const track =
      this.photoTrack.nativeElement;


    track.scrollBy({

      left: -350,

      behavior: 'smooth'

    });

  }

}