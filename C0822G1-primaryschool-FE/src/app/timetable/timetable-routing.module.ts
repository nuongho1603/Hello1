import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimetableListComponent} from "./timetable-list/timetable-list.component";
import {TimetableTeacherComponent} from "./timetable-teacher/timetable-teacher.component";
import {TeacherGuard} from "../authguard/teacher.guard";
import {AdminGuard} from "../authguard/admin.guard";

const routes: Routes = [
  {path: '', component: TimetableListComponent},
  {path: 'timetable-teacher', component: TimetableTeacherComponent, canActivate: [TeacherGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule { }
