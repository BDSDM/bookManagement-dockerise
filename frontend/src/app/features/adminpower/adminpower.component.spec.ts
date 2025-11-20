import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpowerComponent } from './adminpower.component';

describe('AdminpowerComponent', () => {
  let component: AdminpowerComponent;
  let fixture: ComponentFixture<AdminpowerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminpowerComponent]
    });
    fixture = TestBed.createComponent(AdminpowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
