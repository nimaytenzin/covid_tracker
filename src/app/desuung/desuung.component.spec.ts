import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesuungComponent } from './desuung.component';

describe('DesuungComponent', () => {
  let component: DesuungComponent;
  let fixture: ComponentFixture<DesuungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesuungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesuungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
