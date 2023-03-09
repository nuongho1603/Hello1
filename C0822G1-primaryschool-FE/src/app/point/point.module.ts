import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointRoutingModule } from './point-routing.module';
import { ListPointComponent } from './list-point/list-point.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [ListPointComponent],
    imports: [
        CommonModule,
        PointRoutingModule,
        FormsModule
    ]
})
export class PointModule { }
