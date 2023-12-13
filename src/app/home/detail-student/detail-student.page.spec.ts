import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailStudentPage } from './detail-student.page';

describe('DetailStudentPage', () => {
  let component: DetailStudentPage;
  let fixture: ComponentFixture<DetailStudentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
