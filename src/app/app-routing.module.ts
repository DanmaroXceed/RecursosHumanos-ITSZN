import {ModuleWithProviders, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { CanActivateGuard } from './can-activate.guard';
import { PersonalComponent } from './personal/personal.component';
import { AddComponent } from './personal/add/add.component';
import { PreferenciasComponent } from './preferencias/preferencias.component';
import { UserDataComponent } from './personal/user-data/user-data.component';
import {StudiesProgramComponent} from "./studies-program/studies-program.component";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path:'home', component: HomeComponent, canActivate: [CanActivateGuard]}, //, canActivate: [CanActivateGuard] 
  { path:'preferencias', component: PreferenciasComponent, canActivate: [CanActivateGuard]},
  { path:'personal', component: PersonalComponent, canActivate: [CanActivateGuard]},
  { path:'personal/add', component: AddComponent, canActivate: [CanActivateGuard]},
  { path:'personal/userData', component: UserDataComponent, canActivate: [CanActivateGuard]},
  { path:'programasEstudio', component: StudiesProgramComponent, canActivate: [CanActivateGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

