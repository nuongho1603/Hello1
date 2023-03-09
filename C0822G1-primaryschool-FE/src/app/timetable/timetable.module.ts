import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetableRoutingModule } from './timetable-routing.module';
import { TimetableListComponent } from './timetable-list/timetable-list.component';
import { TimetableTeacherComponent } from './timetable-teacher/timetable-teacher.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [TimetableListComponent, TimetableTeacherComponent],
    imports: [
        CommonModule,
        TimetableRoutingModule,
        ReactiveFormsModule
    ]
})
export class TimetableModule { }
