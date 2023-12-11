import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormMajorPage } from './form-major.page';

describe('FormMajorPage', () => {
  let component: FormMajorPage;
  let fixture: ComponentFixture<FormMajorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormMajorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
