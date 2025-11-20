import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAdminActivationComponent } from './confirm-admin-activation.component';

describe('ConfirmAdminActivationComponent', () => {
  let component: ConfirmAdminActivationComponent;
  let fixture: ComponentFixture<ConfirmAdminActivationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmAdminActivationComponent]
    });
    fixture = TestBed.createComponent(ConfirmAdminActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
