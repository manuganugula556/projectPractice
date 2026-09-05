import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResearchExperience } from './research-experience';

describe('ResearchExperience', () => {
  let component: ResearchExperience;
  let fixture: ComponentFixture<ResearchExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchExperience],
    }).compileComponents();

    fixture = TestBed.createComponent(ResearchExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
