import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FormStudentPage } from './form-student/form-student.page';
import { FormMajorPage } from './form-major/form-major.page';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
