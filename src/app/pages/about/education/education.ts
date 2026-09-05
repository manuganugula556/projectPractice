import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class EducationComponent {

  educationItems = [
    {
      year: '1964-1975',
      qualification: 'Diploma',
      institution: 'Gandhi Garam High School',
      specialization: 'Electrical and Electronics Engineering',
      description:
        'Activities and societies: I have solely invented Free Energy Power Generation for Farmers. Pascal Bore, Accented Bore well Which works on Four Energies like Wind, Chemical, Grid, Solar based. Generate your own Energy by doing morning workouts. Movable Traffic Signaling system. Stabled water Power Generation.'
    },
    // {
    //   year: 'Academic Period',
    //   qualification: 'Advanced Studies',
    //   institution: 'Institution Name',
    //   specialization: 'Research & Development',
    //   description:
    //     'Details about advanced studies, specialized education and areas of academic interest.'
    // },
    {
      year: '1985-Present',
      qualification: 'Projects',
      // institution: 'Institution Name',
      specialization: 'Green Energy',
      description:
        'Which can generate with less resources and Purely Natural resources link Wind, water, Solar.. etc.'
    }
  ];

}
