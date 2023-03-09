import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassListComponent} from './class-list/class-list.component';
import {ClassCreateChooseComponent} from './class-create-choose/class-create-choose.component';
import {ClassCreateInfoComponent} from './class-create-info/class-create-info.component';
import {ClassUpdateComponent} from './class-update/class-update.component';
import {AdminGuard} from "../authguard/admin.guard";

const routes: Routes = [
  {path: '', component: ClassListComponent},
  {path: 'create', component: ClassCreateChooseComponent, canActivate: [AdminGuard]},
  {path: 'create/info/:id', component: ClassCreateInfoComponent, canActivate: [AdminGuard]},
  {path: 'update/:id', component: ClassUpdateComponent, canActivate: [AdminGuard]},
  {path: 'create/:id', component: ClassCreateInfoComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
