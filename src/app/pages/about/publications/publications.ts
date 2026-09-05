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

  publications = [
    {
      number: '01',
      year: 'YEAR',
      title: 'Research Publication Title',
      journal: 'Journal / Publication Name',
      category: 'RESEARCH PAPER',
      description:
        'Brief description of the research publication, its subject area and contribution to scientific knowledge.'
    },
    {
      number: '02',
      year: 'YEAR',
      title: 'Scientific Research Paper',
      journal: 'Journal / Publication Name',
      category: 'SCIENTIFIC PAPER',
      description:
        'Brief overview of the research work, methodology, findings and scientific significance.'
    },
    {
      number: '03',
      year: 'YEAR',
      title: 'Innovation & Technology Study',
      journal: 'Journal / Publication Name',
      category: 'TECHNOLOGY',
      description:
        'Research contribution focused on technology, innovation and practical applications.'
    }
  ];

  publicationTypes = [
    {
      number: '01',
      title: 'Research Papers',
      icon: '🔬',
      description:
        'Scientific research papers documenting investigation, analysis and findings.'
    },
    {
      number: '02',
      title: 'Technical Publications',
      icon: '⚙️',
      description:
        'Technical contributions covering engineering, technology and practical applications.'
    },
    {
      number: '03',
      title: 'Innovation Studies',
      icon: '💡',
      description:
        'Studies and publications exploring innovative ideas and technological development.'
    },
    {
      number: '04',
      title: 'Knowledge Sharing',
      icon: '📚',
      description:
        'Contributions that support knowledge sharing and scientific communication.'
    }
  ];

}
