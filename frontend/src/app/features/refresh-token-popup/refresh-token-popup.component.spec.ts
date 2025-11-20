import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTokenPopupComponent } from './refresh-token-popup.component';

describe('RefreshTokenPopupComponent', () => {
  let component: RefreshTokenPopupComponent;
  let fixture: ComponentFixture<RefreshTokenPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefreshTokenPopupComponent]
    });
    fixture = TestBed.createComponent(RefreshTokenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
