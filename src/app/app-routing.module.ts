import {ModuleWithProviders, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { CanActivateGuard } from './can-activate.guard';
import { PersonalComponent } from './personal/personal.component';
import { AddComponent } from './personal/add/add.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path:'home', component: HomeComponent, canActivate: [CanActivateGuard] },
  { path:'personal', component: PersonalComponent},
  { path:'personal/add', component: AddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

