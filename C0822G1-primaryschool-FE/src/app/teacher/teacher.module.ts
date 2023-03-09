import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherUpdateComponent } from './teacher-update/teacher-update.component';
import { TeacherSearchComponent } from './teacher-search/teacher-search.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ TeacherUpdateComponent, TeacherSearchComponent],
    imports: [
        CommonModule,
        TeacherRoutingModule,
        ReactiveFormsModule
    ]
})
export class TeacherModule { }
