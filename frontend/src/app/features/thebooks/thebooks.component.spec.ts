import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThebooksComponent } from './thebooks.component';

describe('ThebooksComponent', () => {
  let component: ThebooksComponent;
  let fixture: ComponentFixture<ThebooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThebooksComponent]
    });
    fixture = TestBed.createComponent(ThebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
