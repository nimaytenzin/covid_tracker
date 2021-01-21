import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFrontline } from './register-frontline.component';

describe('RegisterStatusComponent', () => {
  let component: RegisterFrontline;
  let fixture: ComponentFixture<RegisterFrontline>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFrontline ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFrontline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
