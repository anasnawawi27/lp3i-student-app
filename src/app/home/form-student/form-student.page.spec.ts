import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormStudentPage } from './form-student.page';

describe('FormStudentPage', () => {
  let component: FormStudentPage;
  let fixture: ComponentFixture<FormStudentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
