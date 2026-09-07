import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResearchExperienceComponent } from './research-experience';
import { provideRouter } from '@angular/router';

describe('ResearchExperienceComponent', () => {
  let component: ResearchExperienceComponent;
  let fixture: ComponentFixture<ResearchExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchExperienceComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ResearchExperienceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
