import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './research.html',
  styleUrl: './research.css'
})
export class ResearchComponent {

  activeCard: number | null = null;

  selectedResearch: any = null;


  researchAreas = [

    {
      number: '01',
      icon: '⚡',
      image: 'assets/images/ElectricitySave.JPG',
      title: 'Power Conservation',
      shortText:
        'Research focused on reducing energy consumption and improving power efficiency.',
      fullText:
        'Power conservation focuses on developing practical approaches to reduce unnecessary energy consumption and improve the efficiency with which electrical power is generated, distributed and utilized.'
    },

    {
      number: '02',
      icon: '⚙',
      image: 'assets/images/Electricity.JPG',
      title: 'Electrical Engineering',
      shortText:
        'Innovative electrical concepts designed for efficient and sustainable applications.',
      fullText:
        'Electrical engineering research explores innovative concepts for improving electrical systems, energy utilization and overall system efficiency.'
    },

    {
      number: '03',
      icon: '🔧',
      image: 'assets/images/Budhhastatue.JPG',
      title: 'Mechanical Innovation',
      shortText:
        'Engineering solutions that improve performance, efficiency and usability.',
      fullText:
        'Mechanical innovation combines engineering principles, design thinking and practical experimentation to create useful engineering solutions.'
    },

    {
      number: '04',
      icon: '🌱',
      image: 'assets/images/PumpsetMotor.JPG',
      title: 'Sustainable Technology',
      shortText:
        'Technology and innovation with long-term environmental and social value.',
      fullText:
        'Sustainable technology focuses on developing solutions that balance technological advancement with responsible resource utilization and long-term sustainability.'
    },

    {
      number: '05',
      icon: '💡',
      image: 'assets/images/MiniHelicopter.JPG',
      title: 'Innovation & Inventions',
      shortText:
        'Turning engineering ideas into practical innovations for society.',
      fullText:
        'Innovation begins with identifying a challenge and exploring a better way to solve it through practical engineering ideas, experimentation and creative thinking.'
    },

    {
      number: '06',
      icon: '🏭',
      image: 'assets/images/Irrigation.JPG',
      title: 'Industrial Applications',
      shortText:
        'Applying research and engineering innovation to real-world industries.',
      fullText:
        'Industrial applications focus on taking engineering research and translating it into practical environments that can improve operational efficiency and engineering performance.'
    }

  ];


  researchProcess = [

    {
      step: '01',
      title: 'Identify',
      description:
        'Understand a real-world engineering or energy challenge.'
    },

    {
      step: '02',
      title: 'Research',
      description:
        'Study the problem through scientific and engineering approaches.'
    },

    {
      step: '03',
      title: 'Innovate',
      description:
        'Develop new concepts, methods and practical solutions.'
    },

    {
      step: '04',
      title: 'Apply',
      description:
        'Transform research outcomes into useful applications for society.'
    }

  ];


  // =========================================================
  // FLIP CARD
  // =========================================================

  toggleCard(index: number): void {

  console.log('CARD CLICKED:', index);

  if (this.activeCard === index) {
    this.activeCard = null;
  } else {
    this.activeCard = index;
  }
}


openResearchImage(area: any, event: MouseEvent): void {

  console.log('EXPLORE BUTTON CLICKED');

  event.preventDefault();
  event.stopImmediatePropagation();

  console.log('TITLE:', area.title);
  console.log('IMAGE:', area.image);

  this.selectedResearch = area;
}


closeResearchImage(): void {

  console.log('POPUP CLOSED');

  this.selectedResearch = null;
}


  // =========================================================
  // ESC KEY
  // =========================================================

  @HostListener('document:keydown.escape')
  onEscape(): void {

    if (this.selectedResearch !== null) {
      this.closeResearchImage();
    }

  }

}