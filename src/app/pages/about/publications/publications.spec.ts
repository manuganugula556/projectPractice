import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationsComponent } from './publications';
import { provideRouter } from '@angular/router';

describe('PublicationsComponent', () => {
  let component: PublicationsComponent;
  let fixture: ComponentFixture<PublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
