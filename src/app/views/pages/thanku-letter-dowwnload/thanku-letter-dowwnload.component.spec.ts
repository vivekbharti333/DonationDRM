import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankuLetterDowwnloadComponent } from './thanku-letter-dowwnload.component';

describe('ThankuLetterDowwnloadComponent', () => {
  let component: ThankuLetterDowwnloadComponent;
  let fixture: ComponentFixture<ThankuLetterDowwnloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankuLetterDowwnloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankuLetterDowwnloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
