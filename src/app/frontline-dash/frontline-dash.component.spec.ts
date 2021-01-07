import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontlineDashComponent } from './frontline-dash.component';

describe('FrontlineDashComponent', () => {
  let component: FrontlineDashComponent;
  let fixture: ComponentFixture<FrontlineDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontlineDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontlineDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
