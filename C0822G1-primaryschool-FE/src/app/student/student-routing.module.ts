
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentCreateComponent} from './student-create/student-create.component';
import {HomeroomClassComponent} from './homeroom-class/homeroom-class.component';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {StudentDeleteComponent} from './student-delete/student-delete.component';
import {StudentUpdateComponent} from './student-update/student-update.component';
import {StudentSearchComponent} from './student-search/student-search.component';
import {AdminGuard} from "../authguard/admin.guard";
import {TeacherGuard} from "../authguard/teacher.guard";

const routes: Routes = [
  {path:'', component:StudentListComponent, canActivate: [AdminGuard]},
  {path:':year/:clazzId/:page', component:StudentListComponent, canActivate: [AdminGuard]},
  {path:'create/:id',component: StudentCreateComponent, canActivate: [AdminGuard]},
  {path:'detail/:id/:year/:clazzId/:page',component: StudentDetailComponent, canActivate: [AdminGuard]},
  {path:'detail/:id',component: StudentDetailComponent, canActivate: [TeacherGuard]},
  {path:'delete',component: StudentDeleteComponent, canActivate: [AdminGuard]},
  {path:'update/:id/:year/:clazzId/:page',component: StudentUpdateComponent, canActivate: [AdminGuard]},
  {path: 'homeroom', component: HomeroomClassComponent, canActivate: [TeacherGuard]},
  {path: 'search', component: StudentSearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
