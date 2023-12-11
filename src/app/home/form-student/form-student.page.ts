import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.page.html',
  styleUrls: ['./form-student.page.scss'],
})
export class FormStudentPage implements OnInit {
  public majors = [
    { id: 1, text: 'Informatika' },
    { id: 2, text: 'Management' },
    { id: 3, text: 'Accounting' },
  ];
  constructor() {}

  ngOnInit() {}
}
