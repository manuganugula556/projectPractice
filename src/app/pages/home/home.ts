import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
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

  currentSlide = 0;

  private slideInterval: ReturnType<typeof setInterval> | null = null;

  slides = [
    {
      image: 'assets/images/Scientist-Photo.jpg',
      title: 'Science & Research',
      description: 'Advancing knowledge through research and innovation.'
    },
    {
      image: 'assets/images/Scientist-Photo1.jpg',
      title: 'Innovation & Discovery',
      description: 'Exploring new ideas and meaningful scientific discoveries.'
    },
    {
      image: 'assets/images/Scientist-Photo2.jpg',
      title: 'Professional Journey',
      description: 'A journey dedicated to science, research and excellence.'
    }
  ];


  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.startAutoSlide();

  }


  ngOnDestroy(): void {

    this.stopAutoSlide();

  }


  startAutoSlide(): void {

    this.stopAutoSlide();

    this.slideInterval = setInterval(() => {

      this.currentSlide =
        (this.currentSlide + 1) % this.slides.length;

      this.changeDetectorRef.detectChanges();

    }, 3000);

  }


  stopAutoSlide(): void {

    if (this.slideInterval !== null) {

      clearInterval(this.slideInterval);

      this.slideInterval = null;

    }

  }


  nextSlide(): void {

    this.currentSlide =
      (this.currentSlide + 1) % this.slides.length;

  }


  previousSlide(): void {

    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) %
      this.slides.length;

  }


  goToSlide(index: number): void {

    this.currentSlide = index;

  }

}