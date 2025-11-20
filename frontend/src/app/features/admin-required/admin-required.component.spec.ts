import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequiredComponent } from './admin-required.component';

describe('AdminRequiredComponent', () => {
  let component: AdminRequiredComponent;
  let fixture: ComponentFixture<AdminRequiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRequiredComponent]
    });
    fixture = TestBed.createComponent(AdminRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
