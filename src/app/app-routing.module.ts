import {ModuleWithProviders, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { CanActivateGuard } from './can-activate.guard';
import { PersonalComponent } from './personal/personal.component';
import { AddComponent } from './personal/add/add.component';
import { PreferenciasComponent } from './preferencias/preferencias.component';
import { UserDataComponent } from './personal/user-data/user-data.component';
import { InformacionComponent } from './informacion/informacion.component';
import { UpdUserDataComponent } from './personal/user-data/upd-user-data/upd-user-data.component';
import { ChgPassComponent } from './chg-pass/chg-pass.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path:'home', component: HomeComponent, canActivate: [CanActivateGuard]}, //, canActivate: [CanActivateGuard] 
  { path:'preferencias', component: PreferenciasComponent, canActivate: [CanActivateGuard]},
  { path:'preferencias/personal', component: PersonalComponent, canActivate: [CanActivateGuard]},
  { path:'personal/add', component: AddComponent, canActivate: [CanActivateGuard]},
  { path:'informacion', component: InformacionComponent, canActivate: [CanActivateGuard],
    children:[
      { path:'dPersonales', component: UserDataComponent, canActivate: [CanActivateGuard]},
      { path: 'updPersonales', component: UpdUserDataComponent, canActivate: [CanActivateGuard]}
    ]},
  { path:'cambio-contr', component: ChgPassComponent, canActivate: [CanActivateGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

