import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantionDetailsComponent } from './applicantion-details.component';

describe('ApplicantionDetailsComponent', () => {
  let component: ApplicantionDetailsComponent;
  let fixture: ComponentFixture<ApplicantionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
