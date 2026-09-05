import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-research-experience',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './research-experience.html',
  styleUrl: './research-experience.css'
})
export class ResearchExperienceComponent {

  researchAreas = [
    {
      number: '01',
      title: 'Scientific Research',
      description:
        'Research focused on scientific investigation, experimentation and developing practical solutions to complex problems.'
    },
    {
      number: '02',
      title: 'Innovation & Technology',
      description:
        'Exploration of innovative technologies and ideas that can contribute to practical applications and technological advancement.'
    },
    {
      number: '03',
      title: 'Engineering Applications',
      description:
        'Application of engineering principles, technical knowledge and analytical methods to real-world challenges.'
    },
    {
      number: '04',
      title: 'Sustainable Development',
      description:
        'Research and innovation aimed at improving efficiency, resource utilization and sustainable technological development.'
    }
  ];

  researchProjects = [
    {
      number: '01',
      title: 'Research & Development',
      category: 'R&D',
      description:
        'Research activities involving investigation, experimentation, analysis and development of innovative concepts.'
    },
    {
      number: '02',
      title: 'Technical Innovation',
      category: 'INNOVATION',
      description:
        'Development and exploration of technical ideas with a focus on practical implementation and problem solving.'
    },
    {
      number: '03',
      title: 'Applied Research',
      category: 'APPLICATION',
      description:
        'Applying scientific and technical knowledge to practical challenges and developing useful solutions.'
    }
  ];

  researchPrinciples = [
    'Scientific Investigation',
    'Experimental Analysis',
    'Innovation',
    'Problem Solving',
    'Technical Development',
    'Knowledge Sharing'
  ];

}
