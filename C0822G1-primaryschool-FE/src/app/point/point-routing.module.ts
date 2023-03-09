import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListPointComponent} from "./list-point/list-point.component";
import {TeacherGuard} from "../authguard/teacher.guard";

const routes: Routes = [
  {path: '', component: ListPointComponent, canActivate: [TeacherGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointRoutingModule { }
