import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
selector: 'app-awards',
standalone: true,
imports: [RouterLink],
templateUrl: './awards.html',
styleUrl: './awards.css'
})
export class AwardsComponent {

awards = [

{
  number: '01',
  year: 'YEAR',
  title: 'Award / Recognition Title',
  organization: 'Organization / Institution',
  description:
    'Details about the award, recognition and the contribution or achievement for which it was received.'
},

{
  number: '02',
  year: 'YEAR',
  title: 'Scientific Achievement',
  organization: 'Organization / Institution',
  description:
    'Recognition received for scientific research, innovation, technical contribution or professional achievement.'
},

{
  number: '03',
  year: 'YEAR',
  title: 'Research Excellence',
  organization: 'Organization / Institution',
  description:
    'Recognition highlighting contribution to research, scientific development and innovation.'
}


];

recognitionAreas = [

{
  number: '01',
  title: 'Scientific Research',
  description:
    'Recognition for contributions to scientific research and investigation.'
},

{
  number: '02',
  title: 'Innovation',
  description:
    'Achievements related to innovative ideas, technologies and practical solutions.'
},

{
  number: '03',
  title: 'Professional Excellence',
  description:
    'Professional accomplishments and contributions to the scientific community.'
},

{
  number: '04',
  title: 'Knowledge Contribution',
  description:
    'Contributions toward knowledge sharing, publications and scientific development.'
}


];

// =====================================================
// AWARDS GALLERY
// Update these image paths later
// =====================================================

awardImages = [

{
  path: 'assets/images/about/Awards/Certificate4.jpg',
  title: 'Award 1'
},

{
  path: 'assets/images/about/Awards/Certificate5.jpg',
  title: 'Award 2'
},

{
  path: 'assets/images/about/Awards/Certificate6.jpg',
  title: 'Award 3'
},

{
  path: 'assets/images/about/Awards/Certificate7.jpg',
  title: 'Award 4'
},

{
  path: 'assets/images/about/Awards/Certificate1.jpg',
  title: 'Award 4'
},

{
  path: 'assets/images/about/Awards/Certificate2.jpg',
  title: 'Award 4'
},

{
  path: 'assets/images/about/Awards/Certificate3.jpg',
  title: 'Award 4'
}

];

// =====================================================
// IMAGE POPUP
// =====================================================

selectedAwardImage: string | null = null;

openAwardImage(image: string): void {
this.selectedAwardImage = image;
}

closeAwardImage(): void {
this.selectedAwardImage = null;
}

}
