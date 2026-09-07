import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AwardsComponent } from './awards';
import { provideRouter } from '@angular/router';

describe('AwardsComponent', () => {
  let component: AwardsComponent;
  let fixture: ComponentFixture<AwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwardsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AwardsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
