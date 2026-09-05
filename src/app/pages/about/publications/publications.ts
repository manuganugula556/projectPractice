import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
selector: 'app-publications',
standalone: true,
imports: [RouterLink],
templateUrl: './publications.html',
styleUrl: './publications.css'
})
export class PublicationsComponent {

// =====================================================
// PUBLICATIONS
// =====================================================

publications = [
{
number: '01',
year: 'YEAR',
title: 'Research Publication Title',
journal: 'Journal / Publication Name',
description:
'Details about the research publication, scientific study, findings and contribution to the field.'
},

{
  number: '02',
  year: 'YEAR',
  title: 'Scientific Research Study',
  journal: 'Journal / Publication Name',
  description:
    'Research work focused on scientific investigation, innovation and practical applications.'
},

{
  number: '03',
  year: 'YEAR',
  title: 'Innovation & Technology Research',
  journal: 'Journal / Publication Name',
  description:
    'Publication highlighting innovative ideas, technological development and research findings.'
}

];

// =====================================================
// PUBLICATION AREAS
// =====================================================

publicationAreas = [
{
number: '01',
title: 'Scientific Research',
description:
'Research publications covering scientific investigation, experimentation and discovery.'
},

{
  number: '02',
  title: 'Innovation',
  description:
    'Published work related to innovative ideas, technologies and practical solutions.'
},

{
  number: '03',
  title: 'Engineering & Technology',
  description:
    'Research and technical publications related to engineering, energy and technological development.'
},

{
  number: '04',
  title: 'Knowledge Contribution',
  description:
    'Contributions toward scientific knowledge, research documentation and knowledge sharing.'
}

];

// =====================================================
// PUBLICATION IMAGES
// =====================================================

publicationImages = [


{
  path: 'assets/images/about/Publications/Publication2.JPG',
  title: 'Publication 2'
},

{
  path: 'assets/images/about/Publications/Publication3.jpg',
  title: 'Publication 3'
},

{
  path: 'assets/images/about/Publications/Publication4.jpg',
  title: 'Publication 4'
},

{
  path: 'assets/images/about/Publications/Publication5.jpg',
  title: 'Publication 4'
},

{
path: 'assets/images/about/Publications/Publication1.jpg',
title: 'Publication 1'
},





];

// =====================================================
// IMAGE MODAL
// =====================================================

selectedPublicationImage: string | null = null;

openPublicationImage(image: string): void {
this.selectedPublicationImage = image;
}

closePublicationImage(): void {
this.selectedPublicationImage = null;
}
}
