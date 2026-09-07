import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResearchComponent } from './research';

describe('ResearchComponent', () => {
  let component: ResearchComponent;
  let fixture: ComponentFixture<ResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResearchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
