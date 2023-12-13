import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FormStudentPage } from './form-student/form-student.page';
import { FormMajorPage } from './form-major/form-major.page';
import { DetailStudentPage } from './detail-student/detail-student.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'student/form',
    component: FormStudentPage,
  },
  {
    path: 'major/form',
    component: FormMajorPage,
  },
  {
    path: 'student/:id',
    component: DetailStudentPage,
  },
  {
    path: 'student/form/:id',
    component: FormStudentPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
