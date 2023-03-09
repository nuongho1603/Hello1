import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassRoutingModule } from './class-routing.module';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassCreateChooseComponent } from './class-create-choose/class-create-choose.component';
import { ClassCreateInfoComponent } from './class-create-info/class-create-info.component';
import { ClassUpdateComponent } from './class-update/class-update.component';
import { ClassUpComponent } from './class-up/class-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ClassListComponent,
    ClassCreateChooseComponent, ClassCreateInfoComponent, ClassUpdateComponent, ClassUpComponent],
    imports: [
        CommonModule,
        ClassRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ClassModule { }
