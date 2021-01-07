import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordVerifyComponent } from './record-verify.component';

describe('RecordVerifyComponent', () => {
  let component: RecordVerifyComponent;
  let fixture: ComponentFixture<RecordVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
