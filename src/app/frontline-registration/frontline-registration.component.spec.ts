import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontlineRegistrationComponent } from './frontline-registration.component';

describe('FrontlineRegistrationComponent', () => {
  let component: FrontlineRegistrationComponent;
  let fixture: ComponentFixture<FrontlineRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontlineRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontlineRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
